import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-bootstrap'


function DashboardCarousel(props) {

        return (
            <div>
                {/* <h2>Photos</h2> */}
                <Carousel fade>
                    {props.photos.map((photo) => {
                    return(
                    <Carousel.Item key={photo._id}>
                    <img
                        className="d-block w-100"
                        src={photo.photoUrl}
                        alt={photo.caption}
                    />
                    <Carousel.Caption>
                    <p className="legend">{photo.caption}</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                    )
                    })}
            </Carousel>
            </div>
        );
}

export default DashboardCarousel;