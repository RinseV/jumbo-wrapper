import { JumboObject } from '../base/jumboObject';
import { AdditionalRequestOptions } from '../jumbo';
import { PromotionModel } from './promotionModel';

export class Promotion extends JumboObject {
    /**
     * Get all promotions from a given store (by ID)
     * @param storeId Store ID
     */
    async getPromotionsFromStore(
        storeId: number,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<PromotionModel> {
        return await this.jumbo.get(`promotion-overview`, {
            query: {
                store_id: storeId.toString()
            },
            ...additionalRequestOptions
        });
    }
}
