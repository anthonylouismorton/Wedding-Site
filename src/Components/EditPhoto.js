import {Button, Modal, Box, Typography, Paper, Grid, Checkbox, TextField, FormControlLabel, FormGroup, List, ListItem, IconButton, ListItemAvatar, ListItemText} from '@mui/material'
import{
  Delete,
} from '@material-ui/icons'
import { useState, cloneElement } from 'react';
import axios from 'axios'
// import TagList from './TagList'
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

  const [weddingChecked, setWeddingChecked] = useState(false)
  const [engagementChecked, setEngagementChecked] = useState(false)
  const [inputValue, setInputValue] = useState('')

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
    e.preventDefault()
    let tags = e.target.value
    setInputValue(tags)
  }

  const addTags = (e) => {
    props.setSelectedPhoto({
    ...props.selectedPhoto,
    tags: [...props.selectedPhoto.tags, ...inputValue.split(' ')]
    })
    setInputValue('')

  }

  const handleWeddingCheck = (e) => {
    if(!weddingChecked){
      setWeddingChecked(true)
      props.setSelectedPhoto({...props.selectedPhoto,
      category: "Wedding"
    })
      setEngagementChecked(false)
    }
    else{
      setWeddingChecked(false)
    }
    
  }
  const handleEngageCheck = (e) => {

    if(!engagementChecked){
      setEngagementChecked(true)
      props.setSelectedPhoto({...props.selectedPhoto,
        category: "Engagement"
      })
      setWeddingChecked(false)
    }
    else{
      setEngagementChecked(false)
    }
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
                     label='Caption'
                     onChange={setCaption}
                   />
                 </Grid>
               </Grid>
               <Typography>Tags</Typography>
               <Grid>
                 <Grid item>
                   <TextField
                     name='tags'
                     id='outlined-multiline-static'
                     label='Add Tags (seperate by spaces)'
                     value={inputValue}
                     onChange={setTags}
                   />
                   <Button type='button' color='success' variant='contained' onClick={addTags}>
                     Add
                   </Button>
                 </Grid>
               </Grid>
               <Grid item>
                 <FormGroup>
                  <FormControlLabel control={<Checkbox/>} label="Wedding" checked={weddingChecked} onChange={handleWeddingCheck}/>
                  <FormControlLabel control={<Checkbox/>} label="Engagement" checked={engagementChecked} onChange={handleEngageCheck} />
                </FormGroup>
                 </Grid>
               <Grid item>
                 <Button type='submit' color='success' variant='contained'>
                   Submit
                 </Button>
               </Grid>
             </form>
           </Grid>
         {/* <TagList/> */}
            <Grid item xs={12} md={6}>
              <Typography 
              sx={{ mt: 4, mb: 2 }} variant="h6" component="div"
              >
                Tags
              </Typography>
                <List>
                  {props.selectedPhoto.tags.map((tag) =>{
                    return(
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <Delete/>
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={tag}
                    />
                  </ListItem>
                    )
                  })}
                </List>
            </Grid>
         </Paper>
       </Box>
    </Modal>
    </>
  )
}

export default EditPhoto;