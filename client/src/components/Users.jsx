import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/users/actions";

const Users = () => {
	const dispatch = useDispatch();
	const users = useSelector(state => state.users.users);

	return (
		<>
			<button onClick={() => dispatch(getUsers())}>Fetch Users</button>
			{users.map(user => (
				<p>{user.name}</p>
			))}
		</>
	);
};

export default Users;
