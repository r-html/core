import { HydratedDocument, SchemaOptions, ToObjectOptions } from 'mongoose';

export const MongooseIdTransformer: ToObjectOptions<HydratedDocument<unknown>> =
  {
    transform: (_doc, ret) => {
      const model = {
        id: ret._id,
        ...ret,
      };
      delete model['_id'];
      delete model['__v'];
      return model;
    },
  };

export const GlobalModelOptions: SchemaOptions = {
  toObject: MongooseIdTransformer,
  toJSON: MongooseIdTransformer,
  versionKey: false,
  timestamps: true,
};
