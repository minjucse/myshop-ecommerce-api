import { QueryBuilder } from '../../../utils/QueryBuilder';
import { IColor } from './color.interface';
import Color from './color.model';
import { colorSearchableFields } from './color.constant';

const createColorIntoDB = async (payload: IColor) => {
    const existing = await Color.findOne({ name: payload.name });
  if (existing) throw new Error(`Color with name "${payload.name}" already exists`);

  const result = await Color.create(payload);
  return result;
};

const getAllColorsFromDB = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(Color.find(), query);

  const [data, meta] = await Promise.all([
    queryBuilder.filter().search(colorSearchableFields).sort().fields().paginate().build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleColorFromDB = async (id: string) => {
  const result = await Color.findById(id);
  return result;
};

const updateColorIntoDB = async (id: string, payload: Partial<IColor>) => {
  const checkResult = await Color.findById(id);
  if (!checkResult) throw new Error('Color not found');

   if (payload.name && payload.name !== checkResult.name) {
      const existing = await Color.findOne({ name: payload.name });
      if (existing) throw new Error(`"${payload.name}" already exists`);
    }
  Object.assign(checkResult, payload);
  const result = await checkResult.save();
  return result;
};

const deleteColorFromDB = async (id: string) => {
  const checkResult = await Color.findById(id);
  if (!checkResult) throw new Error('Color not found');

  checkResult.isActive = false;
  const result = await checkResult.save();
  return result;
};

export const colorServices = {
  createColorIntoDB,
  getAllColorsFromDB,
  getSingleColorFromDB,
  updateColorIntoDB,
  deleteColorFromDB,
};
