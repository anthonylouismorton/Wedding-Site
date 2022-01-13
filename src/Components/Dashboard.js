// import React, { useState, useContext } from 'react';
// import axios from 'axios';
import {
	TextField,
	Button,
	Paper,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	Typography,
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	boxContainer: {
		// backgroundImage: 'url(https://source.unsplash.com/random/?neighborhood)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '110%',
		height: '99%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	paperContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightgray',
		width: '50%',
		height: '75%',
		borderRadius: 10,
		flexDirection: 'column',
	},
	form: {
		marginTop: '10px',
		marginBottom: '10px',
		width: '80%',
		height: '60%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	incident: {
		width: '100%',
		marginBottom: '10px',
	},
	description: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '10px',
		width: '100%',
	},
	button: {
		display: 'flex',
		justifyContent: 'center',
	},
});

function Dashboard(){
  const classes = useStyles();
    return (
<Box className={classes.boxContainer}>
			<Paper className={classes.paperContainer}>
				<Typography>Add Photos</Typography>
				<Grid className={classes.form}>
					<form>
						<Grid className={classes.incident}>
							<Grid item>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>
										Category
									</InputLabel>
									<Select
										name='incidentOffense'
										// value={}
										label='Incident Type'
										// onChange={handleChange}
									>
										<MenuItem value={'Wedding'}>Wedding</MenuItem>
										<MenuItem value={'Engagement'}>Engagement</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid className={classes.description}>
							<Grid item>
								<TextField
									name='incidentOffenseDescription'
									// value={formValues.incidentOffenseDescription}
									id='outlined-multiline-static'
									label='Url'
									multiline
									rows={4}
									// onChange={handleChange}
								/>
							</Grid>
						</Grid>
						<Grid item className={classes.button}>
							<Button type='submit' color='success' variant='contained'>
								Submit
							</Button>
						</Grid>
					</form>
				</Grid>
			</Paper>
		</Box>
    )
  }

  export default Dashboard;