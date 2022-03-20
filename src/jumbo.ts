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

export interface JumboClientOptions {
    username?: string;
    password?: string;
    token?: string;
    verbose?: boolean;
    axiosConfig?: AxiosRequestConfig;
    apiVersion?: number;
}

export class Jumbo {
    private endpoint = 'https://mobileapi.jumbo.com/';
    private readonly client: AxiosInstance;
    private verbose: boolean;

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
     * @param options Options for the client
     * @param options.username Jumbo account username (e-mail)
     * @param options.password Jumbo account password
     * @param options.token Jumbo access token
     * @param options.verbose Whether to log requests (default false)
     * @param options.axiosConfig Axios configuration (defaults to TLSv1.2)
     * @param options.apiVersion Jumbo API version (defaults to 17)
     */
    constructor(options?: JumboClientOptions) {
        // Create https agent for TLSv1.2 or less (API doesn't respond to TLSv1.3+)
        this.client = options?.axiosConfig
            ? axios.create(options.axiosConfig)
            : axios.create({
                  httpsAgent: new https.Agent({
                      maxVersion: 'TLSv1.2'
                  })
              });
        this.endpoint = options?.apiVersion ? this.endpoint + `v${options.apiVersion}/` : this.endpoint + 'v17/';
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
        if (options?.username && options?.password) {
            this.login(options.username, options.password);
        }
        // Login using given token
        if (options?.token) {
            this.loginWithToken(options.token);
        }
        this.verbose = options?.verbose || false;
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
     * Function that creates a new TokenHandler for given access token
     * @param token Jumbo access token
     */
    loginWithToken(token: string) {
        this.tokenHandler = new TokenHandler(this, '', '', token);
    }

    /**
     * PUT request
     * @param path Endpoint URL (without start)
     * @param body Body of PUT (if any)
     * @param additionalRequestOptions Any additional headers or queries
     * @param authRequired Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async put(
        path: string,
        body?: any,
        additionalRequestOptions?: AdditionalRequestOptions,
        authRequired?: boolean,
        fullResponse?: boolean
    ) {
        return this.request(path, requestMethod.PUT, body, additionalRequestOptions, authRequired, fullResponse);
    }

    /**
     * POST request
     * @param path Endpoint URL (without start)
     * @param body Body of POST
     * @param additionalRequestOptions Any additional headers or queries
     * @param authRequired Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async post(
        path: string,
        body: any,
        additionalRequestOptions?: AdditionalRequestOptions,
        authRequired?: boolean,
        fullResponse?: boolean
    ) {
        return this.request(path, requestMethod.POST, body, additionalRequestOptions, authRequired, fullResponse);
    }

    /**
     * GET request
     * @param path Endpoint URL (without start)
     * @param additionalRequestOptions Any additional headers or queries
     * @param authRequired Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async get(
        path: string,
        additionalRequestOptions?: AdditionalRequestOptions,
        authRequired?: boolean,
        fullResponse?: boolean
    ) {
        return this.request(path, requestMethod.GET, undefined, additionalRequestOptions, authRequired, fullResponse);
    }

    /**
     * Generic request method
     * @param path Endpoint URL (without start)
     * @param method Request method (GET, POST, PUT, DELETE)
     * @param body Body in case of POST and PUT
     * @param additionalRequestOptions Any additional headers or queries
     * @param authRequired Whether a token is required for the function
     * @param fullResponse Returns response + headers instead of only data
     */
    async request(
        path: string,
        method: requestMethod,
        body?: any,
        additionalRequestOptions?: AdditionalRequestOptions,
        authRequired?: boolean,
        fullResponse?: boolean
    ) {
        // If auth is required and we don't have a token yet, we should create one
        if (authRequired) {
            if (!this.tokenHandler) {
                throw new Error(`You must be logged in to access this path: ${this.endpoint + path}`);
            } else {
                // If the tokenHandler doesn't have a token yet, make sure it gets one
                await this.tokenHandler.Ready;
            }
        }

        // Create initial header properties
        let requestHeaders: Headers = this.createHeader(authRequired, additionalRequestOptions?.headers);

        // Add query to URL if given
        let url: string = this.createURL(path, additionalRequestOptions?.query);

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
            url = this.endpoint + path + '?' + params;
        } else {
            url = this.endpoint + path;
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

/**
 * Interface that combines additional headers and query options
 */
export interface AdditionalRequestOptions {
    headers?: Headers;
    query?: Query;
}
