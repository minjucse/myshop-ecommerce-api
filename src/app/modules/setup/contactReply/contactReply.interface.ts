import { Types } from "mongoose";
import { IBaseDocument } from "../../../models/base.model";

export interface IContactReply extends IBaseDocument  {
  contactMessageId: Types.ObjectId | string;
  replyText: string;
}