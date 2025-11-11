import { QueryBuilder } from '../../../utils/QueryBuilder';
import { IBanner } from './banner.interface';
import Banner from './banner.model';
import { bannerSearchableFields } from './banner.constant';

const createBannerIntoDB = async (payload: IBanner) => {
  const result = await Banner.create(payload);
  return result;
};

const getAllBannersFromDB =async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(Banner.find(), query);

  const [data, meta] = await Promise.all([
    queryBuilder
      .filter()
      .search(bannerSearchableFields)
      .sort()
      .fields()
      .paginate()
      .build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleBannerFromDB = async (id: string) => {
  const result = await Banner.findById(id);
  return result;
};

const updateBannerIntoDB = async (id: string, payload: Partial<IBanner>) => {
  const banner = await Banner.findById(id);
  if (!banner) throw new Error("Banner not found");

  Object.assign(banner, payload);
  await banner.save();
  return banner;
};

const deleteBannerFromDB = async (id: string) => {
  const banner = await Banner.findById(id);
  if (!banner) throw new Error("Banner not found");

  banner.isActive = false;
  await banner.save();
  return banner;
};

export const BannerServices = {
  createBannerIntoDB,
  getAllBannersFromDB,
  getSingleBannerFromDB,
  updateBannerIntoDB,
  deleteBannerFromDB,
};
