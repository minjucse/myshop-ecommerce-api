import { Schema } from "mongoose";
import { BaseModel } from "../../../models/base.model";
import { IContactReply } from "./contactReply.interface";

const contactReplySchema = new Schema<IContactReply>(
  {
    contactMessageId: {
      type: Schema.Types.ObjectId,
      ref: "ContactMessage",
      required: [true, "Contact message ID is required"],
    },

    replyText: {
      type: String,
      required: [true, "Reply text is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

// Inherit BaseModel fields
const ContactReply = BaseModel.discriminator<IContactReply>(
  "ContactReply",
  contactReplySchema
);

export default ContactReply;
