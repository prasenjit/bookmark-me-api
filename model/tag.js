import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const tagSchema = new mongoose.Schema(
  /*
    Id: Unique id of the tag (something like UUID)
    Title: Title of the tag (Should be unique)
    Time Created: Time when tag was created (in epoch time)
    Time Updated: Time when tag was created (in epoch time)
  */
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ''),
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    collection: 'tags',
  }
);

tagSchema.statics.getTags = async function () {
  try {
    const tags = await this.find();
    return tags;
  } catch (error) {
    throw error;
  }
}

tagSchema.statics.createTag = async function (title) {
  try {
    const tag = await this.create({ title });
  } catch (error) {
    throw error;
  }
}

export default mongoose.model('Tag', tagSchema);