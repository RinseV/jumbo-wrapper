import { JumboObject } from '../base/jumboObject';
import { AdditionalRequestOptions } from '../jumbo';
import { BasketModel, PutBasketItems, PutBasketResponse } from './basketModel';

export class Basket extends JumboObject {
    /**
     * Gets basket
     */
    async getMyBasket(additionalRequestOptions?: AdditionalRequestOptions): Promise<BasketModel> {
        return await this.jumbo.get(`basket`, additionalRequestOptions);
    }
    /**
     * Updates basket with items, overwriting existing items
     * @param productJson Items with quantity, sku and unit
     */
    async updateBasket(
        productJson: PutBasketItems,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<PutBasketResponse> {
        return await this.jumbo.put(`basket`, productJson, additionalRequestOptions);
    }
}
