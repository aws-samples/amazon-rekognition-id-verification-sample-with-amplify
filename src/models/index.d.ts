import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type IngestedImageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ImageTagMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class IngestedImage {
  readonly id: string;
  readonly image: string;
  readonly description?: string;
  readonly tags?: (ImageTag | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<IngestedImage, IngestedImageMetaData>);
  static copyOf(source: IngestedImage, mutator: (draft: MutableModel<IngestedImage, IngestedImageMetaData>) => MutableModel<IngestedImage, IngestedImageMetaData> | void): IngestedImage;
}

export declare class ImageTag {
  readonly id: string;
  readonly image: string;
  readonly tag: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ImageTag, ImageTagMetaData>);
  static copyOf(source: ImageTag, mutator: (draft: MutableModel<ImageTag, ImageTagMetaData>) => MutableModel<ImageTag, ImageTagMetaData> | void): ImageTag;
}