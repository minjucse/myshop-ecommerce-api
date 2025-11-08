import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import { uploadFile } from "../../../config/multer.config";
import { validateRequest } from '../../../middlewares/validateRequest';
import { Role } from "../../user/user.interface";
import { ShopControllers } from './shop.controller';
import { ShopValidation } from './shop.validation';

const router = express.Router();

router.post(
  '/create',
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  (req, res, next) => {
    req.body.folder = 'shops'; 
    next();
  },
  uploadFile.single("logo"),
  validateRequest(ShopValidation.createShopValidationSchema),

  ShopControllers.createShop,
);

router.get(
  '/:id',
  ShopControllers.getSingleShop,
);

router.patch(
  '/:id',
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  (req, res, next) => {
    req.body.folder = 'shops'; 
    next();
  },
  uploadFile.single("logo"),
  validateRequest(ShopValidation.updateShopValidationSchema),
  ShopControllers.updateShop,
);

router.post(
  '/',
  ShopControllers.getAllShops,
);

router.delete(
  '/:id',
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  ShopControllers.deleteShop,
);

export const ShopRoutes = router;
