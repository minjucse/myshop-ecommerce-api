
import { QueryBuilder } from "../../../utils/QueryBuilder";
import ProductDetail from "./product.model";
import ProductAttribute from "../productVariant/productVariant.model";
import AttributeValue from "../attributeValue/attributeValue.model";
import { IProduct, IProductPopulated } from "./product.interface";
import { IProductAttribute } from "../productVariant/productVariant.interface";
import { productSearchableFields } from "./product.constant";
import StockDetail from "../../stock/stockDetail/stockDetail.model";
import StockDetailAttribute from "../../stock/stockDetailAttribute/stockDetailAttribute.model";

// ---------------------------
// Helper: Check Duplicate Attributes
// ---------------------------
const checkDuplicateAttributes = async (
    productId: string,
    attributes: IProductAttribute[]
) => {
    for (const attr of attributes) {
        const exists = await ProductAttribute.findOne({
            productDetailId: productId,
            attributeValueId: attr.attributeValueId,
        });

        if (exists) {
            throw new Error(
                `Duplicate attribute found for attributeValueId: ${attr.attributeValueId}`
            );
        }
    }
};

// ---------------------------
// Create Product
// ---------------------------
export const createProductIntoDB = async (payload: IProduct) => {
    // 🔹 Check duplicate product name
    const existingProduct = await ProductDetail.findOne({
        name: payload.name,
        isActive: true,
    });

    if (existingProduct) {
        throw new Error(`Product "${payload.name}" already exists`);
    }

    // 🔹 Create product first
    const product = await ProductDetail.create(payload);
    // 🔹 Create Stock Detail
    const stockDetail = await StockDetail.create({
        productDetailId: product._id,
        purchased: 0,
        sold: 0,
        freeSold: 0,
        onHand: payload.startingInventory ?? 0,
        onHandFree: 0,
        minimumStockToNotify: payload.minimumStockToNotify ?? 0,
    });

    // 🔹 Check duplicate attributes and save
    if (payload.productAttributes?.length) {
        await checkDuplicateAttributes(
            product._id.toString(),
            payload.productAttributes
        );

        const attributesToInsert = payload.productAttributes.map((attr) => ({
            ...attr,
            productDetailId: product._id,
        }));

        await ProductAttribute.insertMany(attributesToInsert);
        const stockAttributes = payload.productAttributes.map((attr) => ({
            stockDetailId: stockDetail._id,
            attributeValueId: attr.attributeValueId,

            purchased: 0,
            sold: 0,
            freeSold: 0,
            onHand: payload.startingInventory ?? 0,
            onHandFree: 0,
            minimumStockToNotify: payload.minimumStockToNotify ?? 0,
        }));

        await StockDetailAttribute.insertMany(stockAttributes);
    }

    return product;
};

// ---------------------------
// Get All Attribute Values (with QueryBuilder)
// ---------------------------
export const getAllProductDetailsFromDB = async (query: Record<string, any>) => {
    const mongooseQuery = ProductDetail.find()
        .populate('brandId', 'name')
        .populate('categoryId', 'name')
        .populate('subCategoryId', 'name')
        .populate('measurementUnitId', 'name');

    const queryBuilder = new QueryBuilder(mongooseQuery, query);

    const [products, meta] = await Promise.all([
        queryBuilder
            .filter()
            .search(productSearchableFields)
            .sort()
            .fields()
            .paginate()
            .build(),
        queryBuilder.getMeta(),
    ]);

    const data = products.map((item: any) => ({
        ...item.toObject(),
        brandName: item.brandId?.name || null,
        categoryName: item.categoryId?.name || null,
        subCategoryName: item.subCategoryId?.name || null,
        measurementUnitName: item.measurementUnitId?.name || null,
    }));

    return { data, meta };
};


// ---------------------------
// Get Single Attribute Value
// ---------------------------
export const getSingleProductDetailFromDB = async (id: string) => {
    const product = await ProductDetail.findById(id)
        .populate("brandId", "name")
        .populate("categoryId", "name")
        .populate("subCategoryId", "name")
        .populate("measurementUnitId", "name")
        .lean<IProductPopulated>();

    if (!product) {
        throw new Error("Product not found");
    }

    const productAttributes = await ProductAttribute.find({
        productDetailId: id,
    }).populate({
        path: "attributeValueId",
        populate: {
            path: "attributeGroupId",
            select: "name",
        },
    });

    return {
        ...product,

        brandName: product.brandId?.name ?? null,
        categoryName: product.categoryId?.name ?? null,
        subCategoryName: product.subCategoryId?.name ?? null,
        measurementUnitName: product.measurementUnitId?.name ?? null,

        productAttributes,
    };
};




// ---------------------------
// Get Dropdown Active Attribute Values
// ---------------------------
export const getDropdownProductDetailFromDB = async () => {
    const result = await AttributeValue.find({ isActive: true })
        .select("_id name")
        .sort({ name: 1 });
    return result;
};

// ---------------------------
// Update Attribute Value
// ---------------------------
export const updateProductDetailIntoDB = async (
    productId: string,
    payload: Partial<IProduct>
) => {
    // ---------------------------
    // 1. Check Product Exists
    // ---------------------------
    const product = await ProductDetail.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    // ---------------------------
    // 2. Update Product Fields
    // ---------------------------
    Object.assign(product, payload);
    await product.save();

    // ---------------------------
    // 3. Update Stock Detail
    // ---------------------------
    const stockDetail = await StockDetail.findOne({
        productDetailId: product._id,
    });

    if (stockDetail) {
        stockDetail.onHand = payload.startingInventory ?? stockDetail.onHand;
        stockDetail.minimumStockToNotify =
            payload.minimumStockToNotify ?? stockDetail.minimumStockToNotify;

        await stockDetail.save();
    }

    // ---------------------------
    // 4. Update Attributes
    // ---------------------------
    if (payload.productAttributes?.length) {
        // 🔹 Remove old attributes
        await ProductAttribute.deleteMany({
            productDetailId: product._id,
        });

        await StockDetailAttribute.deleteMany({
            stockDetailId: stockDetail?._id,
        });

        // 🔹 Check duplicates
        const uniqueSet = new Set<string>();
        for (const attr of payload.productAttributes) {
            const key = `${attr.attributeValueId}`;
            if (uniqueSet.has(key)) {
                throw new Error(
                    `Duplicate attribute found: ${attr.attributeValueId}`
                );
            }
            uniqueSet.add(key);
        }

        // 🔹 Insert Product Attributes
        const productAttributes = payload.productAttributes.map((attr) => ({
            ...attr,
            productDetailId: product._id,
        }));

        await ProductAttribute.insertMany(productAttributes);

        // 🔹 Insert Stock Attributes
        const stockAttributes = payload.productAttributes.map((attr) => ({
            stockDetailId: stockDetail?._id,
            attributeValueId: attr.attributeValueId,
            purchased: 0,
            sold: 0,
            freeSold: 0,
            onHand: payload.startingInventory ?? 0,
            onHandFree: 0,
            minimumStockToNotify:
                payload.minimumStockToNotify ?? 0,
        }));

        await StockDetailAttribute.insertMany(stockAttributes);
    }

    return product;
};


// ---------------------------
// Soft Delete Attribute Value
// ---------------------------
export const deleteProductDetailFromDB = async (id: string) => {
    const attributeValue = await AttributeValue.findById(id);
    if (!attributeValue) throw new Error("Attribute Value not found");

    attributeValue.isActive = false;
    await attributeValue.save();
    return attributeValue;
};

// ---------------------------
// Export Service
// ---------------------------
export const ProductServices = {
    createProductIntoDB,
    getAllProductDetailsFromDB,
    getDropdownProductDetailFromDB,
    getSingleProductDetailFromDB,
    updateProductDetailIntoDB,
    deleteProductDetailFromDB,
};
