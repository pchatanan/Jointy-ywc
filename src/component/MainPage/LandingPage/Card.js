import React from 'react'
import recommandationMock from '../../../res/images/recommendationMock.jpg'

const Card = (props) => {
    return (<div style={{ padding: '3px' }}>
        <img style={{ borderRadius: '5px', width: '100%', height: 'auto' }} src={recommandationMock} />
    </div>)
}

export default Card