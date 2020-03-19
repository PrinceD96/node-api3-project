import axios from "axios";

export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export const getUsers = () => dispatch => {
	dispatch({ type: GET_USERS_START });
	axios
		.get("http://localhost:4000/users")
		.then(res => {
			dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
		})
		.catch(error => {
			dispatch({ type: GET_USERS_FAILURE, payload: error });
		});
};
