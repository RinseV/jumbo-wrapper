import { Headers, Query } from '../jumbo';
import { JumboObject } from '../base/jumboObject';
import { PromotionModel } from './promotionModel';

export class Promotion extends JumboObject {
    /**
     * Get all promotions from a given store (by ID)
     * @param storeId Store ID
     */
    async getPromotionsFromStore(
        storeId: number,
        headers?: Headers,
        query?: Query
    ): Promise<PromotionModel> {
        return await this.jumbo.get(`promotion-overview`, headers, {
            store_id: storeId.toString(),
            ...query,
        });
    }
}
