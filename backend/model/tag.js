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
    createdAt: Number,
    updatedAt: Number,
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
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

tagSchema.statics.getTag = async function (id) {
  try {
    const tags = await this.findById(id);
    return tags;
  } catch (error) {
    throw error;
  }
}

tagSchema.statics.createTag = async function (title) {
  try {
    const tag = await this.create({ title });
    return tag;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model('Tag', tagSchema);