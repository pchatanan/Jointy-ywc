import React, { Component, useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../Firebase'
import Nearby from './Nearby'
import BannerMock from '../../../res/images/bannerMock.jpg'
// import CardWrapper from './CardWrapper'
import Locations from './Location';
import Recommendation from './Recommendation'
import './index.css'

const LandingPage = (props) => {
    const [locations, setLocations] = useState([])
    const [storeArray, setStoreArray] = useState([])

    const firebase = useContext(FirebaseContext)

    const locationId = 'locationId1'

    useEffect(() => {
        firebase.readStoresFromLocations().then((snap) => setLocations(snap.val()))
        firebase.getLocationFromId(locationId, handleLocation) 
    }, [locationId])

    const handleLocation = (location) => {
        console.log(location)
        let name = []
        Object.keys(location.locationStores).forEach(async key => {
            await firebase.getStoreFromId(key, (store) => {
                var temp = storeArray
                temp.push(store)
                setStoreArray(temp)
            })
        })
    }
    
    return (
        <div>
        <div className="only-mobile">
            <img src={BannerMock} />
            <sub>{locations.detail && locations.detail.name}</sub>
            <Nearby title="Nearby" storeArray={storeArray} cards={[{}, {}, {}]} />

            <Locations title="Location" locations={locations} />

            <Recommendation title="Recommendation" cards={[{}, {}, {}]} />
        </div>
        <div className="desktop">
            <h3>Please open on mobile view to continue.</h3>
        </div>
        </div>
    )
}

export default LandingPage;