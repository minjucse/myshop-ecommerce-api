import { QueryBuilder } from '../../../utils/QueryBuilder';
import { ICategory } from './category.interface';
import Category from './category.model';
import { CategorySearchableFields } from './category.constant';

const createCategoryIntoDB = async (payload: ICategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(Category.find(), query);

  const [data, meta] = await Promise.all([
    queryBuilder.filter().search(CategorySearchableFields).sort().fields().paginate().build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getDropdownCategoriesFromDB = async () => {
  const result = await Category.find({ isActive: true })
    .select('_id name')
    .sort({ name: 1 });
  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const updateCategoryIntoDB = async (id: string, payload: Partial<ICategory>) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  Object.assign(category, payload);
  const result = await category.save();
  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  category.isDeleted = true;
  category.isActive = false;
  const result = await category.save();
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  getDropdownCategoriesFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
