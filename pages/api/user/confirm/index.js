import { createRouter } from 'next-connect';
import { emailVerification } from '../../../../controllers/authController'
import onError from '../../../../middlewares/error'


const router = createRouter({ onError });
router
    .post(emailVerification);


export default router.handler();



