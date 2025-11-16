
import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import {validateRequest} from '../../../middlewares/validateRequest';
import { sizeControllers } from './size.controller';
import { sizeValidation } from './size.validation';
import { Role } from "../../user/user.interface";

const router = express.Router();
router.post(
    '/',
    sizeControllers.getAllSizes,
);
router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(
        sizeValidation.createSizeValidationSchema,
    ),
    sizeControllers.createSize,
);

router
  .route('/:id')
  .get(
    sizeControllers.getSingleSize
  )
  .patch(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(sizeValidation.updateSizeValidationSchema),
    sizeControllers.updateSize
  )
  .delete(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    sizeControllers.deleteSize
  );

export const SizeRoutes = router;
