import { Headers, Query } from '../jumbo';
import { JumboObject } from '../base/jumboObject';
import { StoreModel } from './storeModel';
import { StoreQueryModel } from './storeQueryModel';

export class Store extends JumboObject {
    /**
     * Gets store from store ID
     * @param storeId Store ID
     */
    async getStoreFromId(
        storeId: number,
        headers?: Headers,
        query?: Query
    ): Promise<StoreModel> {
        return this.jumbo.get(`stores/${storeId}`, headers, query);
    }

    /**
     * Find stores based on given longitude, latitude and distance (optional)
     * @param long Longitude
     * @param lat Latitude
     * @param distance Maximum search radius (default none)
     * @param count Number of stores to retrieve (default 20)
     * @param offset Offset in search (default 0)
     */
    async getStoresFromLongLat(
        long: number,
        lat: number,
        distance?: number,
        count?: number,
        offset?: number,
        headers?: Headers,
        query?: Query
    ): Promise<StoreModel[]> {
        const stores: StoreQueryModel = await this.jumbo.get(
            `stores`,
            headers,
            {
                longitude: long.toString(),
                latitude: lat.toString(),
                distance: (distance ? distance : '').toString(),
                count: (count ? count : 20).toString(),
                offset: (offset ? offset : 0).toString(),
                ...query,
            }
        );
        const result: StoreModel[] = [];
        for (var key in stores.stores.data) {
            const store: StoreModel = {
                store: {
                    data: stores.stores.data[key],
                },
            };
            result.push(store);
        }
        return result;
    }

    /**
     * Shortcut function to get the nearest store given longitude and latitude
     * @param long Longitude
     * @param lat Latitude
     */
    async getNearestStoreFromLongLat(
        long: number,
        lat: number,
        headers?: Headers,
        query?: Query
    ): Promise<StoreModel> {
        const stores = await this.getStoresFromLongLat(
            long,
            lat,
            undefined,
            undefined,
            undefined,
            headers,
            query
        );
        return stores[0];
    }
}
