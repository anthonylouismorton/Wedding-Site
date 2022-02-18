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
import { useState } from 'react';
import '../styling/index.css'

function AddGuest(props){ 
  const [coupleChecked, setCoupleChecked] = useState(false);
  const [pluseOneChecked, setplusOneCheck] = useState(false);

  const handleAddGuest = () => {
    props.setShowAddGuest(!props.showAddGuest);
  }

  const getRSVP = (e) => {
    rsvpCodeGenerator();
  };

  const coupleCheck = (e) => {
    setCoupleChecked(e.target.checked);
    props.newGuest.couple = !coupleChecked;
  };

  const plusOneCheck = (e) => {
    setplusOneCheck(e.target.checked);
    props.newGuest.plusOne = !pluseOneChecked;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${process.env.REACT_APP_DATABASE}/invitee`,
      props.newGuest
    )

		props.setNewGuest({
			...props.defaultGuest,
		});
    document.getElementById('create-invitee-form').reset();
    props.getGuests();
    
	};
  
  async function rsvpCodeGenerator() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = 10;
    let existingRSVPcodes = await axios.get(`${process.env.REACT_APP_DATABASE}/invitee`)
    for ( var i = 0; i < charactersLength; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      characters.length));
    }
    if(!existingRSVPcodes.data.some(x => x.rsvpCode === result)){
      props.setNewGuest({
        ...props.newGuest,
        rsvpCode: result
      })
    }
    else{
      rsvpCodeGenerator();
    }
    return result;
  }
 
  return(
    <Box className={props.classes.addGuestContainer}>
      <Paper className={props.classes.paperContainer}>
        <Typography className={props.classes.headerTypo}>Add Guest</Typography>
        <Grid className={props.classes.form}>
          <form id="create-invitee-form" onSubmit={handleSubmit}>
            <Grid className={props.classes.grid}>
              <Grid item>
                <TextField
                  name='name'
                  id='outlined-multiline-static'
                  label='Guest Name'
                  onChange={props.setName}
                />
              </Grid>
              <Grid item>
              <FormGroup className={props.classes.formGroup}>
                <FormControlLabel control={<Checkbox/>} label="Couple" checked={coupleChecked} onChange={coupleCheck}/>

                <FormControlLabel control={<Checkbox/>} label="+1" checked={pluseOneChecked} onChange={plusOneCheck} />
              </FormGroup>
              </Grid>
            </Grid>
            {coupleChecked && (
            <Grid className={props.classes.grid}>
              <Grid item>
                <TextField
                  name='significantOther'
                  id='outlined-multiline-static'
                  label='SO name'
                  onChange={props.setSoName}
                />
              </Grid>
            </Grid>
            )}
            {pluseOneChecked &&(
            <Grid className={props.classes.grid}>
              <Grid item>
                <TextField
                  name='plusOneName'
                //  value=''
                  id='outlined-multiline-static'
                  label='+1 Name'
                  onChange={props.setPlusOne}
                />
              </Grid>
            </Grid>
            )}
            <Grid className={props.classes.grid}>
              <Grid item>
                <TextField
                  name='email'
                  id='outlined-multiline-static'
                  label='Email'
                  onChange={props.setEmail}
                />
              </Grid>
            </Grid>
            <Grid item className={props.classes.button}>
              {!props.newGuest.rsvpCode ?
              <Button onClick={getRSVP} color='primary' variant='contained'>
                RSVP Code
              </Button>
              :
              <Button type='submit' color='primary' variant='contained'>
                Submit
              </Button>
              }
              <Button type='button' color='primary' variant='contained' onClick={handleAddGuest}>
                Hide
              </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Box>
  )
}

export default AddGuest