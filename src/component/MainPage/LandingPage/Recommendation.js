import React from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import Card from './Card'

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
};

const Nearby = (props) => {
    return (<div style={{
        marginLeft: '10px',
        marginTop: '10px',
        width: "calc(100% - 10px)",
        overflow: "hidden"
    }}>
        <h3>{props.title}</h3>
        <Slider {...settings} style={{ margin: 'auto' }}>
            <Link to={`/artical/1`}>
            <div style={{ padding: '3px' }}>
                <img style={{ borderRadius: '5px', width: '100%', height: '120px' }} src="https://i.imgur.com/sYMrwea.jpg" />
                ซื้อ 3 แถม 1 แบ่งกันสวย ร่วมกันจอย by Watson
            </div>
            </Link>
        </Slider>
    </div >)
}

export default Nearby

