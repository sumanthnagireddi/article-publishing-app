import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./userData.actions";

export const user = {};
export const userReducer = createReducer(
    user,
    on(login, (state, user) => user),
    on(logout, (state, user) => user)
)