/**
 * Flexible storage system for the application
 * Supports localStorage by default and can be extended for file storage
 */

export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
}

/**
 * LocalStorage adapter for browser storage
 */
export class LocalStorageAdapter implements StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed to set item in localStorage: ${key}`, error);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn("Failed to clear localStorage", error);
    }
  }

  async keys(): Promise<string[]> {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.warn("Failed to get localStorage keys", error);
      return [];
    }
  }
}

/**
 * File storage adapter for future JSON file support
 * This is a placeholder that can be implemented later
 */
export class FileStorageAdapter implements StorageAdapter {
  constructor(private basePath: string = "./data") {}

  async get<T>(key: string): Promise<T | null> {
    // TODO: Implement file reading
    // This would read from a JSON file at `${this.basePath}/${key}.json`
    throw new Error("FileStorageAdapter not yet implemented");
  }

  async set<T>(key: string, value: T): Promise<void> {
    // TODO: Implement file writing
    // This would write to a JSON file at `${this.basePath}/${key}.json`
    throw new Error("FileStorageAdapter not yet implemented");
  }

  async remove(key: string): Promise<void> {
    // TODO: Implement file deletion
    throw new Error("FileStorageAdapter not yet implemented");
  }

  async clear(): Promise<void> {
    // TODO: Implement directory clearing
    throw new Error("FileStorageAdapter not yet implemented");
  }

  async keys(): Promise<string[]> {
    // TODO: Implement directory listing
    throw new Error("FileStorageAdapter not yet implemented");
  }
}

/**
 * Storage manager that handles state persistence
 */
export class StorageManager {
  private adapter: StorageAdapter;
  private prefix: string;

  constructor(adapter: StorageAdapter = new LocalStorageAdapter(), prefix: string = "tangle") {
    this.adapter = adapter;
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    return this.adapter.get<T>(this.getKey(key));
  }

  async set<T>(key: string, value: T): Promise<void> {
    return this.adapter.set(this.getKey(key), value);
  }

  async remove(key: string): Promise<void> {
    return this.adapter.remove(this.getKey(key));
  }

  async clear(): Promise<void> {
    const keys = await this.adapter.keys();
    const prefixedKeys = keys.filter((key) => key.startsWith(this.prefix + ":"));

    for (const key of prefixedKeys) {
      await this.adapter.remove(key);
    }
  }

  /**
   * Get all keys that belong to this storage manager
   */
  async getKeys(): Promise<string[]> {
    const keys = await this.adapter.keys();
    return keys
      .filter((key) => key.startsWith(this.prefix + ":"))
      .map((key) => key.substring(this.prefix.length + 1));
  }

  /**
   * Change the storage adapter (useful for switching between localStorage and file storage)
   */
  setAdapter(adapter: StorageAdapter): void {
    this.adapter = adapter;
  }
}

// Default storage manager instance
export const storage = new StorageManager();
