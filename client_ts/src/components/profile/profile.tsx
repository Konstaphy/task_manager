import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/hooks";
import axiosInstance from "../../server";
import { useDispatch } from "react-redux";
import { authActionTypes } from "../../redux/reducers/authTypes";
import { useHistory } from "react-router-dom";
import "./profile.scss";

const Profile: FC = () => {
    const history = useHistory();
    const state = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    const signOut = () => {
        axiosInstance
            .post("/api/logout")
            .then(() => {
                dispatch({ type: authActionTypes.setLoggedOut });
            })
            .then(() => {
                if (!state.logged) history.push("/profile");
            });
    };

    return (
        <div className={"profile"}>
            <h1 className={"profile__username"}>{state.username}</h1>
            <h3 className={"profile__credentials"}>
                <p className={"profile__credentials__email"}>{state.email}</p>
                <hr className={"profile__credentials__hr"} />
                <p className={"profile__credentials__id"}>{state.user_id}</p>
            </h3>
            <button type="button" onClick={() => signOut()} className={"profile__sign-out-button"}>
                Sign out
            </button>
        </div>
    );
};

export default Profile;
