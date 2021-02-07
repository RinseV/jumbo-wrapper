import { Jumbo } from '../jumbo';

export class TokenHandler {
    private jumboToken?: string;
    Ready: Promise<any>;

    constructor(
        private readonly jumbo: Jumbo,
        private readonly username: string,
        private readonly password: string
    ) {
        this.Ready = new Promise((resolve, reject) => {
            this.generateToken()
                .then(() => {
                    resolve(undefined);
                })
                .catch(reject);
        });
    }

    /**
     * Function that can be called to generate token (if there is no token yet)
     */
    private async generateToken(): Promise<void> {
        if (!this.jumboToken) {
            this.jumboToken = await this.login();
        }
    }

    /**
     * Function that is used to login to Jumbo and get a token
     */
    private async login() {
        // To get a token, we simply initialize a POST request to /users/login with the info
        let body: LoginBody = {
            password: this.password,
            username: this.username,
        };
        // Send POST request with info
        let response = await this.jumbo.post(
            `users/login`,
            JSON.stringify(body),
            undefined,
            undefined,
            false,
            true
        );
        // Save token
        return await response.headers['x-jumbo-token'];
    }

    /**
     * Simple function that returns the token (assuming it exists)
     */
    getToken(): string {
        // TODO: refresh token if needed
        return this.jumboToken!;
    }
}

interface LoginBody {
    password: string;
    username: string;
}
