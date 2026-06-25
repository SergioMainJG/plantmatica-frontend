import { type } from 'arktype';
import { errorFactory } from "./error-factory";


export const BadRequestError = errorFactory(400);

export const BadRequestErrorInstance = type.instanceOf(BadRequestError);

export type BadRequestErrorInstance = typeof BadRequestErrorInstance.infer;