import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/users/actions";
import Loader from "react-loader-spinner";
import Button from "@material-ui/core/Button";

const Users = () => {
	const dispatch = useDispatch();
	const users = useSelector(state => state.users.users);
	const isLoading = useSelector(state => state.users.isLoading);

	return (
		<>
			<Button
				onClick={() => dispatch(getUsers())}
				variant='contained'
				color='secondary'
			>
				Fetch Users
			</Button>
			{isLoading ? (
				<>
					<Loader
						type='MutatingDots'
						color='#F50057'
						height={100}
						width={100}
						timeout={3000}
					/>
				</>
			) : (
				<>
					{users.map(user => (
						<p>{user.name}</p>
					))}
				</>
			)}
		</>
	);
};

export default Users;
