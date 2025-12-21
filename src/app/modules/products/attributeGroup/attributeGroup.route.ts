
import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import {validateRequest} from '../../../middlewares/validateRequest';
import { AttributeGroupControllers } from './attributeGroup.controller';
import { AttributeGroupValidation } from './attributeGroup.validation';
import { Role } from "../../user/user.interface";

const router = express.Router();

router.post('/', AttributeGroupControllers.getAllAttributeGroups,);

router.get('/dropdown', AttributeGroupControllers.getDropdownAttributeGroups);

router.post(
    '/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(
        AttributeGroupValidation.createAttributeGroupValidationSchema,
    ),
    AttributeGroupControllers.createAttributeGroup,
);

router
  .route('/:id')
  .get(
    AttributeGroupControllers.getSingleAttributeGroup
  )
  .patch(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(AttributeGroupValidation.updateAttributeGroupValidationSchema),
    AttributeGroupControllers.updateAttributeGroup
  )
  .delete(
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    AttributeGroupControllers.deleteAttributeGroup
  );

export const AttributeGroupRoutes = router;
