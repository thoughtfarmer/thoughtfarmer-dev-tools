import  { AuthenticationStore } from '../AuthenticationStore';

export interface ICreateUserRequest {
    firstName: string;
    lastName: string;
    email?: string;
    username?: string;
    userServiceUniqueIdentifier?: string;
    authenticationStore: AuthenticationStore;
}
