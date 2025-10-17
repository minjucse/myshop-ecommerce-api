
import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import {validateRequest} from '../../../middlewares/validateRequest';
import { CategoryControllers } from './category.controller';
import { CategoryValidation } from './category.validation';
import { Role } from "../../user/user.interface";

const router = express.Router();

router.post('/', CategoryControllers.getAllCategories,);

router.get('/dropdown', CategoryControllers.getDropdownCategories);

router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(
        CategoryValidation.createCategoryValidationSchema,
    ),
    CategoryControllers.createCategory,
);

router
  .route('/:id')
  .get(
    CategoryControllers.getSingleCategory
  )
  .patch(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(CategoryValidation.updateCategoryValidationSchema),
    CategoryControllers.updateCategory
  )
  .delete(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    CategoryControllers.deleteCategory
  );

export const CategoryRoutes = router;
