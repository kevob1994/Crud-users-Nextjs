import { IReducerUser } from "../../interfaces/user";
import * as types from "../types";

const initialState: IReducerUser = {
    users: [],
    user: null,
    loading: true,
    error: null,
};

const usersReducers = (state = initialState, action: any) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case types.CREATE_USER:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case types.DELETE_USER:
            return {
                ...state,
                loading: false,
            };
        case types.EDIT_USER:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case types.GET_ONE_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default usersReducers;
