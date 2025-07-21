import { createRouter } from 'next-connect';
import { getUserDetails, registerUser, updateProfile } from '../../../controllers/authController'
import onError from '../../../middlewares/error'
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'

const router = createRouter({ onError });

router
    .use(isAuthenticatedUser)
    .get(getUserDetails);




export default router.handler();



