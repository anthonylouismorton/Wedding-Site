import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

function AddGuest(props){ 
  const [coupleChecked, setCoupleChecked] = useState(false)
  const [pluseOneChecked, setplusOneCheck] = useState(false)
  
  const getRSVP = (e) => {
    rsvpCodeGenerator()
  }

  const setName = (e) => {
    let name = e.target.value.split(' ');
    props.setNewGuest({
      ...props.newGuest,
      firstName: name[0],
      lastName: name[1]
    })
  }

  const setSoName = (e) => {
    let name = e.target.value.split(' ');
    props.setNewGuest({
      ...props.newGuest,
      sOfirstName: name[0],
      sOlastName: name[1]
    })
  }

  const setPlusOne = (e) => {
    let name = e.target.value.split(' ');
    props.setNewGuest({
      ...props.newGuest,
      plusOneFirstName: name[0],
      plusOneLastName: name[1]
    })
  }

  const coupleCheck = (e) => {
    setCoupleChecked(e.target.checked)
    props.newGuest.couple = !coupleChecked
  }

  const plusOneCheck = (e) => {
    setplusOneCheck(e.target.checked)
    props.newGuest.plusOne = !pluseOneChecked
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${process.env.REACT_APP_DATABASE}/invitee`,
      props.newGuest
    )

		props.setNewGuest({
			...props.defaultGuest,
		})
    document.getElementById('create-invitee-form').reset();
	};
  
  function rsvpCodeGenerator() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = 10;
    for ( var i = 0; i < charactersLength; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      characters.length));
    }
    props.setNewGuest({
      ...props.newGuest,
      rsvpCode: result
    })
    return result;
  }
  console.log(props.newGuest)
  return(
    
        <Box className={props.classes.boxContainer}>
         <Paper className={props.classes.paperContainer}>
           <Typography>Add Guest</Typography>
           <Grid className={props.classes.form}>
             <form id="create-invitee-form" onSubmit={handleSubmit}>
               <Grid className={props.classes.description}>
                 <Grid item>
                   <TextField
                     name='name'
                     //value={`${props.newGuest.firstName} ${props.newGuest.lastName}`}
                     id='outlined-multiline-static'
                     label='Name'
                     onChange={setName}
                   />
                 </Grid>
                 <Grid item>
                 <FormGroup>
                  <FormControlLabel control={<Checkbox/>} label="Couple" checked={coupleChecked} onChange={coupleCheck}/>
                  <FormControlLabel control={<Checkbox/>} label="+1" checked={pluseOneChecked} onChange={plusOneCheck} />
                </FormGroup>
                 </Grid>
               </Grid>
               {coupleChecked && (
               <Grid className={props.classes.description}>
                 <Grid item>
                   <TextField
                     name='significantOther'
                     // value={formValues.incidentOffenseDescription}
                     id='outlined-multiline-static'
                     label='SO name'
                     onChange={setSoName}
                   />
                 </Grid>
               </Grid>
               )}
               {pluseOneChecked &&(
               <Grid className={props.classes.description}>
                 <Grid item>
                   <TextField
                     name='plusOneName'
                    //  value=''
                     id='outlined-multiline-static'
                     label='+1 Name'
                     onChange={setPlusOne}
                   />
                 </Grid>
               </Grid>
               )}
               <Grid className={props.classes.description}>
                 <Grid item>
                   <TextField
                     name='rsvpCode'
                     value={props.newGuest.rsvpCode}
                     id='outlined-multiline-static'
                     label='RSVP Code'
                     // onChange={handleChange}
                   />
                  <Button onClick={getRSVP} color='success' variant='contained'>
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