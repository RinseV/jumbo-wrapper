import fetch from 'node-fetch';
import { RequestInit, HeadersInit, Headers } from 'node-fetch';
require('dotenv').config();
const endpoint = process.env.ENDPOINT;

export class Jumbo {
    /**
     * Generic request method
     * @param path Endpoint URL (without start)
     * @param method Request method (GET, POST, PUT, DELETE)
     * @param body Body in case of POST and PUT
     * @param extraHeaders Any extra headers (Content-Type and Accept) are already included
     * @param query Query in case of GET
     */
    async request(
        path: string,
        method: requestMethod,
        body?: BodyInit,
        extraHeaders?: Headers,
        query?: Query
    ) {
        // Create initial header properties
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        requestHeaders.set('Accept', 'application/json');
        // Add extra headers
        extraHeaders?.forEach((value: string, name: string) => {
            requestHeaders.set(name, value);
        });

        // Create request init with method and headers
        let requestOptions: RequestInit = {
            method: method,
            headers: requestHeaders,
            // TODO: add body
        };

        // Add query options
        if (query) {
            let searchParams = new URLSearchParams(query);
            path += '?' + searchParams;
        }

        // Add endpoint to front of path
        path = endpoint + path;

        // Make request
        let response = await fetch(path, requestOptions);

        // Throw error if response not ok
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Return response in JSON format
        return await response.json();
    }
}

export interface Query {
    [key: string]: string;
}

export enum requestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}
