import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import { validateRequest } from '../../../middlewares/validateRequest';
import { Role } from '../../user/user.interface';
import { SupplierControllers } from './supplier.controller';
import { SupplierValidation } from './supplier.validation';

const router = express.Router();

router.post(
  '/create',
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(SupplierValidation.createSupplierValidationSchema),
  SupplierControllers.createSupplier,
);

router.get(
  '/:id',
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.SALESMAN, Role.SHOPADMIN),
  SupplierControllers.getSingleSupplier,
);

router.patch(
  '/:id',
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(SupplierValidation.updateSupplierValidationSchema),
  SupplierControllers.updateSupplier,
);

router.post(
  '/',
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.SALESMAN, Role.SHOPADMIN),
  SupplierControllers.getAllSuppliers,
);

router.delete(
  '/:id',
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  SupplierControllers.deleteSupplier,
);

export const SupplierRoutes = router;
