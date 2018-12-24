import React, { Component, useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../Firebase'
import Nearby from './Nearby'
import BannerMock from '../../../res/images/bannerMock.jpg'
// import CardWrapper from './CardWrapper'
import Locations from './Location';
import Recommendation from './Recommendation'

const LandingPage = (props) => {
    const [locations, setLocations] = useState([])

    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        firebase.readStoresFromLocations().then((snap) => setLocations(snap.val()))
    }, [locations.length])
    
    return (
        <div>
            <img src={BannerMock} />
            <Nearby title="Nearby" cards={[{}, {}, {}]} />

            <Locations title="Location" locations={locations} />

            <Recommendation title="Recommendation" cards={[{}, {}, {}]} />
        </div>
    )
}

export default LandingPage;