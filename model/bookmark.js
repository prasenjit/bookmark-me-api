import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import 'mongoose-type-url';

import TagModel from './tag.js';

const bookmarkSchema = new mongoose.Schema(
  /*
    Id: Unique id of the bookmark (something like UUID)
    Link: Link of the bookmark (Should be unique)
    Title: Title of the bookmark
    Time Created: Time when bookmark was created (in epoch time)
    Time updated: Time when bookmark was updated (in epoch time)
    Publisher: Publisher of the bookmark
    Tags: User created tags associated with the given bookmark
  */
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ''),
    },
    link: {
      type: mongoose.SchemaTypes.Url,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
    },
    tags: {
      type: String,
    },
    createdAt: Number,
    updatedAt: Number,
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

bookmarkSchema.statics.getBookmarks = async function () {
  try {
    const bookmarks = await this.find();
    return bookmarks;
  } catch (error) {
    throw error;
  }
}

bookmarkSchema.statics.addBookmarks = async function (link, title, publisher, tags) {
  try {
    const bookmarks = await this.create({ link, title, publisher, tags });
  } catch (error) {
    throw error;
  }
}

bookmarkSchema.statics.updateTags = async function (id, tags) {
  try {
    const bookmark = this.updateOne({ id: id }, { tags: tags });
    return bookmark;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model('Bookmark', bookmarkSchema);