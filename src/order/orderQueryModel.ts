import { Price } from '../product/productModel';
import { Delivery, OrderPrice, OrderProduct, OrderQueryPrice, Payment, Shipping } from './orderModel';

export interface OrderQueryModel {
    orders: OrderModel;
}

export interface SingleOrderQueryModel {
    order: OrderDataResponse;
}

interface OrderDataResponse {
    data: OrderResponse;
}

interface OrderModel {
    data: OrderResponse[];
    offset: number;
    total: number;
}

export interface OrderResponse {
    created: number;
    delivery: Delivery;
    id: string;
    leftToPay?: Price;
    numberOfCrates?: number;
    numberOfPlasticBags?: number;
    orderCutOffDate: number;
    orderProducts?: OrderProduct[];
    paymentMethod?: string;
    payments?: Payment[];
    prickedUp?: number;
    prices?: OrderPrice | OrderQueryPrice;
    shipping?: Shipping;
    status: string;
    storeID?: string;
    type: string;
}
