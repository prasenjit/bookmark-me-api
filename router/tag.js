import Router from 'express';
import TagController from '../controller/tag.js' ;

const router = Router();

router
  .get('/', TagController.getTags)
  .post('/', TagController.createTag);

export default router;