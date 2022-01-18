import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardCarousel() {
    const [photos, setPhotos] = useState([])
    // const [selectedImage, setSelectedImage] = useState({})
    useEffect(() => {
        const fetchPhotos = async () => {
          let dbPhotos = await axios.get(`${process.env.REACT_APP_DATABASE}/photo`);
          
          setPhotos(...photos, dbPhotos.data)
        };
        fetchPhotos();
    
        },[]);

    const handleCarouselClick = (e) => {
        console.log(e.target.id)
        // setSelectedImage({})
      }
        return (
            <div>
                <h2>Photos</h2>
                <Carousel autoPlay interval="5000" transitionTime="500">
                    {photos.map((photo) => {
                        return(
                            <div id={photo._id} key={photo._id} onClick={handleCarouselClick}>
                                <img alt={`${photo._id}`} src={`${photo.photoUrl}`} />
                                <p className="legend">{photo.caption}</p>
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        );
}

export default DashboardCarousel;