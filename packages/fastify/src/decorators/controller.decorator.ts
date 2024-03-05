import { createDecorator } from '@rhtml/di';

export function Controller(metadata?: ControllerMetadata) {
  return createDecorator({
    meta(this) {
      if (metadata) {
        this._metadata = metadata;
      }
    },
  });
}

export interface ControllerMetadata {
  route: string;
}
