import {Button, Box, Typography, Paper, Grid, TextField, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import axios from 'axios'
import {useState} from 'react'
import '../styling/RSVP.css'
function RSVP(props){

  const defaultGuest = {
    firstName: '',
    lastName: '',
    sOfirstName: null,
    sOlastName: null,
    couple: false,
    plusOne: false,
    plusOneFirstName: null,
    plusOneLastName: null,
    rsvpCode: '',
    rsvp: false
  }

  const [enteredRSVP, setEnteredRSVP] = useState('')
  let [inviteeRSVP, setInviteeRSVP] = useState(defaultGuest)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.REACT_APP_DATABASE}/invitee`,
      inviteeRSVP
    )
    setInviteeRSVP({
      defaultGuest,
    })
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
      rsvp: e.target.checked
    })
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
      <Box className="rsvpBox">
        <Paper>
          <Typography>RSVP</Typography>
          <Typography>Please Enter your RSVP Code</Typography>
          <Grid>
            <form id="create-invitee-form" onSubmit={handleSubmit}>
              {!inviteeRSVP.firstName && (
              <Grid>
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
                  <TextField
                    name='name'
                    defaultValue={`${inviteeRSVP.firstName} ${inviteeRSVP.lastName} `}
                    id='outlined-multiline-static'
                    label="Name"
                  />
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
                <FormGroup>
                  <FormControlLabel control={<Checkbox/>} label="Couple" checked={inviteeRSVP.rsvp} onChange={handleAttending}/>
                </FormGroup>
                <Button type='submit' color='success' variant='contained'>
                  RSVP
                </Button>
              </Grid>
              )}
            </form>
          </Grid>
        </Paper>
      </Box>
    )
    
  }

  export default RSVP;