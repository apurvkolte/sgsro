import { createRouter } from 'next-connect';
import { registerUser } from '../../../../controllers/authController'
import onError from '../../../../middlewares/error'
import { upload } from '../../../../utils/image-upload';

const router = createRouter({ onError });


router.use(upload.array('file'));

router
    .post(registerUser);

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
}

export default router.handler();



