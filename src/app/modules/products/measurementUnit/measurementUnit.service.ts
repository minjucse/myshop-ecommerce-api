import { QueryBuilder } from '../../../utils/QueryBuilder';
import { IMeasurementUnit } from './measurementUnit.interface';
import MeasurementUnit from './measurementUnit.model';
import { MeasurementUnitSearchableFields } from './measurementUnit.constant';

const createMeasurementUnitIntoDB = async (payload: IMeasurementUnit) => {
  const result = await MeasurementUnit.create(payload);
  return result;
};

const getAllMeasurementUnitsFromDB = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(MeasurementUnit.find(), query);

  const [data, meta] = await Promise.all([
    queryBuilder.filter().search(MeasurementUnitSearchableFields).sort().fields().paginate().build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getDropdownMeasurementUnitsFromDB = async () => {
  const result = await MeasurementUnit.find({ isActive: true })
    .select('_id name')
    .sort({ name: 1 });
  return result;
};

const getSingleMeasurementUnitFromDB = async (id: string) => {
  const result = await MeasurementUnit.findById(id);
  return result;
};

const updateMeasurementUnitIntoDB = async (id: string, payload: Partial<IMeasurementUnit>) => {
  const existingResult = await MeasurementUnit.findById(id);
  if (!existingResult) throw new Error("MeasurementUnit not found");

  Object.assign(existingResult, payload);
  const result = await existingResult.save();
  return result;
};

const deleteMeasurementUnitFromDB = async (id: string) => {
  const existingResult = await MeasurementUnit.findById(id);
  if (!existingResult) throw new Error("MeasurementUnit not found");

  existingResult.isDeleted = true;
  existingResult.isActive = false;
  const result = await existingResult.save();
  return result;
};

export const MeasurementUnitServices = {
  createMeasurementUnitIntoDB,
  getAllMeasurementUnitsFromDB,
  getSingleMeasurementUnitFromDB,
  getDropdownMeasurementUnitsFromDB,
  updateMeasurementUnitIntoDB,
  deleteMeasurementUnitFromDB,
};
