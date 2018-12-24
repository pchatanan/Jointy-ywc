import React from 'react'
import { withRouter } from 'react-router-dom'
import bannerMock from '../../../res/images/bannerMock.jpg'
import PromotionPreview from './PromotionPreview'

const StorePage = (props) => {
    const promotions = [
        "1",
        "2",
        "3"
    ]
    return <div>
        <div style={{ backgroundImage: `url(${bannerMock})`, position: 'relative', height: '250px', width: `100%`, color: "white" }}>
            <div style={{ position: 'absolute', left: '10px', bottom: '0px' }}>
                <h1>Starbuck</h1>
            </div>
        </div>
        StorePage {props.match.params.id}
        {promotions.map((promotion) => {
            return <PromotionPreview />
        })}
    </div>
}

export default withRouter(StorePage)