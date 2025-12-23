
import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import {validateRequest} from '../../../middlewares/validateRequest';
import { MeasurementUnitControllers } from './measurementUnit.controller';
import { MeasurementUnitValidation } from './measurementUnit.validation';
import { Role } from "../../user/user.interface";

const router = express.Router();

router.post('/', MeasurementUnitControllers.getAllMeasurementUnits,);

router.get('/dropdown', MeasurementUnitControllers.getDropdownMeasurementUnits);

router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(
        MeasurementUnitValidation.createMeasurementUnitValidationSchema,
    ),
    MeasurementUnitControllers.createMeasurementUnit,
);

router
  .route('/:id')
  .get(
    MeasurementUnitControllers.getSingleMeasurementUnit
  )
  .patch(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(MeasurementUnitValidation.updateMeasurementUnitValidationSchema),
    MeasurementUnitControllers.updateMeasurementUnit
  )
  .delete(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    MeasurementUnitControllers.deleteMeasurementUnit
  );

export const MeasurementUnitRoutes = router;
