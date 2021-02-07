import { Headers, Query } from '../jumbo';
import { JumboObject } from '../base/jumboObject';
import { UserModel } from './userModel';

export class User extends JumboObject {
    /**
     * Returns info of logged in user
     */
    async getMyInfo(headers?: Headers, query?: Query): Promise<UserModel> {
        return await this.jumbo.get(
            `users/me`,
            headers,
            query,
            this.authRequired
        );
    }
}
