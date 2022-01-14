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


function AddPhoto(props){

  return(
    <Box className={props.classes.boxContainer}>
      <Paper className={props.classes.paperContainer}>
        <Typography>Add Photos</Typography>
        <Grid className={props.classes.form}>
          <form>
            <Grid className={props.classes.incident}>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Category
                  </InputLabel>
                  <Select
                    //name='photoCategory'
                    // value={'Wedding'}
                    label='photoCategory'
                    // onChange={handleChange}
                  >
                    <MenuItem value={'Wedding'}>Wedding</MenuItem>
                    <MenuItem value={'Engagement'}>Engagement</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid className={props.classes.description}>
              <Grid item>
                <TextField
                  name='photoUrl'
                  // value={formValues.incidentOffenseDescription}
                  id='outlined-multiline-static'
                  label='Url'
                  // onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid className={props.classes.description}>
              <Grid item>
                <TextField
                  name='caption'
                  // value={formValues.incidentOffenseDescription}
                  id='outlined-multiline-static'
                  label='caption'
                  // onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item className={props.classes.button}>
              <Button type='submit' color='success' variant='contained'>
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Box>
)
}

export default AddPhoto