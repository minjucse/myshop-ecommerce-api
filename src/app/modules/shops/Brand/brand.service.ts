import { QueryBuilder } from '../../../utils/QueryBuilder';
import { IBrand } from './brand.interface';
import Brand from './brand.model';
import { BrandSearchableFields } from './brand.constant';

const createBrandIntoDB = async (payload: IBrand) => {
  const result = await Brand.create(payload);
  return result;
};

const getAllBrandsFromDB = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(Brand.find(), query);

  const [data, meta] = await Promise.all([
    queryBuilder.filter().search(BrandSearchableFields).sort().fields().paginate().build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleBrandFromDB = async (id: string) => {
  const result = await Brand.findById(id);
  return result;
};

const updateBrandIntoDB = async (id: string, payload: Partial<IBrand>) => {
  const brand = await Brand.findById(id);
  if (!brand) throw new Error("Brand not found");

  Object.assign(brand, payload);
  await brand.save();
  return brand;
};

const deleteBrandFromDB = async (id: string) => {
  const brand = await Brand.findById(id);
  if (!brand) throw new Error("Brand not found");

  brand.isActive = false;
  await brand.save();
  return brand;
};

export const BrandServices = {
  createBrandIntoDB,
  getAllBrandsFromDB,
  getSingleBrandFromDB,
  updateBrandIntoDB,
  deleteBrandFromDB,
};
