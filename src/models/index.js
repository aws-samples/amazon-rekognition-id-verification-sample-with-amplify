// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { IngestedImage, ImageTag } = initSchema(schema);

export {
  IngestedImage,
  ImageTag
};