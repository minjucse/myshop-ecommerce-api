import { IBaseDocument } from "../../../models/base.model";
import { IContactReply } from "../contactReply/contactReply.interface";

export interface IContactMessage extends IBaseDocument {
    clientName: string;
    email: string;
    subject: string;
    message: string;
    status: "new" | "read" | "replied";
    replies?: IContactReply[];
}