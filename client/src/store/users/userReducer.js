import * as ACTIONS from "./actions";

const initialState = {
	users: [],
	isLoading: false,
	error: null
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.GET_USERS_START:
			return {
				...state,
				isLoading: true
			};
		case ACTIONS.GET_USERS_SUCCESS:
			return {
				...state,
				users: action.payload,
				isLoading: false
			};
		case ACTIONS.GET_USERS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export default userReducer;
