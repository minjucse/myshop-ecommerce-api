import { QueryBuilder } from '../../../utils/QueryBuilder';
import { ISubCategory } from './sub.category.interface';
import SubCategory from './sub.category.model';
import { SubCategorySearchableFields } from './subCategory.constant';
import ProductCategory from '../category/category.model'; // Mongoose model

// -------------------------------
// CREATE
// -------------------------------
const createSubCategoryIntoDB = async (payload: ISubCategory) => {
   const existing = await SubCategory.findOne({
    name: payload.name,
    categoryId: payload.categoryId,
  });

  if (existing) {
    throw new Error(
      `"${payload.name}" already exists in this categoryid or `
    );
  }
  const result = await SubCategory.create(payload);
  return result;
};

// -------------------------------
// GET ALL WITH categoryName
// -------------------------------
const getAllSubCategorysFromDB = async (query: Record<string, any>) => {
  const mongooseQuery = SubCategory.find().populate({
    path: 'categoryId',
    select: 'name',
    model: ProductCategory,
  });

  const queryBuilder = new QueryBuilder(mongooseQuery, query);

  const [rawData, meta] = await Promise.all([
    queryBuilder
      .filter()
      .search(SubCategorySearchableFields)
      .sort()
      .fields()
      .paginate()
      .build(),
    queryBuilder.getMeta(),
  ]);

  // 🟩 Add categoryName to each item
  const data = rawData.map((item: any) => ({
    ...item.toObject(),
    categoryName: item.categoryId?.name ?? null,
  }));

  return { data, meta };
};

// -------------------------------
// GET SINGLE WITH categoryName
// -------------------------------
const getSingleSubCategoryFromDB = async (id: string) => {
  const result = await SubCategory.findById(id).populate({
    path: 'categoryId',
    select: 'name',
    model: ProductCategory,
  });

  if (!result) return null;

  return {
    ...result.toObject(),
      categoryId: result.categoryId?._id ?? result.categoryId,
  };
};

const getSubCategoryDropdownFromDB = async (categoryId: string) => {
  const result = await SubCategory.find({
    isActive: true,
    categoryId, // 🔥 filter by category
  })
    .select('_id name')
    .sort({ name: 1 })
    .lean();

  return result;
};

// -------------------------------
// UPDATE
// -------------------------------
const updateSubCategoryIntoDB = async (id: string, payload: Partial<ISubCategory>) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) throw new Error('SubCategory not found');

 if (
    (payload.name && payload.name !== subCategory.name) ||
    (payload.categoryId && payload.categoryId.toString() !== subCategory.categoryId.toString())
  ) {
    const existing = await SubCategory.findOne({
      name: payload.name || subCategory.name,
      categoryId: payload.categoryId || subCategory.categoryId,
      _id: { $ne: id }, 
    });

    if (existing) {
      throw new Error(`"${payload.name}" already exists in this categoryId or name `);
    }
  }
  Object.assign(subCategory, payload);
  await subCategory.save();
  return subCategory;
};

// -------------------------------
// DELETE (soft delete)
// -------------------------------
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
  getSubCategoryDropdownFromDB,
  getSingleSubCategoryFromDB,
  updateSubCategoryIntoDB,
  deleteSubCategoryFromDB,
};
