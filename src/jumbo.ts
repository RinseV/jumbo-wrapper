const fetch = require('node-fetch');
import { Headers, RequestInit } from 'node-fetch';
import { Product } from './product/product';
import { Store } from './store/store';
require('dotenv').config();
const endpoint = process.env.ENDPOINT;

export class Jumbo {
    jumboProduct: Product;
    jumboStore: Store;

    constructor(
        private readonly username?: string,
        private readonly password?: string,
        private readonly verbose?: boolean
    ) {
        this.jumboProduct = new Product(this);
        this.jumboStore = new Store(this);
    }

    product() {
        return this.jumboProduct;
    }

    store() {
        return this.jumboStore;
    }

    /**
     * GET request
     * @param path Endpoint URL (without start)
     * @param extraHeaders Any extra headers
     * @param query Any query options
     */
    async get(path: string, extraHeaders?: Headers, query?: Query) {
        return this.request(
            path,
            requestMethod.GET,
            undefined,
            extraHeaders,
            query
        );
    }

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
        body?: any,
        extraHeaders?: Headers,
        query?: Query
    ) {
        // Create initial header properties
        let requestHeaders: Headers = this.createHeader(extraHeaders);

        // Add query to URL if given
        let url: string = this.createURL(path, query);

        // Create request options with method, headers and body
        let requestOptions: RequestInit = {
            method: method,
            headers: requestHeaders,
            body: body,
        };

        // Log if verbose
        if (this.verbose) {
            console.log(url);
            console.log(requestOptions);
        }

        // Make request
        let response = await fetch(url, requestOptions);

        // Throw error if response not ok
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // Return response in JSON format
        return await response.json();
    }

    /**
     * Helper function to create headers for request
     * @param extraHeaders Any extra header options
     */
    createHeader(extraHeaders?: Headers): Headers {
        // Create header
        let headers: Headers = new Headers();
        headers.set('Host', 'mobileapi.jumbo.com');
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        headers.set('User-Agent', 'jumbo-wrapper');

        // Add fields from extraHeaders to headers
        extraHeaders?.forEach((value: string, name: string) => {
            headers.set(name, value);
        });

        // Return the headers
        return headers;
    }

    /**
     * Helper function to create request URL
     * @param path Path to endpoint (without ENDPOINT in .env)
     * @param query Any query options
     */
    createURL(path: string, query?: Query): string {
        let url: string;
        // Add query if given
        if (query) {
            const params = new URLSearchParams(query);
            url = endpoint + path + '?' + params;
        } else {
            url = endpoint + path;
        }

        // Return URL
        return url;
    }
}

/**
 * Simple enum for different request methods
 */
export enum requestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
}

/**
 * Query interface that is converted to {@URLSearchParams}
 */
export interface Query {
    [key: string]: string;
}
