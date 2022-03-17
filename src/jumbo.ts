import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Product } from './product/product';
import { Store } from './store/store';
import { TokenHandler } from './auth/tokenHandler';
import https from 'https';
import { Order } from './order/order';
import { Promotion } from './promotion/promotion';
import { Recipe } from './recipe/recipe';
import { User } from './user/user';
import { Category } from './category/category';
import { List } from './list/list';
const endpoint = 'https://mobileapi.jumbo.com/v17/';

export class Jumbo {
    private readonly client: AxiosInstance;

    jumboCategory: Category;
    jumboList: List;
    jumboOrder: Order;
    jumboProduct: Product;
    jumboPromotion: Promotion;
    jumboRecipe: Recipe;
    jumboStore: Store;
    jumboUser: User;
    tokenHandler?: TokenHandler;

    /**
     * @param username Jumbo username
     * @param password Jumbo password
     * @param verbose Whether requests should be logged in the console
     * @param config Custom Axios config, must use 'TLSv1.2' as TLS version
     */
    constructor(
        private readonly username?: string,
        private readonly password?: string,
        private readonly verbose?: boolean,
        private readonly config?: AxiosRequestConfig
    ) {
        // Create https agent for TLSv1.2 or less (API doesn't respond to TLSv1.3+)
        this.client = config
            ? axios.create(config)
            : axios.create({
                  httpsAgent: new https.Agent({
                      maxVersion: 'TLSv1.2'
                  })
              });
        // Set separate classes
        this.jumboCategory = new Category(this, false);
        this.jumboList = new List(this, false);
        this.jumboOrder = new Order(this, true);
        this.jumboProduct = new Product(this, false);
        this.jumboPromotion = new Promotion(this, false);
        this.jumboRecipe = new Recipe(this, false);
        this.jumboStore = new Store(this, false);
        this.jumboUser = new User(this, true);
        // Login using given username and password
        if (username && password) {
            this.login(username, password);
        }
    }

    category() {
        return this.jumboCategory;
    }

    list() {
        return this.jumboList;
    }

    order() {
        return this.jumboOrder;
    }

    product() {
        return this.jumboProduct;
    }

    promotion() {
        return this.jumboPromotion;
    }

    recipe() {
        return this.jumboRecipe;
    }

    store() {
        return this.jumboStore;
    }

    user() {
        return this.jumboUser;
    }

    /**
     * Function that creates a new TokenHandler for given username and password
     * @param username Jumbo account username (e-mail)
     * @param password Jumbo account password
     */
    login(username: string, password: string) {
        this.tokenHandler = new TokenHandler(this, username, password);
    }

    /**
     * PUT request
     * @param path Endpoint URL (without start)
     * @param body Body of PUT (if any)
     * @param extraHeaders Any extra headers
     * @param query Any query options
     * @param authRequired Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async put(
        path: string,
        body?: any,
        extraHeaders?: Headers,
        query?: Query,
        authRequired?: boolean,
        fullResponse?: boolean
    ) {
        return this.request(path, requestMethod.PUT, body, extraHeaders, query, authRequired, fullResponse);
    }

    /**
     * POST request
     * @param path Endpoint URL (without start)
     * @param body Body of POST
     * @param extraHeaders Any extra headers
     * @param query Any query options
     * @param authRequired Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async post(
        path: string,
        body: any,
        extraHeaders?: Headers,
        query?: Query,
        authRequired?: boolean,
        fullResponse?: boolean
    ) {
        return this.request(path, requestMethod.POST, body, extraHeaders, query, authRequired, fullResponse);
    }

    /**
     * GET request
     * @param path Endpoint URL (without start)
     * @param extraHeaders Any extra headers
     * @param query Any query options
     * @param authRequired Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async get(path: string, extraHeaders?: Headers, query?: Query, authRequired?: boolean, fullResponse?: boolean) {
        return this.request(path, requestMethod.GET, undefined, extraHeaders, query, authRequired, fullResponse);
    }

    /**
     * Generic request method
     * @param path Endpoint URL (without start)
     * @param method Request method (GET, POST, PUT, DELETE)
     * @param body Body in case of POST and PUT
     * @param extraHeaders Any extra headers (Content-Type and Accept) are already included
     * @param query Query in case of GET
     * @param authRequired Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async request(
        path: string,
        method: requestMethod,
        body?: any,
        extraHeaders?: Headers,
        query?: Query,
        authRequired?: boolean,
        fullResponse?: boolean
    ) {
        // If auth is required and we don't have a token yet, we should create one
        if (authRequired) {
            if (!this.tokenHandler) {
                throw new Error(`You must be logged in to access this path: ${endpoint + path}`);
            } else {
                // If the tokenHandler doesn't have a token yet, make sure it gets one
                await this.tokenHandler.Ready;
            }
        }

        // Create initial header properties
        let requestHeaders: Headers = this.createHeader(authRequired, extraHeaders);

        // Add query to URL if given
        let url: string = this.createURL(path, query);

        // Log if verbose
        if (this.verbose) {
            console.log(url);
            console.log(method);
            console.log(requestHeaders);
            void (body && console.log(body));
        }

        // Make request
        let response = await this.client.request({
            method: method,
            url: url,
            headers: requestHeaders,
            data: body
        });

        // Throw error if response not ok
        if (!response.statusText) {
            const text = response.data;

            throw new Error(`${response.statusText}: ${text}`);
        }

        if (fullResponse) {
            return response;
        }
        // Return response in JSON format
        return response.data;
    }

    /**
     * Helper function to create headers for request
     * @param extraHeaders Any extra header options
     */
    createHeader(authRequired?: boolean, extraHeaders?: Headers): Headers {
        // Create header
        let headers: Headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'jumbo-wrapper',
            ...extraHeaders
        };
        if (authRequired && this.tokenHandler) {
            headers['x-jumbo-token'] = this.tokenHandler.getToken();
        } else if (authRequired && !this.tokenHandler) {
            throw new Error('You must be logged in to use this function');
        }

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
    PUT = 'PUT'
}

/**
 * Query interface that is converted to {@URLSearchParams}
 */
export interface Query {
    [key: string]: string;
}

export interface Headers {
    [key: string]: string;
}
