import React, {useContext,useEffect,useState } from 'react'
import {FirebaseContext} from '../../Firebase'
import Slider from "react-slick";

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
};


const StoreWithPromos = (props) => {

    const [ promos, setPromos ] = useState([])

    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        firebase.getPromosFromStore(props.storeId, handlePromos)
    }, [props.storeId])

    const handlePromos = (promoIds) => {
        console.log(promoIds)
        setPromos(promoIds)
    }

    return (
        <Slider {...settings} style={{ margin: 'auto' }}>
            {promos ? Object.keys(promos).map(key => {
                // return <Card key={`card-${props.title}-${key}`} link={key} store={props.locations[key]} />
                return <div style={{ border: "1px solid rgba(0,0,0,0.3)", borderRadius: '15px'}}>{key}</div>
            }) : null}
        </Slider>
    )
}

export default StoreWithPromos