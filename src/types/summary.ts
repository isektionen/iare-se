import { Status } from "pages/api/checkout/callback";
import { Product, Event } from "./strapi";

export interface OrderReceipt {
    id: number;
    data: Data;
    event: Event;
    created_at: Date;
    updated_at: Date;
    products: Product[];
}

export interface Data {
    customerData: CustomerData;
    sentEmailConfirmation: boolean;
    recieptUrl: string;
    options: {
        reference: string;
        data: MetaData[];
    }[];
    order: Order;
    paymentData?: Partial<PaymentData>;
    errors: any[];
    status: Status[];
}

export interface PaymentData {
    paymentId: string;
    chargeId: string;
    refundId: string;
    invoiceDetails: InvoiceDetails;
    payment: Payment;
}

export interface Payment {
    method: string;
    type: string;
}

export interface InvoiceDetails {
    distributionType: string;
    invoiceDueDate: string;
    invoiceNumber: string;
}

export interface CustomerData {
    firstName: string;
    lastName: string;
    phoneNumber: PhoneNumber;
    email: string;
}

export interface PhoneNumber {
    number: string;
    prefix: string;
}
interface Option {
    label: string;
    value: string;
}
export type MetaData = Record<string, (string | null | Option | boolean)[]>;

export interface Order {
    items: Item[];
    amount: number;
    currency: string;
    reference: string;
}

export interface Item {
    reference: string;
    __reference: string;
    name: string;
    quantity: number;
    unitPrice: number;
    unit: string;
    taxRate: number;
    taxAmount: number;
    grossTotalAmount: number;
    netTotalAmount: number;
}

export interface Formats {
    thumbnail: Format;
    large: Format;
    medium: Format;
    small: Format;
}

export interface Format {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: null;
    url: string;
}

export interface Schedule {
    id: number;
    start: Date;
    end: Date;
    deadline: Date;
}
