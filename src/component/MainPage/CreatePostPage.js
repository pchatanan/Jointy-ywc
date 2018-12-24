import React, { useState, useContext, useEffect } from 'react'
import { useFormInput } from '../Hook'
import './CreatePostPage.css'

import { Link } from 'react-router-dom'

import mockMap from '../../res/mock-select-location.png'

import Datetime from 'react-datetime'

import { SessionContext, FirebaseContext } from '../Firebase';

import CreatableSelect from 'react-select/lib/Creatable';

const locationArray = ["locationId0", "locationId1"]
const storeArray = ["storeId0", "storeId1", "storeId2", "storeId3"]



const CreatePostPage = (props) => {
    const currentUser = useContext(SessionContext)
    const firebase = useContext(FirebaseContext)
    const [locationSelected, setLocationSelected] = useState(false)
    const [storeId, setStoreId] = useState(null)

    const [forceKey, setForceKey] = useState(0)

    const [storeName, setStoreName] = useState("")

    const [promoOption, setPromoOption] = useState([]);

    const [newPromo, setNewPromo] = useState(null)

    useEffect(() => {
        if (storeId !== null) {
            firebase.getPromosFromStore(storeId, handlePromos)
        }
    }, [storeId])

    const [title, setTitle] = useState("")
    const category = useFormInput("foodAndBeverage")
    const maxPeople = useFormInput(1)
    const [endTime, setEndTime] = useState(null)
    const detail = useFormInput("")

    const handlePromos = (promoArray) => {
        for (let i = 0; i < promoArray.length; i++) {
            var promoId = promoArray[i]
            firebase.getPromoFromId(promoId, (promo) => {
                var temp = promoOption

                var option = { value: promo.title, label: promo.title }
                temp.push(option)
                console.log("***********************")
                console.log(temp)
                setPromoOption(temp)

                var a = forceKey
                a += 1
                setForceKey(a)
            })
        }
    }

    const endTimeHandler = (moment) => {
        setEndTime(moment.toISOString())
    }

    const imgClick = () => {
        setStoreId(storeArray[Math.floor(Math.random() * storeArray.length)])
        setLocationSelected(true)
    }

    const submitClick = () => {
        let postData = {
            status: "created",
            title: title,
            category: category.value, //TODO: select category
            endTime: endTime, //TODO: select Date,
            posterId: currentUser.uid,
            maxPeople: maxPeople.value,
            detail: detail.value
        }
        console.log(postData)
        firebase.createPost(postData, storeId, newPromo)
    }

    const handleChange = (newValue, actionMeta) => {
        console.log("**************")
        console.log(storeId)
        setTitle(newValue)
        if (actionMeta.action === 'create-option') {
            setNewPromo(newValue)

        }
        else {
            setNewPromo(null)
        }
    };

    if (locationSelected) {
        useEffect(() => {
            firebase.getStoreNameFromId(storeId, (name) => {
                setStoreName(name)
            })
        }, [storeId])
        return (
            <>
                <div className="form-container" style={{ margin: '10px' }}>
                    <div style={{ textAlign: 'center' }}>Add promotion</div>
                    <div style={{ textAlign: 'center' }}>{storeName}</div>
                    <b>Pro name</b>
                    <CreatableSelect
                        isClearable
                        onChange={handleChange}
                        options={promoOption}
                        key={forceKey} />
                    <b>Category</b>
                    <select {...category} style={{ height: '35px' }}>
                        <option value="foodAndBeverage">Food & Beverage</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="shop">Shopping</option>
                    </select>
                    <b>People need more</b>
                    <input
                        style={{ height: '30px' }}
                        type="text"
                        pattern="[0-9]*"
                        {...maxPeople}
                        placeholder="People needed more" />
                    <b>Time</b>
                    <Datetime onChange={endTimeHandler} />
                    <textarea className="detail"
                        style={{ height: '160px' }}
                        {...detail}
                        type="text"
                        placeholder="Detail"
                    />
                </div>
                <Link to="/"><button className="submit-btn" onClick={submitClick} style={{ background: '#e74c3c', color: 'white', borderRadius: '10px', height: '50px', fontSize: '1.3em' }}>Submit</button></Link>
            </>
        )
    }
    else {
        return (
            <img calssName="mock-map-select-store" onClick={imgClick} style={{ width: '100%', height: '100vh' }} src={mockMap} />
        )
    }

}

export default CreatePostPage;