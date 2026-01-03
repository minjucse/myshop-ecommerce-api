
import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import {validateRequest} from '../../../middlewares/validateRequest';
import { BrandControllers } from './brand.controller';
import { BrandValidation } from './brand.validation';
import { Role } from "../../user/user.interface";

const router = express.Router();

router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(
        BrandValidation.createBrandValidationSchema,
    ),
    BrandControllers.createBrand,
);

router.get(
    '/:id',
    BrandControllers.getSingleBrand,
);
router.get('/dropdown', BrandControllers.getDropdownBrands);
router.patch(
    '/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(
        BrandValidation.updateBrandValidationSchema,
    ),
    BrandControllers.updateBrand,
);

router.post(
    '/',
    BrandControllers.getAllBrands,
);

router.delete(
    '/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    BrandControllers.deleteBrand,  // Call the deleteBrand controller
);

export const BrandRoutes = router;
