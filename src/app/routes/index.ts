import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { BrandRoutes } from "../modules/shops/Brand/brand.route";
import { ShopRoutes } from "../modules/shops/Shop/shop.route";
import { SupplierRoutes } from "../modules/shops/Supplier/supplier.route";
import { ColorRoutes } from "../modules/products/colors/color.route";
import { SizeRoutes } from "../modules/products/size/size.route";
import { BannerRoutes } from "../modules/setup/banner/banner.route";
import { CategoryRoutes } from "../modules/products/category/category.route";
import { SubCategoryRoutes } from "../modules/products/subcategory/subCategory.route";
import { ContactMessageRoutes } from "../modules/setup/contactMessage/contactMessage.route";
import { ContactReplyRoutes } from "../modules/setup/contactReply/contactReply.route";

export const router = Router();

const moduleRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/brands", route: BrandRoutes },
  { path: "/shops", route: ShopRoutes },
  { path: "/banners", route: BannerRoutes },
  { path: "/suppliers", route: SupplierRoutes },
  { path: "/colors", route: ColorRoutes },
  { path: "/sizes", route: SizeRoutes },
  { path: "/categories", route: CategoryRoutes },
  { path: "/sub-categories", route: SubCategoryRoutes },
   { path: "/contactMessage", route: ContactMessageRoutes },
   { path: "/contactReply", route: ContactReplyRoutes },
];

moduleRoutes.forEach(r => router.use(r.path, r.route));
