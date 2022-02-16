import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'
import {useState, useEffect} from 'react'
import '../styling/engagement.css'

function EngagementPhotos() {
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    let dbPhotos = await axios.get(`${process.env.REACT_APP_DATABASE}/photo`);
    let EngagementPhotos = dbPhotos.data.filter(x => x.category === 'Engagement')
    setPhotos(EngagementPhotos)
  }

  useEffect(() => {
      getPhotos();
  }, []);
  console.log(photos)
    return(
      <Carousel fade>
        {photos.map((photo) => {
          return(
        <Carousel.Item key={photo._id}>
          <img
            className="d-block w-100"
            src={photo.photoUrl}
            alt={photo.caption}
          />
          <Carousel.Caption>
            <p>{photo.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }

  export default EngagementPhotos;
