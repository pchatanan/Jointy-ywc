import React from 'react'
import { Link } from 'react-router-dom'
import recommandationMock from '../../../res/images/recommendationMock.jpg'

const Card = (props) => {
    console.log(props.store)
    return (
        <Link to={`/stores/${props.store.id}`}><div style={{ padding: '3px' }}>
            <img style={{ borderRadius: '5px', width: '100%', height: '120px' }} src={props.store.url} />
            {props.store.name}
        </div>
        </Link>)
}

export default Card