import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Type for supported HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Type for the API request configuration
export interface ApiRequestConfig {
    url: string;
    method: HttpMethod;
    maxRetries?: number;
    delayBetweenRetries?: number;
    data?: unknown;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

// Create a pre-configured Axios instance for API requests
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3007',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Handle specific HTTP error responses
const handleResponseError = (error: unknown): Promise<never> => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status;
        const errorMessages: Record<number, string> = {
            401: 'Unauthorized - redirecting to login',
            400: 'Bad request',
            500: 'Server error',
        };
        
        if (status && errorMessages[status]) {
            console.error(errorMessages[status]);
        }
    }
    return Promise.reject(error);
};

// Response Interceptor for handling common response logic, such as error mediation
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Optionally transform all responses here
        return response.data;
    },
    handleResponseError
);

/**
 * Validates the config object for allowed properties.
 * @throws Error If the config contains invalid properties.
 */
const validateConfig = (config: ApiRequestConfig): void => {
    const allowedProperties = new Set(['url', 'method', 'maxRetries', 'delayBetweenRetries', 'data', 'params', 'headers']);
    for (const prop in config) {
        if (!allowedProperties.has(prop)) {
            throw new Error(`Invalid property in the config object: ${prop}`);
        }
    }
};

/**
 * Executes the HTTP request based on method type.
 */
const executeRequest = async (method: string, url: string, data?: unknown, params?: Record<string, unknown>, headers?: Record<string, string>) => {
    switch (method.toUpperCase()) {
        case 'GET':
            return await axiosInstance.get(url, { params, headers });
        case 'POST':
            return await axiosInstance.post(url, data, { headers });
        case 'PUT':
            return await axiosInstance.put(url, data, { headers });
        case 'PATCH':
            return await axiosInstance.patch(url, data, { headers });
        case 'DELETE':
            return await axiosInstance.delete(url, { headers });
        default:
            throw new Error(`Unsupported HTTP method: ${method}`);
    }
};

/**
 * Makes an API request using the provided configuration and handles retries.
 *
 * @param config - Configuration for the API request.
 * @returns Promise resolving to the API response data.
 * @throws Error If the config contains invalid properties or the request fails after retries.
 */
export async function handleApiRequest(config: ApiRequestConfig): Promise<unknown> {
    validateConfig(config);

    const {
        url,
        method,
        maxRetries = 2,
        delayBetweenRetries = 1,
        data,
        params,
        headers
    } = config;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await executeRequest(method, url, data, params, headers);
        } catch (error) {
            const isLastAttempt = attempt === maxRetries;
            if (isLastAttempt) {
                console.log('max retry reached', error);
                if (axios.isAxiosError(error)) {
                    const errorData = (error as AxiosError).response?.data || (error as AxiosError).message;
                    throw new Error(JSON.stringify(errorData));
                }
                throw error;
            }
            await new Promise(res => setTimeout(res, delayBetweenRetries * 1000));
        }
    }
}
