import { QueryBuilder } from '../../../utils/QueryBuilder';
import { ISupplier } from './supplier.interface';
import Supplier from './supplier.model';
import { SupplierSearchableFields } from './supplier.constant';

const createSupplierIntoDB = async (payload: ISupplier) => {
  const result = await Supplier.create(payload);
  return result;
};

const getAllSuppliersFromDB = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(Supplier.find(), query);

  const result = queryBuilder
    .filter()
    .search(SupplierSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    result.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleSupplierFromDB = async (id: string) => {
  const result = await Supplier.findById(id);
  return result;
};

const updateSupplierIntoDB = async (id: string, payload: Partial<ISupplier>) => {
  const supplier = await Supplier.findById(id);
  if (!supplier) throw new Error('Supplier not found');

  const result = await Supplier.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteSupplierFromDB = async (id: string) => {
  const supplier = await Supplier.findById(id);
  if (!supplier) throw new Error('Supplier not found');

  // Soft delete instead of hard delete
  const result = await Supplier.findByIdAndUpdate(
    id,
    { isDeleted: true, isActive: false },
    { new: true }
  );

  return result;
};

export const SupplierServices = {
  createSupplierIntoDB,
  getAllSuppliersFromDB,
  getSingleSupplierFromDB,
  updateSupplierIntoDB,
  deleteSupplierFromDB,
};
