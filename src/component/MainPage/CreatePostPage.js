import React, {useState, useContext, useEffect} from 'react'
import {useFormInput} from '../Hook'
import './CreatePostPage.css'
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

    useEffect(() => {
        if(storeId !== null){
            firebase.getPromosFromStore(storeId, handlePromos)
        }
    }, [storeId])
    
    const title = useFormInput("")
    const category = useFormInput("foodAndBeverage")
    const maxPeople = useFormInput(1)
    const [endTime, setEndTime] = useState(null)
    const detail = useFormInput("")

    const handlePromos = (promoArray) => {
        for (let i = 0; i < promoArray.length; i++) { 
            var promoId = promoArray[i]
            firebase.getPromoFromId(promoId, (promo) => {
                var temp = promoOption

                var option = { value: promoId, label: promo.title }
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
            title: title.value,
            category: category.value, //TODO: select category
            endTime: endTime, //TODO: select Date,
            posterId: currentUser.uid,
            maxPeople: maxPeople.value,
            detail: detail.value
        }
        console.log(postData)
        firebase.createPost(postData, storeId)
        
    }

    const handleChange = (newValue, actionMeta) => {
        console.log("**************")
        console.log(storeId)
        if(actionMeta.action === 'create-option'){
            console.log("option-created")
        }
        else {
            console.log("option-selected")
        }
    };

    if(locationSelected){
        useEffect(() => {
            firebase.getStoreNameFromId(storeId, (name) => {
                setStoreName(name)
            })
        }, [storeId])
        return (
            <>
            <div className="form-container">
            <div>Create Post</div>
            <div>{storeName}</div>
            <input
              {...title}
              type="text"
              placeholder="Title"
            />
            <CreatableSelect
                isClearable
                onChange={handleChange}
                options={promoOption}
                key={forceKey}/>
            <select {...category}>
                <option value="foodAndBeverage">Food & Beverage</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="shop">Shopping</option>
            </select>
            <input
                type="text"
                pattern="[0-9]*"
                {...maxPeople}
                placeholder="People needed more" />
            <Datetime onChange={endTimeHandler}/>
            <textarea className="detail"
              {...detail}
              type="text"
              placeholder="Detail"
            />
            </div>
            <button className="submit-btn" onClick={submitClick}>Submit</button>
            </>
        )
    }
    else {
        return (
            <img calssName="mock-map-select-store" onClick={imgClick} src={mockMap}/>
        )
    }
    
}

export default CreatePostPage;