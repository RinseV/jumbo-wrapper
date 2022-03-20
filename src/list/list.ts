import { JumboObject, PaginationOptions } from '../base/jumboObject';
import { AdditionalRequestOptions } from '../jumbo';
import { ListItemsModel } from './listItemsModel';
import { ListModel, ListQueryModel } from './listModel';
import { Following, PublicListsModel } from './publicListsModel';

export interface ListOptions extends PaginationOptions {}

export class List extends JumboObject {
    /**
     * Returns all of your lists (login required)
     */
    async getMyLists(additionalRequestOptions?: AdditionalRequestOptions): Promise<ListQueryModel> {
        return await this.jumbo.get(`lists/mylists`, additionalRequestOptions, true);
    }

    /**
     * Returns a single list given a list ID
     * @param listId ID of list
     */
    async getListFromId(listId: string, additionalRequestOptions?: AdditionalRequestOptions): Promise<ListModel> {
        return await this.jumbo.get(`lists/${listId}`, additionalRequestOptions, false);
    }

    /**
     * Returns a list of lists that match the given name (name is case sensitive and very specific)
     * @param listName Name of list (category)
     * @param options Options for search
     * @param options.offset Offset in search (default 0)
     * @param options.limit Amount of lists to retrieve (default 10)
     */
    async getListsByName(
        listName: string,
        options?: ListOptions,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<ListQueryModel> {
        return await this.jumbo.get(
            `lists/search`,
            {
                query: {
                    offset: (options?.offset || 0).toString(),
                    limit: (options?.limit || 10).toString(),
                    q: listName
                },
                ...additionalRequestOptions
            },
            false
        );
    }

    /**
     * Shortcut function to get the most popular lists
     * @param options Options for search
     */
    async getPopularLists(options?: ListOptions, additionalRequestOptions?: AdditionalRequestOptions) {
        return await this.getListsByName('', options, additionalRequestOptions);
    }

    /**
     * Gets all items from a given list
     * @param listId ID of list
     * @param options Options for search
     * @param options.offset Offset in search (default 0)
     * @param options.limit Amount of lists to retrieve (default 10)
     */
    async getItemsFromList(
        listId: string,
        options?: ListOptions,
        additionalRequestOptions?: AdditionalRequestOptions
    ): Promise<ListItemsModel> {
        return await this.jumbo.get(
            `lists/${listId}/items`,
            {
                query: {
                    offset: (options?.offset || 0).toString(),
                    limit: (options?.limit || 10).toString()
                },
                ...additionalRequestOptions
            },
            false
        );
    }

    /**
     * Gets all smart lists (i.e. last purchased) of user (login required)
     */
    async getMySmartLists(additionalRequestOptions?: AdditionalRequestOptions): Promise<PublicListsModel> {
        return await this.jumbo.get(`users/me/smart-lists`, additionalRequestOptions, true);
    }

    /**
     * Gets all the lists the user currently follows (login required)
     */
    async getMyFollowedLists(additionalRequestOptions?: AdditionalRequestOptions): Promise<PublicListsModel> {
        return await this.jumbo.get(`lists/following`, additionalRequestOptions, true);
    }

    /**
     * Checks whether the user is following the given list (login required)
     * @param listId ID of list
     */
    async isFollowingList(listId: string, additionalRequestOptions?: AdditionalRequestOptions): Promise<boolean> {
        const isFollowing: Following = await this.jumbo.get(
            `lists/${listId}/following`,
            additionalRequestOptions,
            true
        );
        return isFollowing.isFollowing;
    }

    /**
     * Makes the user follow the given list (login required)
     * @param listId ID of list to follow
     */
    async followList(listId: string, additionalRequestOptions?: AdditionalRequestOptions) {
        return await this.jumbo.put(`lists/${listId}/follow`, undefined, additionalRequestOptions, true);
    }

    /**
     * Makes the user unfollow the given list (login required)
     * @param listId ID of list to unfollow
     */
    async unfollowList(listId: string, additionalRequestOptions?: AdditionalRequestOptions) {
        return await this.jumbo.put(`lists/${listId}/unfollow`, undefined, additionalRequestOptions, true);
    }
}
