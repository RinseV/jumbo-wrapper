import { JumboObject } from '../base/jumboObject';
import { AdditionalRequestOptions } from '../jumbo';
import { BasketModel } from './basketModel';

export class Basket extends JumboObject {
    /**
     * Gets basket 
     */
    getMyBasket(additionalRequestOptions?: AdditionalRequestOptions): Promise<BasketModel> {
        return await this.jumbo.get(`basket/`, additionalRequestOptions, true);
    }
    /**
     * @param productJson consists of sku quantity 
     * @param additionalRequestOptions 
     */
    addToBasket(productJson: any, additionalRequestOptions?: AdditionalRequestOptions): Promise<BasketModel> {
        return await this.jumbo.put(`basket/`, productJson, additionalRequestOptions, true);
    }
}

export {};
