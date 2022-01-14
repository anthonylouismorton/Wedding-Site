import React, { useState } from 'react';
import AddGuest from './AddGuest'
import AddPhoto from './AddPhoto'
// import axios from 'axios';

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
  
  const defaultGuest = {
    firstName: '',
    lastName: '',
    sOfirstName: '',
    sOlastName: '',
    couple: false,
    plusOne: false,
    plusOneFirstName: '',
    plusOneLastName: '',
    rsvpCode: '',
    rsvp: false
  }

  const [newGuest, setNewGuest] = useState(defaultGuest)

    return (
      <>
        <AddPhoto classes={classes}/>
        <AddGuest classes={classes} newGuest={newGuest}/>
      </>
    )
  }

  export default Dashboard;