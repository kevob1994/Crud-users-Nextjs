export interface IUser {
    id: string | null;
    first_name: string | null;
    second_name: string | null;
    email: string | null;
    age: number | null | string;
    birthdate: Date | null | string;
}

export interface IReducerUser {
    users: IUser[];
    user: IUser | null;
    loading: boolean;
    error: boolean | null;
}
