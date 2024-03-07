import { InjectionToken } from '@rhtml/di';
import { Mongoose } from 'mongoose';

export const MONGOOSE_CONNECTION_TOKEN = new InjectionToken<Mongoose>();
export type MONGOOSE_CONNECTION_TOKEN = Mongoose;
