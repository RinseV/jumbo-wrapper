import { JumboObject } from '../base/jumboObject';
import { AdditionalRequestOptions } from '../jumbo';
import { BasketModel } from './basketModel';

export declare class Basket extends JumboObject {
    /**
     * Gets basket 
     */
    getMyBasket(additionalRequestOptions?: AdditionalRequestOptions): Promise<BasketModel>;
    /**
     * @param productJson consists of sku quantity 
     * @param additionalRequestOptions 
     */
    addToBasket(productJson: any, additionalRequestOptions?: AdditionalRequestOptions): Promise<BasketModel>;
}

export {};
