import { QueryBuilder } from '../../../utils/QueryBuilder';
import { ISize } from './size.interface';
import Size from './size.model';
import { sizeSearchableFields } from './size.constant';

const createSizeIntoDB = async (payload: ISize) => {
  const result = await Size.create(payload);
  return result;
};

const getAllSizesFromDB = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(Size.find(), query);

  const [data, meta] = await Promise.all([
    queryBuilder.filter().search(sizeSearchableFields).sort().fields().paginate().build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleSizeFromDB = async (id: string) => {
  const result = await Size.findById(id);
  return result;
};

const updateSizeIntoDB = async (id: string, payload: Partial<ISize>) => {
  const size = await Size.findById(id);
  if (!size) throw new Error("Size not found");

  Object.assign(size, payload);
  await size.save();
  return size;
};

const deleteSizeFromDB = async (id: string) => {
  const size = await Size.findById(id);
  if (!size) throw new Error("Size not found");

  size.isActive = false;
  await size.save();
  return size;
};

export const sizeServices = {
  createSizeIntoDB,
  getAllSizesFromDB,
  getSingleSizeFromDB,
  updateSizeIntoDB,
  deleteSizeFromDB,
};
