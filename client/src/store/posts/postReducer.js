import * as ACTIONS from "./actions";

const initialState = {
	posts: [],
	isLoading: false,
	error: null
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.GET_POSTS_START:
			return {
				...state,
				isLoading: true
			};
		case ACTIONS.GET_POSTS_SUCCESS:
			return {
				...state,
				posts: action.payload,
				isLoading: false
			};
		case ACTIONS.GET_POSTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default postReducer;
