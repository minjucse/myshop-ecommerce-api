// src/modules/banner/banner.model.ts
import { Schema } from "mongoose";
import { BaseModel } from "../../../models/base.model";
import { IBanner } from "./banner.interface";

const BannerSchema = new Schema<IBanner>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imgPath: {
    type: String,
    trim: true,
    default: "",
  },
  imageUrl: {
    type: String,
    trim: true,
    default: "",
  },
});

// ✅ Inherit BaseSchema fields via discriminator
const Banner = BaseModel.discriminator<IBanner>("Banner", BannerSchema);

export default Banner;
