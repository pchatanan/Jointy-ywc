import React from 'react'
import { Link } from 'react-router-dom'
import redMock from '../../../res/images/recommendationMock.jpg'

const PromotionPreview = (props) => {
    console.log(props)
    return <div style={{ margin: '10px' }}>
        <Link to={`/promo/${props.promotion.detail.id}`} style={{ width: '90%', margin: "10px auto" }}>
            <img src={redMock} style={{ width: '100%', height: '150px', borderRadius: '5px' }} />
            <h1>{props.promotion.detail.title}</h1>
        </Link>
    </div>
}

export default PromotionPreview