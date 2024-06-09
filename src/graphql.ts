
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Error {
    message?: Nullable<string>;
}

export interface User {
    id: number;
    mobile_number: string;
    tag_name?: Nullable<string>;
    avatar_url?: Nullable<string>;
    name?: Nullable<string>;
    info?: Nullable<string>;
}

export interface IQuery {
    getUserById(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    authenticate(mobile_number?: Nullable<string>, password?: Nullable<string>): Nullable<UserResult> | Promise<Nullable<UserResult>>;
    registration(mobile_number?: Nullable<string>, password?: Nullable<string>): Nullable<UserResult> | Promise<Nullable<UserResult>>;
    refreshAccessToken(): Nullable<string> | Promise<Nullable<string>>;
}

export type UserResult = User | Error;
type Nullable<T> = T | null;
