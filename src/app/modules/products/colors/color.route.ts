
import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import {validateRequest} from '../../../middlewares/validateRequest';
import { colorControllers } from './color.controller';
import { colorValidation } from './color.validation';
import { Role } from "../../user/user.interface";

const router = express.Router();

router.post('/', colorControllers.getAllColors,);

router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(
        colorValidation.createColorValidationSchema,
    ),
    colorControllers.createColor,
);

router
  .route('/:id')
  .get(
    colorControllers.getSingleColor
  )
  .patch(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(colorValidation.updateColorValidationSchema),
    colorControllers.updateColor
  )
  .delete(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    colorControllers.deleteColor
  );

export const ColorRoutes = router;
