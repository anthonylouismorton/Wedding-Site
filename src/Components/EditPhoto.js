import {Button, Modal, Box, Typography, Paper, Grid, Checkbox, TextField, FormControlLabel, FormGroup} from '@mui/material'
import axios from 'axios'
// import { useState } from 'react';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };


function EditPhoto(props){

  const handleSubmit = async (e) => {
    console.log('submitting')
    e.preventDefault();
    await axios.put(
      `${process.env.REACT_APP_DATABASE}/photo`,
      props.selectedPhoto
    )
  
    props.setSelectedPhoto({
      ...props.defaultPhoto,
    })
    props.handleClose()
  };
  
  const setCaption = (e) => {
    props.setSelectedPhoto({
      ...props.selectedPhoto,
      caption: e.target.value,
    })
  }

  const setTags = (e) => {
    props.setSelectedPhoto({
      ...props.selectedPhoto,
      tags: e.target.value,
    })
  }

  return(
    <>
    <Modal
      open={props.photoOpen}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
         <Paper>
           <Typography>Edit Photo</Typography>
           <Grid>
             <form id="edit-photo-form" onSubmit={handleSubmit}>
               <Grid>
                 <Grid item>
                   <TextField
                     name='caption'
                     defaultValue={`${props.selectedPhoto.caption} `}
                     id='outlined-multiline-static'
                     label={props.selectedPhoto.caption}
                     onChange={setCaption}
                   />
                 </Grid>
               </Grid>
               <Grid>
                 <Grid item>
                   <TextField
                     name='tags'
                     defaultValue={`${props.selectedPhoto.tags} `}
                     id='outlined-multiline-static'
                     label={props.selectedPhoto.tags}
                     onChange={setTags}
                   />
                 </Grid>
               </Grid>
               <Grid item>
                 <Button type='submit' color='success' variant='contained'>
                   Submit
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

export default EditPhoto;