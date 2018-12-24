import React from 'react'
import { Link } from 'react-router-dom'
import recommandationMock from '../../../res/images/recommendationMock.jpg'

const Card = (props) => {
    console.log(props.store)
    return (<div style={{ padding: '3px' }}>
        <img style={{ borderRadius: '5px', width: '100%', height: '120px' }} src={props.store.url} />
        <Link to={`/stores/${props.store.id}`}>{props.store.name}</Link>
    </div>)
}

export default Card