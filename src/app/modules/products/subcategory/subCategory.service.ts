import { QueryBuilder } from '../../../utils/QueryBuilder';
import { ISubCategory } from './sub.category.interface';
import SubCategory from './sub.category.model';
import { SubCategorySearchableFields } from './subCategory.constant';
import ProductCategory from '../category/category.model'; // Mongoose model

const createSubCategoryIntoDB = async (payload: ISubCategory) => {
  const result = await SubCategory.create(payload);
  return result;
};

const getAllSubCategorysFromDB = async (query: Record<string, any>) => {
  // Start with a Mongoose query
  const mongooseQuery = SubCategory.find().populate({
    path: 'categoryId', // reference field
    select: 'name',     // only select name
    model: ProductCategory,
  });

  const queryBuilder = new QueryBuilder(mongooseQuery, query);

  const [data, meta] = await Promise.all([
    queryBuilder.filter().search(SubCategorySearchableFields).sort().fields().paginate().build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleSubCategoryFromDB = async (id: string) => {
  const result = await SubCategory.findById(id).populate({
    path: 'categoryId',
    select: 'name',
    model: ProductCategory,
  });
  return result;
};

const updateSubCategoryIntoDB = async (id: string, payload: Partial<ISubCategory>) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) throw new Error('SubCategory not found');

  Object.assign(subCategory, payload);
  await subCategory.save();
  return subCategory;
};

const deleteSubCategoryFromDB = async (id: string) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) throw new Error('SubCategory not found');

  subCategory.isActive = false;
  await subCategory.save();
  return subCategory;
};

export const SubCategoryServices = {
  createSubCategoryIntoDB,
  getAllSubCategorysFromDB,
  getSingleSubCategoryFromDB,
  updateSubCategoryIntoDB,
  deleteSubCategoryFromDB,
};
