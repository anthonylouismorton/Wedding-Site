import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function DashboardCarousel(props) {
    const handleCarouselClick = (e) => {
        
        // setSelectedImage({})
      }
        return (
            <div>
                <h2>Photos</h2>
                <Carousel autoPlay interval="5000" transitionTime="500">
                    {props.photos.map((photo) => {
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