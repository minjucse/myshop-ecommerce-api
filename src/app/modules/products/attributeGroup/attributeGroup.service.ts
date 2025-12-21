import { QueryBuilder } from '../../../utils/QueryBuilder';
import { IAttributeGroup } from './attributeGroup.interface';
import AttributeGroup from './attributeGroup.model';
import { AttributeGroupSearchableFields } from './attributeGroup.constant';

const createAttributeGroupIntoDB = async (payload: IAttributeGroup) => {
  const result = await AttributeGroup.create(payload);
  return result;
};

const getAllAttributeGroupsFromDB = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(AttributeGroup.find(), query);

  const [data, meta] = await Promise.all([
    queryBuilder.filter().search(AttributeGroupSearchableFields).sort().fields().paginate().build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getDropdownAttributeGroupsFromDB = async () => {
  const result = await AttributeGroup.find({ isActive: true })
    .select('_id name')
    .sort({ name: 1 });
  return result;
};

const getSingleAttributeGroupFromDB = async (id: string) => {
  const result = await AttributeGroup.findById(id);
  return result;
};

const updateAttributeGroupIntoDB = async (id: string, payload: Partial<IAttributeGroup>) => {
  const existingResult = await AttributeGroup.findById(id);
  if (!existingResult) throw new Error("AttributeGroup not found");

  Object.assign(existingResult, payload);
  const result = await existingResult.save();
  return result;
};

const deleteAttributeGroupFromDB = async (id: string) => {
  const existingResult = await AttributeGroup.findById(id);
  if (!existingResult) throw new Error("AttributeGroup not found");

  existingResult.isDeleted = true;
  existingResult.isActive = false;
  const result = await existingResult.save();
  return result;
};

export const AttributeGroupServices = {
  createAttributeGroupIntoDB,
  getAllAttributeGroupsFromDB,
  getSingleAttributeGroupFromDB,
  getDropdownAttributeGroupsFromDB,
  updateAttributeGroupIntoDB,
  deleteAttributeGroupFromDB,
};
