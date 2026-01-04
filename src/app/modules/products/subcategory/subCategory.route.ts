
import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import {validateRequest} from '../../../middlewares/validateRequest';
import { SubCategoryControllers } from './subCategory.controller';
import { SubCategoryValidation } from './subCategory.validation';
import { Role } from "../../user/user.interface";

const router = express.Router();

router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(
        SubCategoryValidation.createSubCategoryValidationSchema,
    ),
    SubCategoryControllers.createSubCategory,
);

router.post(
    '/',
    SubCategoryControllers.getAllSubCategorys,
);
router.get('/dropdown', SubCategoryControllers.getSubCategoryDropdown);
router
  .route('/:id')
  .get(
    SubCategoryControllers.getSingleSubCategory
  )
  .patch(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(SubCategoryValidation.updateSubCategoryValidationSchema),
    SubCategoryControllers.updateSubCategory
  )
  .delete(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    SubCategoryControllers.deleteSubCategory
  );
  
export const SubCategoryRoutes = router;
