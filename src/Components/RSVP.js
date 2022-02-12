import {Button, Box, Typography, Paper, Grid, TextField, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  boxContainer: {
    height: '100%',
    width: '30%',
    textAlign: 'center',
    marginTop: '5%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paperContainer: {
    // margin: '5px !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flexDirection: 'column',
  },
  form: {
    marginTop: '20px',
    marginBottom: '20px',
    width: '90%',
    // height: '60%',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    marginTop: '20px !important',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'black !important'
  },
  textField: {
    marginTop: '10px !important'
  }
});
function RSVP(props){
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
    rsvp: false,
    rsvpSend: false,
    email: []
  }

  const [enteredRSVP, setEnteredRSVP] = useState('')
  let [inviteeRSVP, setInviteeRSVP] = useState(defaultGuest)
  const [attendingChecked, setAttendingChecked] = useState(false)
  const [notAttendingChecked, setNotAttendingChecked] = useState(false)
  const [rsvpSubmitted, setRSVPsubmitted] = useState(false)

  useEffect(() => {
    if(inviteeRSVP.rsvp){
      setAttendingChecked(true)
      setNotAttendingChecked(false)
    }
    else if(inviteeRSVP.rsvp === false){
      setAttendingChecked(false)
      setNotAttendingChecked(true)
    }
  },[inviteeRSVP]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.REACT_APP_DATABASE}/invitee`,
      inviteeRSVP
    )
    setRSVPsubmitted(true)
  };

  const setRSVP = (e) => {
    setEnteredRSVP(e.target.value)
  }

  const handleRSVP = async (e) => {
    e.preventDefault();
    let guest = await axios.get(
      `${process.env.REACT_APP_DATABASE}/invitee/${enteredRSVP}`
    )
    setInviteeRSVP(guest.data)
  }
  const handleAttending = (e) => {
    setInviteeRSVP({
      ...inviteeRSVP,
      rsvp: true
    })
    setAttendingChecked(true)
    setNotAttendingChecked(false)
  }

  const handleNotAttending = (e) => {
    setInviteeRSVP({
      ...inviteeRSVP,
      rsvp: false
    })
    setAttendingChecked(false)
    setNotAttendingChecked(true)
  }

  const setPlusOne = (e) => {
    let name = e.target.value.split(' ');
    setInviteeRSVP({
      ...inviteeRSVP,
      plusOneFirstName: name[0],
      plusOneLastName: name[1]
    })
  }
    return(
      <>
      {rsvpSubmitted && inviteeRSVP.rsvp ?
      <Box>
        <Paper>
          <Typography>Yay {inviteeRSVP.firstName}! We are glad you can make it!</Typography>
          <Typography>You can checkout the Venue page for directions or information on the wedding venue.</Typography>
          <Typography>If you need to change your RSVP you can contact Anthony or Kristin or resubmit your RSVP using the RSVP code you received in your email</Typography>
        </Paper>
      </Box>
      : rsvpSubmitted && !inviteeRSVP.rsvp ?
      <Box>
          <Typography>Awww, we are sorry to hear you can't make it, {inviteeRSVP.firstName}.</Typography>
          <Typography>If you change your mind you can always contact Kristin or Anthony or resubmit your RSVP using the RSVP code you received in your email</Typography>
          <Typography>Please contact Kristin or Anthony if your plans change and you cannot make it.</Typography>
      </Box>
      :
      <Box className={classes.boxContainer}>
        <Paper className={classes.paperContainer}>
          {!rsvpSubmitted && (

            <form className={classes.form} onSubmit={handleSubmit}>
              <Typography variant="h5">RSVP</Typography>
              {!inviteeRSVP.firstName && (
                <Grid>
                  <Typography>Please Enter your RSVP Code</Typography>
                <Grid item>
                  <TextField
                    className={classes.textField}
                    name='name'
                    id='outlined-multiline-static'
                    label="RSVP Code"
                    placeholder="Enter RSVP Code"
                    onChange={setRSVP}
                  />
                </Grid>
                <Button className={classes.button} type='button' onClick={handleRSVP} variant='contained'>
                  Submit
                </Button>
  
              </Grid>
              )}
              {inviteeRSVP.firstName &&(
                <Grid>
                <Grid item>
                {inviteeRSVP.sOfirstName && inviteeRSVP.sOlastName === inviteeRSVP.lastName ?
                  <Typography>Greetings {`${inviteeRSVP.firstName} & ${inviteeRSVP.sOfirstName} ${inviteeRSVP.lastName}`} !</Typography>
                  : inviteeRSVP.sOfirstName ?
                  <Typography>Greetings {`${inviteeRSVP.firstName} & ${inviteeRSVP.sOfirstName}`} !</Typography>
                  :
                  <Typography>Greetings {`${inviteeRSVP.firstName} ${inviteeRSVP.lastName}`} !</Typography>
                }
                </Grid>
                {inviteeRSVP.plusOne ?
                <Typography>You are invited to bring a guest.</Typography>
                :
                <Typography></Typography>
                }
              </Grid>
              )}
              {inviteeRSVP.plusOne && (
              <Grid>
                <Grid item>
                  <TextField
                    name='plusOneName'
                    // defaultValue={`${inviteeRSVP.plusOneFirstName} ${inviteeRSVP.plusOneLastName} `}
                    id='outlined-multiline-static'
                    label={`Guest's Name`}
                    onChange={setPlusOne}
                  />
                </Grid>
              </Grid>
              )}
              {inviteeRSVP.firstName && (
              <Grid item>
                <Typography>Will you be attending the wedding?</Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox/>} label="Attending" checked={attendingChecked} onChange={handleAttending}/>
                  <FormControlLabel control={<Checkbox/>} label="Not Attending" checked={notAttendingChecked} onChange={handleNotAttending}/>
                </FormGroup>
                <Button type='submit' color='success' variant='contained'>
                  RSVP
                </Button>
              </Grid>
              )}
            </form>

          )}
        </Paper>
      </Box>
      }
      </>
    )
    
  }

  export default RSVP;