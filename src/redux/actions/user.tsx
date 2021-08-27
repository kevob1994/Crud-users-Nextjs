import * as types from "../types";
import axios from "axios";
import { IUser } from "../../interfaces/user";

const getUsers = (users: IUser[]) => ({
    type: types.GET_USERS,
    payload: users,
});

const deletedUser = () => ({
    type: types.DELETE_USER,
});

const newUsers = () => ({
    type: types.CREATE_USER,
});

const selectedUser = (user: IUser) => ({
    type: types.GET_ONE_USER,
    payload: user,
});

const editedUser = () => ({
    type: types.EDIT_USER,
});
export const loadUsers = () => {
    return (dispatch: any) => {
        axios
            .get(`${process.env.URL_API}/users`)
            .then((resp) => {
                dispatch(getUsers(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

export const deleteUser = (id: string) => {
    return (dispatch: any) => {
        axios
            .delete(`${process.env.URL_API}/users/${id}`)
            .then((resp) => {
                dispatch(deletedUser());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

export const createUser = (user: IUser) => {
    return (dispatch: any) => {
        axios
            .post(`${process.env.URL_API}/users`, user)
            .then((resp) => {
                dispatch(newUsers());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

export const selectUser = (id: string) => {
    return (dispatch: any) => {
        axios
            .get(`${process.env.URL_API}/users/${id}`)
            .then((resp: any) => {
                dispatch(selectedUser(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

export const editUser = (user: IUser) => {
    return (dispatch: any) => {
        axios
            .put(`${process.env.URL_API}/users/${user.id}`, user)
            .then((resp) => {
                dispatch(editedUser());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};
