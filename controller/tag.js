import TagModel from '../model/tag.js';

export default {
  getTags: async function (req, res) {
    try {
      const tags = await TagModel.getTags();
      return res.status(200).json({ success: true, tags: tags });
    } catch(error) {
      return res.status(500).json({success: false, error: error});
    }
  },
  createTag: async function (req, res) {
    try {
      let { title } = req.body;
      title = title.toLowerCase();
      const tag = await TagModel.createTag(title);
      return res.status(200).json({ success: true, tag: tag });
    } catch(error) {
      return res.status(500).json({success: false, error: error});
    }
  },
  getTag: async function(req, res) {
    try {
      const id = req.params.id;
      const tag = await TagModel.getTag(id);
      return res.status(200).json({success: true, tag: tag});
    } catch(error) {
      return res.status(500).json({success: false, error: error});
    }
  }
}