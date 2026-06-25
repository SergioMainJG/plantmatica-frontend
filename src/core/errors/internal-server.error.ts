import {type} from 'arktype';
import { errorFactory } from "./error-factory";


export const InternalServerError = errorFactory(500);

export const InternalServerErrorInstance = type.instanceOf(InternalServerError);
export type InternalServerErrorInstance = typeof InternalServerErrorInstance.infer;