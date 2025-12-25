import { QueryBuilder } from '../../../utils/QueryBuilder';
import { IAttributeValue } from './attributeValue.interface';
import  AttributeValue  from './attributeValue.model';
import AttributeGroup from '../attributeGroup/attributeGroup.model'; 
import { AttributeValueSearchableFields } from './attributeValue.constant';

const createAttributeValueIntoDB = async (payload: IAttributeValue) => {
  // Check if this specific name already exists within the same Attribute Group
  const existing = await AttributeValue.findOne({
    name: payload.name,
    attributeGroupId: payload.attributeGroupId,
  });

  if (existing) {
    throw new Error(`Value "${payload.name}" already exists for this attribute group.`);
  }

  const result = await AttributeValue.create(payload);
  return result;
};


const getAllAttributeValuesFromDB = async (query: Record<string, any>) => {
  const mongooseQuery = AttributeValue.find().populate({
    path: 'attributeGroupId',
    select: 'name', 
    model: AttributeGroup,
  });

  const queryBuilder = new QueryBuilder(mongooseQuery, query);

  const [rawData, meta] = await Promise.all([
    queryBuilder
      .filter()
      .search(AttributeValueSearchableFields) 
      .sort()
      .fields()
      .paginate()
      .build(),
    queryBuilder.getMeta(),
  ]);

  const data = rawData.map((item: any) => ({
    ...item.toObject(),
    attributeGroupName: item.attributeGroupId?.name ?? null,
  }));

  return { data, meta };
};

const getSingleAttributeValueFromDB = async (id: string) => {
  const result = await AttributeValue.findById(id).populate({
    path: 'attributeGroupId',
    select: 'name',
    model: AttributeGroup,
  });

  if (!result) return null;

  return result;
};

const getDropdownAttributeValueFromDB = async () => {
  const result = await AttributeValue.find({ isActive: true })
    .select('_id name')
    .sort({ name: 1 });
  return result;
};

const updateAttributeValueIntoDB = async (id: string, payload: Partial<IAttributeValue>) => {
  const attributeValue = await AttributeValue.findById(id);
  if (!attributeValue) throw new Error('Attribute Value not found');

  // If changing name or group, check for duplicates
  if (
    (payload.name && payload.name !== attributeValue.name) ||
    (payload.attributeGroupId && payload.attributeGroupId.toString() !== attributeValue.attributeGroupId.toString())
  ) {
    const existing = await AttributeValue.findOne({
      name: payload.name || attributeValue.name,
      attributeGroupId: payload.attributeGroupId || attributeValue.attributeGroupId,
      _id: { $ne: id },
    });

    if (existing) {
      throw new Error(`Value already exists in this attribute group.`);
    }
  }

  Object.assign(attributeValue, payload);
  await attributeValue.save();
  return attributeValue;
};


const deleteAttributeValueFromDB = async (id: string) => {
  const attributeValue = await AttributeValue.findById(id);
  if (!attributeValue) throw new Error('Attribute Value not found');

  attributeValue.isActive = false; 
  await attributeValue.save();
  return attributeValue;
};

export const AttributeValueServices = {
  createAttributeValueIntoDB,
  getAllAttributeValuesFromDB,
  getDropdownAttributeValueFromDB,
  getSingleAttributeValueFromDB,
  updateAttributeValueIntoDB,
  deleteAttributeValueFromDB,
};