import React from 'react'
import redMock from '../../../res/images/recommendationMock.jpg'

const PromotionPreview = (props) => {
    return <div style={{ width: '90%', margin: "10px auto" }}>
        <img src={redMock} style={{ width: '100%', height: '150px', borderRadius: '5px' }} />
    </div>
}

export default PromotionPreview