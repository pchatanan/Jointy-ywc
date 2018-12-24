import React from 'react'
import { Link } from 'react-router-dom'
import recommandationMock from '../../../res/images/recommendationMock.jpg'

const Card = (props) => {
    return (<div style={{ padding: '3px' }}>
        <img style={{ borderRadius: '5px', width: '100%', height: 'auto' }} src={recommandationMock} />
        <Link to={`/stores/${props.store.store ? props.store.store.storeId : ""}`}>{props.store.store ? props.store.detail.name : ""}</Link>
    </div>)
}

export default Card