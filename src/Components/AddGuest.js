import React, { useState } from 'react';
import {
	TextField,
	Button,
	Paper,
	Grid,
	Box,
	Typography,
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@mui/material';

function AddGuest(props){

  const handleClick = () => {
    setRsvp(rsvpCodeGenterator())
  }

  const handleSubmit = (e) => {
		props.setNewGuest({
			...props.newGuest,
		});
    console.log(props.newGuest)
	};
  
  function rsvpCodeGenterator() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = 10;
    for ( var i = 0; i < charactersLength; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      characters.length));
    }
    return result;
  }
  let [rsvp, setRsvp] = useState('');

  return(
 
        <Box className={props.classes.boxContainer}>
         <Paper className={props.classes.paperContainer}>
           <Typography>Add Guest</Typography>
           <Grid className={props.classes.form}>
             <form onSubmit={handleSubmit}>
               <Grid className={props.classes.description}>
                 <Grid item>
                   <TextField
                     name='name'
                     //value={props.newGuest.firstName}
                     id='outlined-multiline-static'
                     label='Name'
                     // onChange={handleChange}
                   />
                 </Grid>
                 <Grid item>
                 <FormGroup>
                  <FormControlLabel control={<Checkbox/>} label="Couple" />
                  <FormControlLabel control={<Checkbox/>} label="+1" />
                </FormGroup>
                 </Grid>
               </Grid>
               <Grid className={props.classes.description}>
                 <Grid item>
                   <TextField
                     name='significantOther'
                     // value={formValues.incidentOffenseDescription}
                     id='outlined-multiline-static'
                     label='SO name'
                     // onChange={handleChange}
                   />
                 </Grid>
               </Grid>
               <Grid className={props.classes.incident}>
               </Grid>
               <Grid className={props.classes.description}>
                 <Grid item>
                   <TextField
                     name='plusOneName'
                     // value={formValues.incidentOffenseDescription}
                     id='outlined-multiline-static'
                     label='+1 Name'
                     // onChange={handleChange}
                   />
                 </Grid>
               </Grid>
               <Grid className={props.classes.description}>
                 <Grid item>
                   <TextField
                     name='rsvpCode'
                     value={rsvp}
                     id='outlined-multiline-static'
                     label='RSVP Code'
                     // onChange={handleChange}
                   />
                  <Button onClick={handleClick} color='success' variant='contained'>
                   Generate
                  </Button>
                 </Grid>
               </Grid>
               <Grid item className={props.classes.button}>
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

export default AddGuest