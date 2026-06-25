import { type } from 'arktype'; 

//!TODO: SignupFormModel
//!TODO: SignupData

export const User = type({
    id: 'string.uuid.v7',
    email: 'string.email',
    name: 'string',
    rol: "'Usuario'|'Administrador'",
})

export const UserAuthenticated = type({
  token: 'string',
  user: User,
});

export type User = typeof User.infer;
export type UserAuthenticated = typeof UserAuthenticated.infer;