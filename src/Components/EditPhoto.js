import {Button, Modal, Box, Typography, Paper, Grid, Checkbox, TextField, FormControlLabel, FormGroup, List, ListItem, IconButton, ListItemAvatar, ListItemText} from '@mui/material'
import{
  Delete,
} from '@material-ui/icons'
import { useState, useEffect } from 'react';
import axios from 'axios'
// import TagList from './TagList'

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
    e.preventDefault();
    await axios.put(
      `${process.env.REACT_APP_DATABASE}/photo`,
      props.selectedPhoto
    )
    props.setSelected([])
    setWeddingChecked(false)
    setEngagementChecked(false)
    props.setSelectedPhoto(props.defaultPhoto)
    props.getPhotos()
    props.handleClose()
  };

  const handleCancel = () => {
    props.handleClose()
    setWeddingChecked(false)
    setEngagementChecked(false)
    props.setSelected([])
    props.setSelectedPhoto(props.defaultPhoto)
  }
  
  const setCaption = (e) => {
    props.setSelectedPhoto({
      ...props.selectedPhoto,
      caption: e.target.value,
    })
  }

  const handleTags = (e) => {
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
  
  const handleDelete = (tag) => {
    for(let i = 0; i < props.selectedPhoto.tags.length; i++){
      if(tag === props.selectedPhoto.tags[i]){
        props.selectedPhoto.tags.splice(i, 1)
      }
    }
    props.setSelectedPhoto({
      ...props.selectedPhoto,
    })
  }
  useEffect(() => {
    if(props.selectedPhoto.category === "Wedding"){
      setWeddingChecked(true)
    }
    if(props.selectedPhoto.category === "Engagement"){
      setEngagementChecked(true)
    }
  
  },[props.selectedPhoto]);

  return(
    <>
    <Modal
      open={props.photoOpen}
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
                     value={props.selectedPhoto.caption}
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
                    onChange={handleTags}
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
                 <Button onClick={handleCancel} type='button' color='warning' variant='contained'>
                   Cancel
                 </Button>
               </Grid>
             </form>
           </Grid>
         {/* <TagList/> */}
            <Grid item xs={12} md={6}>
              <Typography 
              sx={{ mt: 4, mb: 2 }} variant="h6" component="div"
              >
                Tags (must submit to save changes)
              </Typography>
                <List>
                  {/* {props.selectedPhoto.tags > 0 && */}
                    {props.selectedPhoto.tags.map((tag) => {
                    return(
                      <ListItem
                        key={tag}
                        secondaryAction={
                          <IconButton onClick={()=> handleDelete(tag)} edge="end" aria-label="delete">
                            <Delete />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={tag}
                        />
                      </ListItem>
                    )})}

                </List>
            </Grid>
         </Paper>
       </Box>
    </Modal>
    </>
  )
}

export default EditPhoto;