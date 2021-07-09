export interface ICheckoutSession {
    paymentId: string;
}

export interface ITicketInfo {
    paymentId: string;
    status: string;
    tickets: ITicket[];
}

export type ITicket = {
    id: number;
    reference: string;
    price: number;
};

export interface IConfirmation {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}
