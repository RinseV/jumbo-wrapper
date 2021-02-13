import { Query, Headers } from '../jumbo';
import { JumboObject } from '../base/jumboObject';
import {
    Delivery,
    DeliveryDate,
    OrderModel,
    Shipping,
    ShippingDate,
} from './orderModel';
import {
    OrderQueryModel,
    OrderResponse,
    SingleOrderQueryModel,
} from './orderQueryModel';
import { fromUnixTime } from 'date-fns';

export class Order extends JumboObject {
    /**
     * Gets order from ID
     * @param orderId Order ID
     */
    async getMyOrderById(
        orderId: number,
        headers?: Headers,
        query?: Query
    ): Promise<OrderModel> {
        // Get order from endpoint
        const order: SingleOrderQueryModel = await this.jumbo.get(
            `users/me/orders/${orderId}`,
            headers,
            query,
            this.authRequired
        );
        // Convert times to dates
        return this.convertOrderResponseToOrderModel(order.order.data);
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
        // Convert responses to models
        return orders.orders.data.map((orderResponse) => {
            return this.convertOrderResponseToOrderModel(orderResponse);
        });
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

    /**
     * Returns all of the user's orders with a certain status
     * @param status Status of the order (Processing, Open, Completed)
     */
    async getMyOrdersByStatus(
        status: OrderStatus,
        headers?: Headers,
        query?: Query
    ): Promise<OrderModel[]> {
        const orders = await this.getMyOrders(
            undefined,
            undefined,
            headers,
            query
        );
        return orders.filter((order) => {
            return order.order.data.status === status;
        });
    }

    /**
     * Shortcut function to retrieve the latest order that matches the status
     * @param status Status of the order
     */
    async getMyLatestOrderByStatus(
        status: OrderStatus,
        headers?: Headers,
        query?: Query
    ): Promise<OrderModel> {
        const orders = await this.getMyOrdersByStatus(status, headers, query);
        return orders[0];
    }

    /**
     * Gets the user's relevant orders (which includes shipping time)
     */
    async getMyRelevantOrders(
        headers?: Headers,
        query?: Query
    ): Promise<OrderModel[]> {
        const orders = await this.getMyOrders(undefined, undefined, headers, {
            relevant: 'true',
            ...query,
        });
        return orders;
    }

    /**
     * Converts response to actual data by first converting unix timestamps to dates
     * @param order OrderResponse to convert
     */
    private convertOrderResponseToOrderModel(order: OrderResponse): OrderModel {
        // Simply convert the delivery object and cut-off date
        const orderModel: OrderModel = {
            order: {
                data: {
                    ...order,
                    delivery: this.convertDeliveryTimesToDates(order.delivery),
                    orderCutOffDate: this.convertUnixDateToDate(
                        order.orderCutOffDate
                    ),
                    shipping: undefined,
                },
            },
        };
        // Add shipping if required
        if (order.shipping) {
            orderModel.order.data.shipping = this.convertShippingTimesToDates(
                order.shipping
            );
        }
        return orderModel;
    }

    /**
     * Converts shipping unix timestamps of order to actual dates
     * @param shipping order.data.shipping
     */
    private convertShippingTimesToDates(shipping: Shipping): ShippingDate {
        const shippingDate: ShippingDate = {
            plannedETAStart: this.convertUnixDateToDate(
                shipping.plannedETAStart
            ),
            plannedETAEnd: this.convertUnixDateToDate(shipping.plannedETAEnd),
            unknownLiveETA: shipping.unknownLiveETA,
        };
        if (shipping.liveETA) {
            shippingDate.liveETA = this.convertUnixDateToDate(shipping.liveETA);
        }
        return shippingDate;
    }

    /**
     * Converts delivery unix timestamps of order to actual dates
     * @param delivery order.data.delivery
     */
    private convertDeliveryTimesToDates(delivery: Delivery): DeliveryDate {
        // First convert these 3 separately
        const date = this.convertUnixDateToDate(delivery.date);
        const startDate = this.convertUnixDateToDate(delivery.startDateTime);
        const endDate = this.convertUnixDateToDate(delivery.endDateTime);

        // Add them to return object
        const deliveryDate: DeliveryDate = {
            address: delivery.address,
            date: date,
            endDateTime: endDate,
            location: delivery.location,
            price: delivery.price,
            startDateTime: startDate,
            time: delivery.time,
        };

        // Only convert and add collection date if it's in the original delivery data
        if (delivery.collectionDateTime) {
            const collectionDate = this.convertUnixDateToDate(
                delivery.collectionDateTime
            );
            deliveryDate.collectionDateTime = collectionDate;
        }

        return deliveryDate;
    }

    /**
     * Converts given unix timestamp to a Date
     */
    private convertUnixDateToDate(unixDate: number): Date {
        return fromUnixTime(this.formatUnixTimestamp(unixDate));
    }

    /**
     * Strips the last 3 digits off the timestamp to properly convert
     */
    private formatUnixTimestamp(unixDate: number): number {
        return (unixDate - (unixDate % 1000)) / 1000;
    }
}

export enum OrderStatus {
    Processing = 'PROCESSING',
    Open = 'OPEN',
    ReadyToDeliver = 'READY_TO_DELIVER',
    Completed = 'PICKED_UP',
}
