import{
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser,
} from '../controllers/users.controller.js';

import{
    createIdea,
    getIdea,
    getAllIdeas,
    updateIdea,
    deleteIdea,
} from '../controllers/ideas.controller.js';

import {Router} from 'express';

const router = Router()

router.route('/users')
    .get(getAllUsers)
    .post(createUser);

router.route("/users/login")
    .post(loginUser);

router.route('/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/bright_ideas')
    .get(getAllIdeas)
    .post(createIdea);

router.route('/bright_ideas/:id')
    .get(getIdea)
    .put(updateIdea)
    .delete(deleteIdea);

export default router;