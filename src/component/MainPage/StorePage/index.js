import React, { useContext, useState, useEffect } from 'react'
import { FirebaseContext } from '../../Firebase'
import { withRouter } from 'react-router-dom'
import bannerMock from '../../../res/images/bannerMock.jpg'
import PromotionPreview from './PromotionPreview'

const StorePage = (props) => {
    console.log(props)
    const [store, setStore] = useState({
        name: '',
        storePromos: []
    })
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        firebase.readStore(props.match.params.id).then((data) => { setStore(data.val()) })
    }, store.length)

    return <div>
        <div style={{ backgroundImage: `url(${bannerMock})`, position: 'relative', height: '250px', width: `100%`, color: "white" }}>
            <div style={{ position: 'absolute', left: '10px', bottom: '0px' }}>
                <h1>{store.name}</h1>
            </div>
        </div>
        {/* StorePage {props.match.params.id} */}
        {store.storePromos ? store.storePromos.map((promotion) => {
            return <PromotionPreview promotion={promotion} />
        }) : null}
    </div>
}

export default withRouter(StorePage)