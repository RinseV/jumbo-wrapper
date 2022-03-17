import { JumboObject } from '../base/jumboObject';
import { Query, Headers } from '../jumbo';
import { ListItemsModel } from './listItemsModel';
import { ListModel, ListQueryModel } from './listModel';
import { Following, PublicListsModel } from './publicListsModel';

export class List extends JumboObject {
    /**
     * Returns all of your lists (login required)
     */
    async getMyLists(headers?: Headers, query?: Query): Promise<ListQueryModel> {
        return await this.jumbo.get(`lists/mylists`, headers, query, true);
    }

    /**
     * Returns a single list given a list ID
     * @param listId ID of list
     */
    async getListFromId(listId: string, headers?: Headers, query?: Query): Promise<ListModel> {
        return await this.jumbo.get(`lists/${listId}`, headers, query, false);
    }

    /**
     * Returns a list of lists that match the given name (name is case sensitive and very specific)
     * @param listName Name of list (category)
     * @param offset Offset in search (default 0)
     * @param limit Amount of lists to retrieve (default 10)
     */
    async getListsByName(
        listName: string,
        offset?: number,
        limit?: number,
        headers?: Headers,
        query?: Query
    ): Promise<ListQueryModel> {
        return await this.jumbo.get(
            `lists/search`,
            headers,
            {
                offset: (offset ? offset : 0).toString(),
                limit: (limit ? limit : 10).toString(),
                q: listName,
                ...query
            },
            false
        );
    }

    /**
     * Shortcut function to get the most popular lists
     * @param offset Offset in search (default 0)
     * @param limit Amount of lists to retrieve (default 10)
     */
    async getPopularLists(offset?: number, limit?: number, headers?: Headers, query?: Query) {
        return await this.getListsByName('', offset, limit, headers, query);
    }

    /**
     * Gets all items from a given list
     * @param listId ID of list
     * @param offset Offset in search (default 0)
     * @param limit Amount of items to retrieve (default 10)
     */
    async getItemsFromList(
        listId: string,
        offset?: number,
        limit?: number,
        headers?: Headers,
        query?: Query
    ): Promise<ListItemsModel> {
        return await this.jumbo.get(
            `lists/${listId}/items`,
            headers,
            {
                offset: (offset ? offset : 0).toString(),
                limit: (limit ? limit : 10).toString(),
                ...query
            },
            false
        );
    }

    /**
     * Gets all smart lists (i.e. last purchased) of user (login required)
     */
    async getMySmartLists(headers?: Headers, query?: Query): Promise<PublicListsModel> {
        return await this.jumbo.get(`users/me/smart-lists`, headers, query, true);
    }

    /**
     * Gets all the lists the user currently follows (login required)
     */
    async getMyFollowedLists(headers?: Headers, query?: Query): Promise<PublicListsModel> {
        return await this.jumbo.get(`lists/following`, headers, query, true);
    }

    /**
     * Checks whether the user is following the given list (login required)
     * @param listId ID of list
     */
    async isFollowingList(listId: string, headers?: Headers, query?: Query): Promise<boolean> {
        const isFollowing: Following = await this.jumbo.get(`lists/${listId}/following`, headers, query, true);
        return isFollowing.isFollowing;
    }

    /**
     * Makes the user follow the given list (login required)
     * @param listId ID of list to follow
     */
    async followList(listId: string, headers?: Headers, query?: Query) {
        return await this.jumbo.put(`lists/${listId}/follow`, undefined, headers, query, true);
    }

    /**
     * Makes the user unfollow the given list (login required)
     * @param listId ID of list to unfollow
     */
    async unfollowList(listId: string, headers?: Headers, query?: Query) {
        return await this.jumbo.put(`lists/${listId}/unfollow`, undefined, headers, query, true);
    }
}
