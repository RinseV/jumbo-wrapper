import { JumboObject, PaginationOptions } from '../base/jumboObject';
import { AdditionalRequestOptions } from '../jumbo';
import { StoreModel } from './storeModel';
import { StoreQueryModel } from './storeQueryModel';

interface StoreOptions extends PaginationOptions {
    long: number;
    lat: number;
    distance?: number;
}

export class Store extends JumboObject {
    /**
     * Gets store from store ID
     * @param storeId Store ID
     */
    async getStoreFromId(storeId: number, additionalRequestOptions?: AdditionalRequestOptions): Promise<StoreModel> {
        return this.jumbo.get(`stores/${storeId}`, additionalRequestOptions);
    }

    /**
     * Find stores based on given longitude, latitude and distance (optional)
     * @param options Options for the search
     * @param options.long Longitude
     * @param options.lat Latitude
     * @param options.distance (Optional) Maximum search radius (default none)
     * @param options.limit Number of stores to retrieve (default 20)
     * @param options.offset Offset in search (default 0)
     */
    async getStoresFromLongLat(
        options: StoreOptions,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<StoreModel[]> {
        const stores: StoreQueryModel = await this.jumbo.get(`stores`, {
            query: {
                longitude: options.long.toString(),
                latitude: options.lat.toString(),
                distance: (options.distance || '').toString(),
                count: (options.limit || 20).toString(),
                offset: (options.offset || 0).toString()
            },
            ...additionalRequestOptions
        });
        const result: StoreModel[] = [];
        for (var key in stores.stores.data) {
            const store: StoreModel = {
                store: {
                    data: stores.stores.data[key]
                }
            };
            result.push(store);
        }
        return result;
    }
}
