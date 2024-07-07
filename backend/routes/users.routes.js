import{
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
} from '../controllers/users.controller.js';

import {Router} from 'express';

const router = Router()

router.route('/users')
    .get(getAllUsers)
    .post(createUser);

router.route('/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default router;