import { createRouter } from 'next-connect';
import { whatsapp } from '../../../controllers/authController'
import onError from '../../../middlewares/error'

const router = createRouter({ onError });

router
    .get(whatsapp);


export default router.handler();



