const fetch = require('node-fetch');
import { Product } from './product/product';
require('dotenv').config();
const endpoint = process.env.ENDPOINT;

export class Jumbo {
    jumboProduct: Product;

    constructor(
        private readonly username?: string,
        private readonly password?: string,
        private readonly verbose?: boolean
    ) {
        this.jumboProduct = new Product(this);
    }

    product() {
        return this.jumboProduct;
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
        body?: BodyInit,
        extraHeaders?: Headers,
        query?: Query
    ) {
        // Create initial header properties
        let requestHeaders: Headers = this.createHeader(extraHeaders);

        // Change URL and body based on method
        let url: string;
        let bodyContent: any;
        switch (method) {
            case requestMethod.GET:
                url = this.createURL(path, query);
                break;
            case requestMethod.POST:
            case requestMethod.PUT:
                url = this.createURL(path);
                bodyContent = body;
                break;
            default:
                url = this.createURL(path);
                break;
        }

        // Create request options with method, headers and body
        let requestOptions = {
            method: method,
            headers: requestHeaders,
            body: bodyContent,
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
        // Create header with Accept
        let headers: Headers = {
            Host: 'mobileapi.jumbo.com',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        // Add fields from extraHeaders to headers
        headers = { ...headers, ...extraHeaders };

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
            let searchParams = new URLSearchParams(query);
            url = endpoint + path + '?' + searchParams;
        } else {
            url = endpoint + path;
        }

        // Return URL
        return url;
    }
}

export interface Query {
    [key: string]: string;
}

export interface Headers {
    [key: string]: string;
}

export enum requestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
}
