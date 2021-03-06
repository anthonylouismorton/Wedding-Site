import {
	TextField,
	Button,
	Paper,
	Grid,
	Box,
	Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import axios from 'axios'

function AddPhoto(props){

  function categorySelect(e){
    props.setNewPhoto({
      ...props.newPhoto,
      category: e.target.value
    })
  }
  function setUrl(e){
    props.setNewPhoto({
      ...props.newPhoto,
      photoUrl: e.target.value
    })
  }
  function setCaption(e){
    props.setNewPhoto({
      ...props.newPhoto,
      caption: e.target.value
    })
  }
  const handleAddPhoto = () => {
    props.setShowAddPhoto(!props.showAddphoto)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${process.env.REACT_APP_DATABASE}/photo`,
      props.newPhoto
    )

		props.setNewPhoto({
			...props.defaultPhoto,
		})
    props.getPhotos();
    document.getElementById('create-photo-form').reset();
	};

  return(
    <Box className={props.classes.addPhotosContainer}>
      <Paper className={props.classes.paperContainer}>
        <Typography className={props.classes.headerTypo}>Add Photo</Typography>
        <Grid>
          <form className={props.classes.form} onSubmit={handleSubmit} id="create-photo-form">
            <Grid className={props.classes.grid}>
              <Grid item>
                <FormControl className={props.classes.inputBoxes}>
                  <InputLabel >
                    Category
                  </InputLabel>
                  <Select
                    value={props.newPhoto.category}
                    label='photoCategory'
                    onChange={categorySelect}
                  >
                    <MenuItem value={'Wedding'}>Wedding</MenuItem>
                    <MenuItem value={'Engagement'}>Engagement</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid className={props.classes.grid}>
              <Grid item>
                <TextField
                  name='photoUrl'
                  value={props.newPhoto.photoUrl}
                  id='outlined-multiline-static'
                  label='Url'
                  onChange={setUrl}
                  className={props.classes.inputBoxes}
                />
              </Grid>
            </Grid>
            <Grid className={props.classes.grid}>
              <Grid item>
                <TextField
                  name='caption'
                  value={props.newPhoto.caption}
                  id='outlined-multiline-static'
                  label='caption'
                  onChange={setCaption}
                  className={props.classes.inputBoxes}
                />
              </Grid>
            </Grid>
            <Grid item className={props.classes.button}>
              <Button type='submit' color='primary' variant='contained'>
                Submit
              </Button>
              <Button type='button' color='primary' variant='contained' onClick={handleAddPhoto}>
                Hide
              </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Box>
)
}

export default AddPhoto