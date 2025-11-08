import express from 'express';
import { checkAuth } from '../../../middlewares/checkAuth';
import { uploadFile } from '../../../config/multer.config';
import { validateRequest } from '../../../middlewares/validateRequest';
import { BannerControllers } from './banner.controller';
import { BannerValidation } from './banner.validation';
import { Role } from '../../user/user.interface';

const router = express.Router();

router.post(
    '/create-banner',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    (req, res, next) => {
        req.body.folder = 'banners'; 
        next();
    },
    uploadFile.single('banner'),
    validateRequest(BannerValidation.createBannerValidationSchema),
    BannerControllers.createBanner
);


router.get('/:id', BannerControllers.getSingleBanner);

router.patch(
    '/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    (req, res, next) => {
        req.body.folder = 'banners'; 
        next();
    },
    uploadFile.single('banner'),
    validateRequest(BannerValidation.updateBannerValidationSchema),
    BannerControllers.updateBanner
);


router.post('/', BannerControllers.getAllBanners);

router.delete(
    '/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    BannerControllers.deleteBanner
);

export const BannerRoutes = router;
