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
				<div className='users__container'>
					{users.map(user => (
						<ExpansionPanel key={user.id}>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls='panel1a-content'
								id='panel1a-header'
								onClick={() => dispatch(getPosts(user.id))}
							>
								<Typography className={classes.heading}>{user.name}</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<div>
									<Typography color='error'>
										<>Posts:</>
									</Typography>
									<br />
									{posts.map(post => (
										<Typography key={post.id}>"{post.text}"</Typography>
									))}
								</div>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))}
				</div>
			)}
		</>
	);
};

export default Users;
