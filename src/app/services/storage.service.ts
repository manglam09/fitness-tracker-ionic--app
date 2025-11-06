import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private prefix = 'fittrack_';

  async set(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, jsonValue);
    } catch (error) {
      console.error('Error saving to storage', error);
      throw error;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = localStorage.getItem(this.prefix + key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting from storage', error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('Error removing from storage', error);
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  }
}
