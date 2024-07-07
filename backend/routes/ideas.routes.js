import{
    createIdea,
    getIdea,
    getAllIdeas,
    updateIdea,
    deleteIdea,
} from '../controllers/ideas.controller.js';

import {Router} from 'express';

const router = Router()

router.route('/ideas')
    .get(getAllIdeas)
    .post(createIdea);

router.route('/ideas/:id')
    .get(getIdea)
    .put(updateIdea)
    .delete(deleteIdea);

export default router;