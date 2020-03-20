import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/users/actions";
import { getPosts } from "../store/posts/actions";
import Loader from "react-loader-spinner";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
}));

const Users = () => {
	const dispatch = useDispatch();

	// USERS
	const users = useSelector(state => state.users.users);
	const isLoading = useSelector(state => state.users.isLoading);

	// POSTS
	const posts = useSelector(state => state.posts.posts);
	console.log("POSTS", posts);

	const classes = useStyles();

	return (
		<>
			<button onClick={() => dispatch(getPosts(1))}>Posts</button>
			{posts.map(post => (
				<p>{post.text}</p>
			))}
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
					<div className='users__container'>
						{users.map(user => (
							<>
								{/* <p key={user.id}>{user.name}</p> */}

								<ExpansionPanel>
									<ExpansionPanelSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls='panel1a-content'
										id='panel1a-header'
									>
										<Typography className={classes.heading}>
											{user.name}
										</Typography>
									</ExpansionPanelSummary>
									<ExpansionPanelDetails>
										<Typography>Posts</Typography>
									</ExpansionPanelDetails>
								</ExpansionPanel>
							</>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default Users;
