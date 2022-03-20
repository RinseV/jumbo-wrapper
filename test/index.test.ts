import axios from 'axios';
import { Jumbo } from '../src';

jest.mock('axios');

axios.create = jest.fn().mockReturnThis();
const requestMock = axios.request as jest.Mock;

describe('Jumbo client', () => {
    it('should create a client object', () => {
        const client = new Jumbo();
        expect(client).toBeDefined();
    });

    it('should create a client with provided options', () => {
        const client = new Jumbo({
            apiVersion: 12,
            axiosConfig: {}
        });
        expect(client).toBeDefined();
    });

    it('should try to authenticate user', () => {
        const client = new Jumbo();
        // Mock login request
        const spy = jest.spyOn(client, 'login').mockImplementation(() => Promise.resolve());
        // Try to authenticate
        client.login('username', 'password');
        // Make sure login is called
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should set the token when provided', async () => {
        const client = new Jumbo({
            token: 'token'
        });
        expect(client.tokenHandler).toBeDefined();
    });

    it('should error when accessing authorized path without auth', async () => {
        const client = new Jumbo();
        try {
            await client.get('/', {}, true);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should make a GET request', async () => {
        const client = new Jumbo();
        requestMock.mockReturnValueOnce({
            statusText: 'OK',
            data: {
                message: 'Hello World'
            }
        });
        const response = await client.get('/');
        expect(response).toStrictEqual({ message: 'Hello World' });
    });

    it('should error from the GET request', async () => {
        const client = new Jumbo();
        requestMock.mockReturnValueOnce({
            statusText: 'Internal Server Error'
        });
        try {
            await client.get('/');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should make a POST request', async () => {
        const client = new Jumbo();
        requestMock.mockReturnValueOnce({
            statusText: 'OK',
            data: {
                message: 'Hello World'
            }
        });
        const response = await client.post('/', {});
        expect(response).toStrictEqual({ message: 'Hello World' });
    });

    it('should error from the POST request', async () => {
        const client = new Jumbo();
        requestMock.mockReturnValueOnce({
            statusText: 'Internal Server Error'
        });
        try {
            await client.post('/', {});
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should make a PUT request', async () => {
        const client = new Jumbo();
        requestMock.mockReturnValueOnce({
            statusText: 'OK',
            data: {
                message: 'Hello World'
            }
        });
        const response = await client.put('/', {});
        expect(response).toStrictEqual({ message: 'Hello World' });
    });

    it('should error from the PUT request', async () => {
        const client = new Jumbo();
        requestMock.mockReturnValueOnce({
            statusText: 'Internal Server Error'
        });
        try {
            await client.put('/', {});
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should log the request in the console', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const client = new Jumbo({
            verbose: true
        });
        requestMock.mockReturnValueOnce({
            statusText: 'OK'
        });
        await client.get('/');
        // GET request should have 3 logs
        expect(logSpy).toHaveBeenCalledTimes(3);
    });

    it('should return full response', async () => {
        const client = new Jumbo();
        requestMock.mockReturnValueOnce({
            statusText: 'OK',
            data: {
                message: 'Hello World'
            }
        });
        const response = await client.get('/', {}, false, true);
        expect(response).toStrictEqual({
            statusText: 'OK',
            data: {
                message: 'Hello World'
            }
        });
    });

    it('should create default headers', () => {
        const client = new Jumbo();
        const headers = client.createHeader();
        expect(headers).toStrictEqual({
            'Content-Type': 'application/json',
            'User-Agent': 'jumbo-wrapper'
        });
    });

    it('should add auth headers when required', () => {
        const client = new Jumbo({
            token: 'token'
        });
        const headers = client.createHeader(true);
        expect(headers).toStrictEqual({
            'Content-Type': 'application/json',
            'User-Agent': 'jumbo-wrapper',
            'x-jumbo-token': 'token'
        });
    });

    it('should error when adding auth headers and not logged in', () => {
        const client = new Jumbo();
        try {
            client.createHeader(true);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should create properly formatted URL from query', () => {
        const client = new Jumbo();
        const url = client.createURL('', {
            test: 'test'
        });
        expect(url).toBe('https://mobileapi.jumbo.com/v17/?test=test');
    });
});
