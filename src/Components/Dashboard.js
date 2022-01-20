import { useState, useEffect } from 'react';
import AddGuest from './AddGuest'
import AddPhoto from './AddPhoto'
import GuestList from './GuestList';
import DashboardCarousel from './DashboardCarousel';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

const useStyles = makeStyles({
	boxContainer: {
		// backgroundImage: 'url(https://source.unsplash.com/random/?neighborhood)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '110%',
		height: '99%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	paperContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightgray',
		width: '50%',
		height: '75%',
		borderRadius: 10,
		flexDirection: 'column',
	},
	form: {
		marginTop: '10px',
		marginBottom: '10px',
		width: '80%',
		height: '60%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	incident: {
		width: '100%',
		marginBottom: '10px',
	},
	description: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '10px',
		width: '100%',
	},
	button: {
		display: 'flex',
		justifyContent: 'center',
	},
});



function Dashboard(){
  const classes = useStyles();
  
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

  const defaultPhoto = {
    photoUrl: '',
    caption: '',
    tags: [],
    category: ''
  }

  const [newGuest, setNewGuest] = useState(defaultGuest)
  const [newPhoto, setNewPhoto] = useState(defaultPhoto)
  const [photos, setPhotos] = useState([])
  const [selectedInvitee, setSelectedInvitee] = useState('')

  //const [selectedImage, setSelectedImage] = useState({})
  const getPhotos = async () => {
    let dbPhotos = await axios.get(`${process.env.REACT_APP_DATABASE}/photo`);
    
    setPhotos(dbPhotos.data)
  };

  useEffect(() => {
    getPhotos();
  },[]);

  //photo.setPhotos(practicePhoto)


    return (
      <>
        <AddPhoto classes={classes} newPhoto={newPhoto} setNewPhoto={setNewPhoto} defaultPhoto={defaultPhoto} getPhotos={getPhotos}/>
        <AddGuest classes={classes} newGuest={newGuest} setNewGuest={setNewGuest} defaultGuest={defaultGuest}/>
        <GuestList selectedInvitee={selectedInvitee} setSelectedInvitee={setSelectedInvitee}/>
        <DashboardCarousel photos={photos}/>
      </>
    )
  }

  export default Dashboard;