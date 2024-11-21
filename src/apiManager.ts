import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiRequestData } from './Data/Models/API.model';

class ApiManager {
    static async apiRequest<T>(apiData: ApiRequestData): Promise<T> {
        try {
            const url = ApiManager.buildUrlWithParams(apiData.Url, apiData.Params);

            const config: AxiosRequestConfig = {
                url,
                method: apiData.Method,
                headers: {
                    'Content-Type': 'application/json',
                    ...apiData.Headers
                },
                data: ApiManager.buildRequestData(apiData.Data, apiData.Headers?.['Content-Type']),
                timeout: 5000,
            };

            console.log(url);
            const response: AxiosResponse<T> = await axios(config);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(
                    `Ошибка API: ${error.response.status} ${error.response.statusText}. ${JSON.stringify(error.response.data)}`
                );
            } else if (error.code === 'ECONNABORTED') {
                throw new Error('Ошибка сети: таймаут запроса');
            } else {
                throw new Error(`Ошибка сети: ${error.message}`);
            }
        }
    }

    private static buildUrlWithParams(url: string, params?: Record<string, any>): string {
        if (!params) return url;
        const queryString = new URLSearchParams(params).toString();
        return queryString ? `${url}?${queryString}` : url;
    }

    private static async generateSignature(params: Record<string, any>, secretKey: string): Promise<string> {
        const queryString = new URLSearchParams(params).toString();
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secretKey);
        
        const key = await crypto.subtle.importKey(
            'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
        );
        const data = encoder.encode(queryString);
    
        const signature = await crypto.subtle.sign('HMAC', key, data);
        
        const signatureArray = new Uint8Array(signature);
        return signatureArray.reduce((hex, byte) => hex + byte.toString(16).padStart(2, '0'), '');
    }

    private static buildRequestData(data: any, contentType: string | undefined): any {
        if (contentType === 'application/x-www-form-urlencoded') {
            return new URLSearchParams(data).toString();
        }
        return data; 
    }
}

export default ApiManager;