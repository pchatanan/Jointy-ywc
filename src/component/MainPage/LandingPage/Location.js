import React from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import recommandationMock from '../../../res/images/recommendationMock.jpg'

const Card = (props) => {
    return (<div style={{ padding: '3px' }}>
        <img style={{ borderRadius: '5px', width: '100%', height: '125px' }} src={props.store.detail.url} />
        <Link to={`/location/${props.link}`}>{props.store ? props.store.detail.name : ""}</Link>
    </div>)
}


var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
};

const Locations = (props) => {
    return (<div style={{
        marginLeft: '10px',
        marginTop: '10px',
        width: "calc(100% - 10px)",
        overflow: "hidden"
    }}>
        <h3>{props.title}</h3>
        <Slider {...settings} style={{ margin: 'auto' }}>
            {props.locations ? Object.keys(props.locations).map(key => {
                return <Card key={`card-${props.title}-${key}`} link={key} store={props.locations[key]} />
            }) : null}
        </Slider>
    </div >)
}

export default Locations

