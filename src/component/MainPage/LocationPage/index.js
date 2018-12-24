import React, { useContext, useEffect,useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FirebaseContext } from '../../Firebase'
import StoreWithPromos from './StoreWithPromos'

const LocationPage = props => {
    const firebase = useContext(FirebaseContext)
    const [location, setLocation ] = useState(null) 
    const id = props.match.params.id

    useEffect(() => {
        firebase.getLocationFromId(id, handleLocation)
    }, [id])

    const handleLocation = (location) => {
        setLocation(location)
    }
    
    const showStores = (location) => {
        if (location !== null) {
            var storeIdArray = Object.keys(location.locationStores)
            var content = []
            storeIdArray.map((item, index) => {
                content.push(<Link to={item}>{<StoreWithPromos storeId={item} />}</Link>)
            })
            return content
        }
    }

    console.log(location && location.locationStores)
    return (
        <div>
            <h1>id: {id}</h1>
            <h1>name: {location && location.detail.name}</h1>
            {showStores(location)}

        </div>
    )
}

export default withRouter(LocationPage)