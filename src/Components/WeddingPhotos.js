import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'
import {useState, useEffect} from 'react'
import '../styling/carousel.css'

function WeddingPhotos() {
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    let dbPhotos = await axios.get(`${process.env.REACT_APP_DATABASE}/photo`);
    let weddingPhotos = dbPhotos.data.filter(x => x.category === 'Wedding')
    setPhotos(weddingPhotos)
  }

  useEffect(() => {
      getPhotos();
  }, []);
 
    return(
      <Carousel className="carousel" fade>
        {photos.map((photo) => {
          return(
        <Carousel.Item className="carouselItem" key={photo._id}>
          <img
            className="d-block w-100"
            src={photo.photoUrl}
            alt={photo.caption}
          />
          <Carousel.Caption className="carouselCaption">
            <p>{photo.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }

  export default WeddingPhotos;
