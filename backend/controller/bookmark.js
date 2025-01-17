import BookmarkModel from '../model/bookmark.js';
import TagModel from '../model/tag.js';

export default {
  getBookmarks: async function (req, res) {
    try {
      const bookmarks = await BookmarkModel.getBookmarks();
      return res.status(200).json({ success: true, bookmarks: bookmarks });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  addBookmark: async function (req, res) {
    try {
      const { link, title, publisher, tags } = req.body;
      let validTag = true;
      if (Array.isArray(tags)) {
        for (const tag of tags) {
          const tagFound = await TagModel.getTag(tag);
          if (tagFound) {
            validTag &= true;
          } else {
            validTag &= false;
          }
        };
      } else {
        const tagFound = await TagModel.getTag(tags);
        if (tagFound) {
          validTag &= true;
        } else {
          validTag &= false;
        }
      }
      if (!validTag) {
        return res.status(500).json({ success: false, error: 'Invalid tags' });
      }
      const bookmark = await BookmarkModel.addBookmarks(link, title, publisher, tags);
      return res.status(200).json({ success: true, bookmark: bookmark });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  updateTags: async function (req, res) {
    try {
      const { id, tags } = req.body;
      const bookmark = await BookmarkModel.updateTags(id, tags);
      return res.status(200).json({ success: true, bookmark: bookmark });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
}