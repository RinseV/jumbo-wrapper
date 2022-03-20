import { JumboObject } from '../base/jumboObject';
import { AdditionalRequestOptions } from '../jumbo';
import { UserModel } from './userModel';

export class User extends JumboObject {
    /**
     * Returns info of logged in user
     */
    async getMyInfo(additionalRequestOptions?: AdditionalRequestOptions): Promise<UserModel> {
        return await this.jumbo.get(`users/me`, additionalRequestOptions, this.authRequired);
    }
}
