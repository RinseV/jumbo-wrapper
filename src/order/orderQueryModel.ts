import { OrderData } from './orderModel';

export interface OrderQueryModel {
    orders: OrderModel;
}

interface OrderModel {
    data: OrderData[];
    offset: number;
    total: number;
}
