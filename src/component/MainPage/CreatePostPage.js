import React, {useState, useContext} from 'react'
import {useFormInput} from '../Hook'
import './CreatePostPage.css'
import mockMap from '../../res/mock-select-location.png'

import Datetime from 'react-datetime'

import { SessionContext, FirebaseContext } from '../Firebase';

const locationArray = ["locationId0", "locationId1"]
const storeArray = ["storeId0", "storeId1", "storeId2", "storeId3"]

const CreatePostPage = (props) => {
    const currentUser = useContext(SessionContext)
    const firebase = useContext(FirebaseContext)

    const [locationSelected, setLocationSelected] = useState(false)

    const storeId = storeArray[Math.floor(Math.random() * storeArray.length)];

    const title = useFormInput("")
    const category = useFormInput("foodAndBeverage")
    const maxPeople = useFormInput(1)
    const [endTime, setEndTime] = useState(null)
    const detail = useFormInput("")

    const endTimeHandler = (moment) => {
        setEndTime(moment.toISOString())
    }

    const imgClick = () => {
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

    if(locationSelected){
        return (
            <>
            <div className="form-container">
            <div>Create Post</div>
            <input
              {...title}
              type="text"
              placeholder="Title"
            />
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