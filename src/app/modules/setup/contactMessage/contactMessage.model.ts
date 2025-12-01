import mongoose, { Schema } from "mongoose";
import { BaseModel } from "../../../models/base.model";
import { IContactMessage } from "./contactMessage.interface";

const contactMessageSchema = new Schema<IContactMessage>(
  {
    clientName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email",
      ],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

/* ------------------------------
   🔗 Virtual Populate
------------------------------ */
contactMessageSchema.virtual("replies", {
  ref: "ContactReply",
  foreignField: "contactMessageId",
  localField: "_id",
});

/* ------------------------------
   🔄 Auto-populate replies (FIXED)
------------------------------ */
contactMessageSchema.pre(/^find/, function (next) {
  (this as mongoose.Query<any, any>).populate("replies");
  next();
});

/* ------------------------------
   🧬 Discriminator Model
------------------------------ */
const ContactMessage = BaseModel.discriminator<IContactMessage>(
  "ContactMessage",
  contactMessageSchema
);

export default ContactMessage;
