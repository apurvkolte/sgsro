import { createRouter } from 'next-connect';
// import connection from '../../../../config/connection'
import { updateUser, deleteUser, getUserProfile } from '../../../../controllers/authController'
import onError from '../../../../middlewares/error'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middlewares/auth'

const router = createRouter({ onError });


router
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(getUserProfile);

router
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .put(updateUser);


router
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deleteUser)



export default router.handler();



