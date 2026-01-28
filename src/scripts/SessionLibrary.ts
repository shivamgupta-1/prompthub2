/**
 * StorageManager provides unified methods for storing, retrieving, and clearing data
 * in sessionStorage, localStorage, and cookies, with configurable options.
 */

/**
 * StorageManagerConfig provides options for which storage types to use.
 */
export interface StorageManagerConfig {
    session?: boolean;
    local?: boolean;
    cookies?: boolean;
}

const defaultConfig: StorageManagerConfig = {
    session: true,
    local: true,
    cookies: true,
};

export function setKeyValue(
    key: string,
    value: unknown,
    config: StorageManagerConfig = defaultConfig,
    expiration?: number
): void {
    if (config.session) {
        setSessionStorage(key, value);
    }
    if (config.local) {
        setLocalStorage(key, value);
    }
    if (config.cookies) {
        setCookie(key, value, expiration);
    }
}

export function setSessionStorage(key: string, value: unknown): void {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
    console.log(`Data with key "${key}" saved to session storage.`);
}

export function setLocalStorage(key: string, value: unknown): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    console.log(`Data with key "${key}" saved to local storage.`);
}

export function setCookie(key: string, value: unknown, expirationMinutes?: number): void {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + ((expirationMinutes || 0) * 60 * 1000));
    const cookieString = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieString;
    console.log(`Data with key "${key}" saved to cookies.`);
}

export function getSessionStorage<T = unknown>(key: string): T | null {
    const serializedValue = sessionStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
}

export function getLocalStorage<T = unknown>(key: string): T | null {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
}

export function getCookie<T = unknown>(key: string): T | null {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (const cookieItem of cookieArray) {
        const cookie = cookieItem.trim();
        if (cookie.startsWith(name)) {
            const value = cookie.substring(name.length);
            return JSON.parse(decodeURIComponent(value));
        }
    }
    return null;
}

export function clearSessionStorage(key?: string): void {
    if (key) {
        sessionStorage.removeItem(key);
        console.log(`Data with key "${key}" cleared from session storage.`);
    } else {
        sessionStorage.clear();
    }
}

export function clearLocalStorage(key?: string): void {
    if (key) {
        localStorage.removeItem(key);
        console.log(`Data with key "${key}" cleared from local storage.`);
    }
}

export function clearCookie(key?: string): void {
    if (key) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        console.log(`Data with key "${key}" cleared from cookies.`);
    }
}
