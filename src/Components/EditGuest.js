import {Button, Modal, Box, Typography, Paper, Grid, Checkbox, TextField, FormControlLabel, FormGroup} from '@mui/material'
import axios from 'axios'

function EditGuest(props){
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if(props.editCoupleChecked === false){
      props.selectedInvitee.sOfirstName = null;
      props.selectedInvitee.sOlastName = null;
    }
    if(props.editPlusOneChecked === false){
      props.selectedInvitee.plusOneFirstName = null;
      props.selectedInvitee.plusOneLastName = null;
    }
    await axios.put(
      `${process.env.REACT_APP_DATABASE}/invitee`,
      props.selectedInvitee
    )
    props.setGuestSelected([])
    props.setSelectedInvitee({
      ...props.defaultGuest,
    })
    props.handleClose()
  };

  const handleCancel = () => {
    props.handleClose()
    props.setGuestSelected([])
    props.setSelectedInvitee({
      ...props.defaultGuest,
    })
    // setDisplayEmail([])
  }
  
  const setName = (e) => {
    let name = e.target.value.split(' ');
    props.setSelectedInvitee({
      ...props.selectedInvitee,
      firstName: name[0],
      lastName: name[1]
    })
  }

  const setSoName = (e) => {
    let name = e.target.value.split(' ');
    props.setSelectedInvitee({
      ...props.selectedInvitee,
      sOfirstName: name[0],
      sOlastName: name[1]
    })
  }
  const setEmail = (e) => {
    let email = e.target.value.split(' ');
    props.selectedInvitee({
      ...props.selectedInvitee,
      email: email
    })
  }

  const setPlusOne = (e) => {
    let name = e.target.value.split(' ');
    props.setSelectedInvitee({
      ...props.selectedInvitee,
      plusOneFirstName: name[0],
      plusOneLastName: name[1]
    })
  }

  const coupleCheck = (e) => {
    props.editSetCoupleChecked(e.target.checked)
    props.selectedInvitee.couple = !props.editCoupleChecked
  }

  const plusOneCheck = (e) => {
    props.editSetPlusOneCheck(e.target.checked)
    props.selectedInvitee.plusOne = !props.editPlusOneChecked
  }

  return(
    <>
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={props.classes.modal}
    >
      <Box className={props.classes.editGuestContainer}>
         <Paper className={props.classes.paperContainer}>
           <Typography className={props.classes.headerTypo}>Edit Guest</Typography>
           <Grid className={props.classes.form}>
             <form id="create-invitee-form" onSubmit={handleSubmit}>
              <Grid>
                <Grid item className={props.classes.grid}>
                   <TextField
                     name='name'
                     value={`${props.selectedInvitee.firstName} ${props.selectedInvitee.lastName} `}
                     id='outlined-multiline-static'
                     label='Name'
                     onChange={setName}
                   />
                </Grid>
                  <Grid item>
                    <FormGroup className={props.classes.formGroup}>
                      <FormControlLabel control={<Checkbox/>} label="Couple" checked={props.editCoupleChecked} onChange={coupleCheck}/>
                      <FormControlLabel control={<Checkbox/>} label="+1" checked={props.editPlusOneChecked} onChange={plusOneCheck} />
                  </FormGroup>
                  </Grid>
              </Grid>
              <Grid>
                <Grid item className={props.classes.grid}>
                  <TextField
                    name='email'
                    value={`${props.selectedInvitee.email}`}
                    id='outlined-multiline-static'
                    label='Email'
                    onChange={setEmail}
                  />
                </Grid>
              </Grid>
               {props.editCoupleChecked && (
               <Grid>
                 <Grid item className={props.classes.grid}>
                   <TextField
                     name='significantOther'
                     defaultValue={`${props.selectedInvitee.sOfirstName} ${props.selectedInvitee.sOlastName} `}
                     id='outlined-multiline-static'
                     label='SO name'
                     onChange={setSoName}
                   />
                 </Grid>
               </Grid>
               )}
               {props.editPlusOneChecked &&(
               <Grid>
                 <Grid item className={props.classes.grid}>
                   <TextField
                     name='plusOneName'
                     defaultValue={`${props.selectedInvitee.plusOneFirstName} ${props.selectedInvitee.plusOneLastName} `}
                     id='outlined-multiline-static'
                     label='+1 Name'
                     onChange={setPlusOne}
                   />
                 </Grid>
               </Grid>
               )}
               <Grid>
                 <Grid item>
                 <Typography>RSVP Code: {props.selectedInvitee.rsvpCode}</Typography>
                 </Grid>
               </Grid>
               <Grid item className={props.classes.button}>
                 <Button type='submit' color='primary' variant='contained'>
                   Submit
                 </Button>
                 <Button onClick={handleCancel} type='button' color='primary' variant='contained'>
                   Cancel
                 </Button>
               </Grid>
             </form>
           </Grid>
         </Paper>
       </Box>
    </Modal>
    </>
  )
}

export default EditGuest;