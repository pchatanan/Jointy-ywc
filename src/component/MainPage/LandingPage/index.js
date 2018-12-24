import React, { Component, useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../Firebase'
import Nearby from './Nearby'
import { Link } from 'react-router-dom'
import BannerMock from '../../../res/images/bannerMock.jpg'
// import CardWrapper from './CardWrapper'
import Locations from './Location';
import Recommendation from './Recommendation'
import './index.css'
import LOGO from '../../../res/icons/logo_white.png'

const LandingPage = (props) => {
    const [locations, setLocations] = useState([])
    const [storeArray, setStoreArray] = useState([])

    const firebase = useContext(FirebaseContext)

    const locationId = 'locationId1'
    const [locationName, setLocationName] = useState("loading")

    useEffect(() => {
        firebase.readStoresFromLocations().then((snap) => setLocations(snap.val()))
        firebase.getLocationFromId(locationId, handleLocation)
    }, [locationId])

    const handleLocation = (location) => {
        setLocationName(location.detail.name)
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
                <div style={{ backgroundImage: `url(${BannerMock})`, position: 'relative', height: '250px', width: `100%`, color: "white", backgroundSize: "cover" }}>
                    <div style={{ position: 'absolute', left: '10px', bottom: '0px' }}>
                        <h1>Starbuck 1 แถม 1 สุดคุ้มค่า เฉพาะในเว็บนี้เท่านั้น</h1>
                        <Link to="/detail" style={{ textAlign: 'right' }}><button style={{ width: '20%', height: '50px', fontSize: '1.2em', border: 'none', marginTop: '20px', marginBottom: '10px', borderRadius: '15px', color: 'white', backgroundColor: '#e74c3c' }}>Vote</button></Link>
                    </div>
                </div>
                <img src={LOGO} style={{ width: '71px', height: 'auto', position: 'absolute', top: '10px', left: '10px', zIndex: '50'}} />
                <sub>{locations.detail && locations.detail.name}</sub>

                <Nearby title={"Nearby - " + locationName} storeArray={storeArray} cards={[{}, {}, {}]} />

                <Locations title="Location" locations={locations} />

                <Recommendation title={"Recommendation"} />
            </div>
            <div className="desktop">
                <h3>Please open on mobile view to continue.</h3>
            </div>
        </div>
    )
}

export default LandingPage;