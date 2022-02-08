import { useState, useEffect } from 'react';
import AddGuest from './AddGuest';
import AddPhoto from './AddPhoto';
import GuestList from './GuestList';
import EditGuest from './EditGuest';
import PhotoList from './PhotoList';
import EditPhoto from './EditPhoto';
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
    sOfirstName: '',
    sOlastName: '',
    couple: false,
    plusOne: false,
    plusOneFirstName: '',
    plusOneLastName: '',
    rsvpCode: '',
    rsvp: null,
    rsvpSend: false,
    email: []
  }

  const defaultPhoto = {
    photoUrl: '',
    caption: '',
    tags: [],
    category: ''
  }

  const [newGuest, setNewGuest] = useState(defaultGuest);
  const [newPhoto, setNewPhoto] = useState(defaultPhoto);
  const [editCoupleChecked, editSetCoupleChecked] = useState(false);
  const [editPlusOneChecked, editSetPlusOneCheck] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedInvitee, setSelectedInvitee] = useState(defaultGuest);
  const [selectedPhoto, setSelectedPhoto] = useState(defaultPhoto)
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false)
  const [selected, setSelected] = useState([]);
  const [guestSelected, setGuestSelected] = useState([])
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setPhotoOpen(false)

  const getPhotos = async () => {
    let dbPhotos = await axios.get(`${process.env.REACT_APP_DATABASE}/photo`);
    
    setPhotos(dbPhotos.data)
  };

  let getGuests = async () => {
    let invitees = await axios.get(`${process.env.REACT_APP_DATABASE}/invitee`);
    let refinedInvitees = invitees.data.map((invitee) => {
      let rsvp;
      let sO;
      let plusOne;
      let rsvpSend;
      if(invitee.rsvp){
        rsvp = 'Yes'
      }
      else if(invitee.rsvp === false){
        rsvp = 'No'
      }
      else{
        rsvp = 'No reply'
      }
      if(invitee.sOfirstName){
        sO = `${invitee.sOfirstName} ${invitee.sOlastName}`
      }
      else{
        sO = 'none'
      }
      if(invitee.plusOne){
        plusOne = `${invitee.plusOneFirstName} ${invitee.plusOneLastName}`
      }
      else{
        plusOne = 'none'
      }
      if(invitee.rsvpSend){
        rsvpSend = 'Yes'
      }
      else{
        rsvpSend ='No'
      }
      return {name: `${invitee.firstName} ${invitee.lastName}`, sO: sO, plusOne: plusOne, rsvp: rsvp, rsvpCode: invitee.rsvpCode, id: invitee._id, rsvpSend: rsvpSend, email: invitee.email}
    })
    setRows(refinedInvitees)
  };
  const setName = (e) => {
    let name = e.target.value.split(' ');
    setNewGuest({
      ...newGuest,
      firstName: name[0],
      lastName: name[1]
    })
  }

  const setEmail = (e) => {
    let emails = e.target.value.split(' ');
    setNewGuest({
      ...newGuest,
      email: emails
    })
  }

  const setSoName = (e) => {
    let name = e.target.value.split(' ');
    setNewGuest({
      ...newGuest,
      sOfirstName: name[0],
      sOlastName: name[1]
    })
  }

  const setPlusOne = (e) => {
    let name = e.target.value.split(' ');
    setNewGuest({
      ...newGuest,
      plusOneFirstName: name[0],
      plusOneLastName: name[1]
    })
  }


  useEffect(() => {
    getPhotos();
    getGuests();
    if(selectedInvitee.couple){
      editSetCoupleChecked(true)
    }
    else{
      editSetCoupleChecked(false)
    }
    if(selectedInvitee.plusOne){
      editSetPlusOneCheck(true)
    }
    else{
      editSetPlusOneCheck(false)
    }
  },[selectedInvitee.couple, selectedInvitee.plusOne]);
    return (
      <>
        <AddPhoto classes={classes} newPhoto={newPhoto} setNewPhoto={setNewPhoto} defaultPhoto={defaultPhoto} getPhotos={getPhotos}/>
        <AddGuest classes={classes} newGuest={newGuest} setNewGuest={setNewGuest} defaultGuest={defaultGuest} getGuests={getGuests} setName={setName} setSoName={setSoName} setPlusOne={setPlusOne} setEmail={setEmail}/>
        <GuestList selectedInvitee={selectedInvitee} setSelectedInvitee={setSelectedInvitee} rows={rows} getGuests={getGuests} setOpen={setOpen} guestSelected={guestSelected} setGuestSelected={setGuestSelected}/>
        <PhotoList selectedPhoto={selectedPhoto} setSelectedPhoto={setSelectedPhoto} photos={photos} getPhotos={getPhotos} setPhotoOpen={setPhotoOpen} selected={selected} setSelected={setSelected}/>
        <DashboardCarousel photos={photos}/>
        <EditGuest handleClose={handleClose} open={open} editCoupleChecked={editCoupleChecked} editSetCoupleChecked={editSetCoupleChecked} editPlusOneChecked={editPlusOneChecked} editSetPlusOneCheck={editSetPlusOneCheck} selectedInvitee={selectedInvitee} setSelectedInvitee={setSelectedInvitee} guestSelected={guestSelected} setGuestSelected={setGuestSelected}/>
        <EditPhoto photoOpen={photoOpen} selectedPhoto={selectedPhoto} setSelectedPhoto={setSelectedPhoto} handleClose={handleEditClose} selected={selected} setSelected={setSelected} defaultPhoto={defaultPhoto} getPhotos={getPhotos}/>
      </>
    )
  }

  export default Dashboard;