import { type } from 'arktype';
import { errorFactory } from "./error-factory";


export const DuplicatedUserError = errorFactory(409);

export const DuplicatedUserErrorInstance = type.instanceOf(DuplicatedUserError);

export type DuplicatedUserErrorInstance = typeof DuplicatedUserErrorInstance.infer;