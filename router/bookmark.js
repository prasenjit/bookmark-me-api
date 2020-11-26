import Router from 'express';
import BookmarkController from '../controller/bookmark.js' ;

const router = Router();

router
  .get('/', BookmarkController.getBookmarks)
  .post('/', BookmarkController.addBookmark)
  .post('/:id', BookmarkController.updateTags);

export default router;