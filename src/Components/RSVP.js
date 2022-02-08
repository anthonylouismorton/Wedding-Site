import {Button, Box, Typography, Paper, Grid, TextField, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import axios from 'axios'
import {useState, useEffect} from 'react'
import '../styling/RSVP.css'
function RSVP(props){

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
    console.log('in the use effect')
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
    // setInviteeRSVP({
    //   defaultGuest,
    // })
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
  console.log(inviteeRSVP)
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
      <Box className="rsvpBox">
        <Paper>
          <Typography>RSVP</Typography>
          {!rsvpSubmitted && (
          <Grid>
            <form id="create-invitee-form" onSubmit={handleSubmit}>
              {!inviteeRSVP.firstName && (
                <Grid>
                <Typography>Please Enter your RSVP Code</Typography>
                <Grid item>
                  <TextField
                    name='name'
                    id='outlined-multiline-static'
                    label="RSVP Code"
                    onChange={setRSVP}
                  />
                </Grid>
                <Button type='button' onClick={handleRSVP} color='success' variant='contained'>
                  Submit
                </Button>
  
              </Grid>
              )}
              {inviteeRSVP.firstName &&(
                <Grid>
                <Grid item>
                  <Typography>Greetings {`${inviteeRSVP.firstName} ${inviteeRSVP.lastName}`} !</Typography>
                  {/* <TextField
                    name='name'
                    value={`${inviteeRSVP.firstName} ${inviteeRSVP.lastName} `}
                    id='outlined-multiline-static'
                    label="Name"
                  /> */}
                </Grid>  
              </Grid>
              )}
              {inviteeRSVP.couple && (
              <Grid>
                <Grid item>
                  <TextField
                    name='significantOther'
                    defaultValue={`${inviteeRSVP.sOfirstName} ${inviteeRSVP.sOlastName} `}
                    id='outlined-multiline-static'
                    label='SO name'
                  />
                </Grid>
              </Grid>
              )}
              {inviteeRSVP.plusOne && (
              <Grid>
                <Grid item>
                  <TextField
                    name='plusOneName'
                    defaultValue={`${inviteeRSVP.plusOneFirstName} ${inviteeRSVP.plusOneLastName} `}
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
          </Grid>
          )}
        </Paper>
      </Box>
      }
      </>
    )
    
  }

  export default RSVP;