import {Button, Box, Typography, Paper, Grid, TextField, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import axios from 'axios'
import {useState} from 'react'
import { makeStyles } from '@material-ui/styles';
import '../styling/rsvp.css'

const useStyles = makeStyles({
  boxContainer: {
    height: '100%',
    minWidth: '25%',
    maxWidth: '40%',
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
    padding: '15px'
  },
  form: {
    marginTop: '10px',
    marginBottom: '20px',
    // width: '100%',
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
    marginTop: '15px !important',
    fontSize: '1rem !important'
  },
  formGroup: {
    marginTop: '15px !important',
    // display: 'flex',
    flexDirection: 'row !important',
    justifyContent: 'center',
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
  const [alreadyRSVP, setAlreadyRSVP] = useState(false)
  
  const handleClose = () => {
    setRSVPsubmitted(false)
    setInviteeRSVP(defaultGuest)
    setAlreadyRSVP(false)
  }
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
    if(guest.data.rsvp !== null){
      setAlreadyRSVP(true)
    }
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
    if(name.length === 1){
      setInviteeRSVP({
        ...inviteeRSVP,
        plusOneFirstName: '',
        plusOneLastName: ''
      })
    }
    else{
      setInviteeRSVP({
        ...inviteeRSVP,
        plusOneFirstName: name[0],
        plusOneLastName: name[1]
      })
    } 
  }
    return(
      <>
      {alreadyRSVP ?
        <Box className={classes.boxContainer}>
        <Paper className={classes.paperContainer}>
          <Typography className='typographySubHeader'>We have already received your RSVP</Typography>
          <Typography className='typographySubHeader'>Call or email Kristin or Anthony if your plans have changed</Typography>
          <Button className={classes.button} type='button' variant='contained' onClick={()=>handleClose()}>
          Close
          </Button>
        </Paper>
      </Box>
      :
      rsvpSubmitted && inviteeRSVP.rsvp ?
      <Box className={classes.boxContainer}>
        <Paper className={classes.paperContainer}>
          <Typography className='typographySubHeader'>Thank you, {inviteeRSVP.firstName} for your RSVP.</Typography>
          <Typography className='typographySubHeader'>If you your plans change, please contact Anthony or Kristin</Typography>
          <Typography className='typographySubHeader'>You may also reuse your RSVP code to make changes to your RSVP</Typography>
          <Button className={classes.button} type='button' variant='contained' onClick={()=>handleClose()}>
          Close
          </Button>
        </Paper>
      </Box>
      : rsvpSubmitted && !inviteeRSVP.rsvp ?
      <Box className={classes.boxContainer}>
        <Paper className={classes.paperContainer}>
          <Typography className='typographySubHeader'>Sorry to hear you can't make it.</Typography>
          <Typography className='typographySubHeader'>If you your plans change in the future and you can make it, please contact Anthony or Kristin</Typography>
          <Button className={classes.button} type='button' variant='contained' onClick={()=>handleClose()}>
          Close
          </Button>
        </Paper>
      </Box>
      :
      <Box className={classes.boxContainer}>
        <Paper className={classes.paperContainer}>
          {!rsvpSubmitted && (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Typography className='typographyHeader'>RSVP</Typography>
              {!inviteeRSVP.firstName && (
                <Grid>
                  <Typography className='typographyBody'>Please Enter your RSVP Code</Typography>
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
                  <Typography className='typographySubHeader'>Greetings {`${inviteeRSVP.firstName} & ${inviteeRSVP.sOfirstName} ${inviteeRSVP.lastName}`} !</Typography>
                  : inviteeRSVP.sOfirstName ?
                  <Typography className='typographySubHeader'>Greetings {`${inviteeRSVP.firstName} & ${inviteeRSVP.sOfirstName}`} !</Typography>
                  :
                  <Typography className='typographySubHeader'>Greetings {`${inviteeRSVP.firstName} ${inviteeRSVP.lastName}`} !</Typography>
                }
                </Grid>
                {inviteeRSVP.plusOne ?
                <Typography className='typographyBody'>You are invited to bring a guest.</Typography>
                :
                <Typography></Typography>
                }
              </Grid>
              )}
              {inviteeRSVP.plusOne && (
              <Grid>
                <Grid item>
                  <TextField
                    className={classes.textField}
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
              <Grid>
                <Typography className='typographyBody'>Will you be attending the wedding?</Typography>
                <Grid item>
                  <FormGroup className={classes.formGroup}>
                    <FormControlLabel control={<Checkbox/>} label="Attending" checked={attendingChecked} onChange={handleAttending}/>
                    <FormControlLabel control={<Checkbox/>} label="Not Attending" checked={notAttendingChecked} onChange={handleNotAttending}/>
                  </FormGroup>
                </Grid>
                <Grid item>
                  <Button className={classes.button} type='submit' variant='contained'>
                    RSVP
                  </Button>
                </Grid>
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