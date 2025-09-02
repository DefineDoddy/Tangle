/**
 * Utility functions for working with the storage system
 * This demonstrates how to extend the storage system for different use cases
 */

import { storage, StorageManager, LocalStorageAdapter, FileStorageAdapter } from "./storage";

/**
 * Example: Switch between localStorage and file storage
 * This shows how you can easily change storage backends
 */
export function createStorageManager(useFileStorage: boolean = false): StorageManager {
  const adapter = useFileStorage ? new FileStorageAdapter("./data") : new LocalStorageAdapter();

  return new StorageManager(adapter, "tangle");
}

/**
 * Example: Create a specialized storage manager for different data types
 */
export const graphStorage = new StorageManager(new LocalStorageAdapter(), "tangle:graph");
export const uiStorage = new StorageManager(new LocalStorageAdapter(), "tangle:ui");
export const settingsStorage = new StorageManager(new LocalStorageAdapter(), "tangle:settings");

/**
 * Example: Batch operations for better performance
 */
export async function batchSaveState(state: any) {
  const operations = [
    storage.set("graph", state.graph),
    storage.set("ui", state.ui),
    storage.set("settings", state.settings),
    storage.set("app_state", state) // Full backup
  ];

  await Promise.all(operations);
}

/**
 * Example: Migration utilities for when you need to update storage format
 */
export async function migrateStorage(fromVersion: string, toVersion: string) {
  console.log(`Migrating storage from ${fromVersion} to ${toVersion}`);

  // Example migration logic
  if (fromVersion === "1.0" && toVersion === "1.1") {
    // Add new default settings
    const settings = await storage.get("settings");
    if (settings && !settings.hasOwnProperty("autoSave")) {
      await storage.set("settings", {
        ...settings,
        autoSave: true
      });
    }
  }

  // Update version
  await storage.set("version", toVersion);
}

/**
 * Example: Export/Import utilities for backup and sharing
 */
export async function exportAllData(): Promise<string> {
  const keys = await storage.getKeys();
  const data: Record<string, any> = {};

  for (const key of keys) {
    data[key] = await storage.get(key);
  }

  return JSON.stringify(
    {
      version: "1.0",
      timestamp: new Date().toISOString(),
      data
    },
    null,
    2
  );
}

export async function importAllData(jsonData: string): Promise<void> {
  const parsed = JSON.parse(jsonData);

  if (!parsed.data) {
    throw new Error("Invalid data format");
  }

  // Clear existing data
  await storage.clear();

  // Import new data
  for (const [key, value] of Object.entries(parsed.data)) {
    await storage.set(key, value);
  }
}
