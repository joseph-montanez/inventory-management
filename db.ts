import Dexie, { Table } from 'dexie';

export interface Product {
    id?: string;
    name: string;
    description: string;
    sku: string;
    isStockManaged: boolean;
    stock: number,
    allowBackOrders: boolean,
    lowStockThreshold: number,
    isSoldIndividually: boolean,
    weight: number,
    weightUnit: string,
    isEnvelope: boolean,
    declaredValue: number,
    shippingClass: string,
    hasPerProductShipping: boolean,
}

export class Database extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    products!: Table<Product>;

    constructor() {
        super('db');
        this.version(2).stores({
            products: '++id, name, sku' // Primary key and indexed props
        });
    }
}

export const db = new Database();
