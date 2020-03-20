import axios from "axios";

export const GET_POSTS_START = "GET_POSTS_START";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

export const getPosts = userId => dispatch => {
	dispatch({ type: GET_POSTS_START });
	axios
		.get(`http://localhost:4000/users/${userId}/posts`)
		.then(res => {
			console.log(res);
			setTimeout(() => {
				dispatch({ type: GET_POSTS_SUCCESS, payload: res.data });
			}, 1000);
		})
		.catch(error => {
			dispatch({ type: GET_POSTS_FAILURE, payload: error });
		});
};
