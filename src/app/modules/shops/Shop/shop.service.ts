import { QueryBuilder } from '../../../utils/QueryBuilder';
import { IShop } from './shop.interface';
import Shop from './shop.model';
import { ShopSearchableFields } from './shop.constant';

const createShopIntoDB = async (payload: IShop) => {
  const result = await Shop.create(payload);
  return result;
};

const getAllShopsFromDB = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Shop.find(), query);
  const result = queryBuilder
    .filter()
    .search(ShopSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    result.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleShopFromDB = async (id: string) => {
  const result = await Shop.findById(id);
  return result;
};

const updateShopIntoDB = async (id: string, payload: Partial<IShop>) => {
  const result = await Shop.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new Error('Shop not found');
  return result;
};

const deleteShopFromDB = async (id: string) => {
  const result = await Shop.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  if (!result) throw new Error('Shop not found');
  return result;
};

export const ShopServices = {
  createShopIntoDB,
  getAllShopsFromDB,
  getSingleShopFromDB,
  updateShopIntoDB,
  deleteShopFromDB,
};
