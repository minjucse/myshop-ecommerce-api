import { Schema, model } from 'mongoose';
import { IBanner } from './banner.interface';

const bannerSchema = new Schema<IBanner>(
  {
    name: { type: String, required: true, trim: true },
    imgPath: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// Optional: add hooks if needed
// bannerSchema.pre('save', async function(next) { ... });

const Banner = model<IBanner>('Banner', bannerSchema);

export default Banner;
