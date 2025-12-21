
import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import {validateRequest} from '../../../middlewares/validateRequest';
import { AttributeValueControllers } from './attributeValue.controller';
import { AttributeValueValidation } from './attributeValue.validation';
import { Role } from "../../user/user.interface";

const router = express.Router();

router.post('/', AttributeValueControllers.getAllAttributeValues,);

router.get('/dropdown', AttributeValueControllers.getDropdownAttributeValues);

router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(
        AttributeValueValidation.createAttributeValueValidationSchema,
    ),
    AttributeValueControllers.createAttributeValue,
);

router
  .route('/:id')
  .get(
    AttributeValueControllers.getSingleAttributeValue
  )
  .patch(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(AttributeValueValidation.updateAttributeValueValidationSchema),
    AttributeValueControllers.updateAttributeValue
  )
  .delete(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    AttributeValueControllers.deleteAttributeValue
  );

export const AttributeValueRoutes = router;
