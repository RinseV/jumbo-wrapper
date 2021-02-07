import { Query, Headers } from '../jumbo';
import { JumboObject } from '../base/jumboObject';
import { OrderModel } from './orderModel';
import { OrderQueryModel } from './orderQueryModel';

export class Order extends JumboObject {
    /**
     * Gets order from ID
     * @param orderId Order ID
     */
    async getMyOrderById(orderId: number, headers?: Headers, query?: Query) {
        return await this.jumbo.get(
            `users/me/orders/${orderId}`,
            headers,
            query,
            this.authRequired
        );
    }

    /**
     * Returns all the users' orders
     * @param offset Offset (default 0)
     * @param count Amount of orders (default 10)
     */
    async getMyOrders(
        offset?: number,
        count?: number,
        headers?: Headers,
        query?: Query
    ): Promise<OrderModel[]> {
        // Query all orders as orderQueryModel
        const orders: OrderQueryModel = await this.jumbo.get(
            `users/me/orders`,
            headers,
            {
                offset: (offset ? offset : 0).toString(),
                count: (count ? count : 10).toString(),
                ...query,
            },
            this.authRequired
        );
        // Create OrderModel for every OrderQuery
        const result: OrderModel[] = [];
        for (var key in orders.orders.data) {
            const order: OrderModel = {
                order: {
                    data: orders.orders.data[key],
                },
            };
            result.push(order);
        }
        // Return array of OrderModel
        return result;
    }

    /**
     * Shortcut function to return latest (first) order
     */
    async getMyLatestOrder(
        headers?: Headers,
        query?: Query
    ): Promise<OrderModel> {
        const orders = await this.getMyOrders(0, 1, headers, query);
        return orders[0];
    }
}
