import { GraphQLNonNull } from 'graphql';

import PostModel from '../../../models/post';
import { postInputType, postType } from '../../types/post';

export default {
  type: postType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(postInputType)
    }
  },
  resolve(root, params) {
    const pModel = new PostModel(params.data);
    const newPost = pModel.save();
    if (!newPost) {
      throw new Error('Error adding new posts');
    }
    return newPost;
  }
};
