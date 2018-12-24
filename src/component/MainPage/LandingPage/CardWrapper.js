import React from 'react'
import Slider from "react-slick";
import Card from './Card'

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
};

const CardWrapper = (props) => {
    console.log(props)
    return (<div style={{
        marginLeft: '10px',
        marginTop: '10px',
        width: "calc(100% - 10px)",
        overflow: "hidden"
    }}>
        <h3>{props.title}</h3>
        <Slider {...settings} style={{ margin: 'auto' }}>
            {props.cards.map(card => {
                return <Card key={`card-${props.title}-${card.title}`} store={card} />
            })}
        </Slider>
    </div >)
}

export default CardWrapper

