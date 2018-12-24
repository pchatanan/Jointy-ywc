import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { FirebaseContext } from '../../Firebase'

const PostDetailPage = (props) => {
    const firebase = useContext(FirebaseContext)
    const [post, setPost] = useState({})
    const [joined, setJoined] = useState(false)

    const id = props.match.params.id
    useEffect(() => {
        firebase.getPostFromId(id, ([postid, post]) => {
            setPost(post)
        })
    })

    const join = () => {
        setJoined(true)
    }

    const createJoinBtn = () => {
        return (
            <div style={{ textAlign: 'center' }}>
                <button onClick={() => join()} style={{ margin: 'auto', border: 'none', borderRadius: '15px', width: '60%', height: '60px', color: 'white', backgroundImage: 'linear-gradient(to right,#f12711, #f5af19)' }}>Join</button>
            </div>
        )
    }

    const createTwoBtns = () => {
        return (
            <div style={{ textAlign: 'center' }}>
                <button onClick={() => join()} style={{ margin: 'auto', border: 'none', borderRadius: '15px', width: '60%', height: '60px', color: 'white', backgroundImage: 'linear-gradient(to right,#f12711, #f5af19)' }}>Cancel</button>
                <button onClick={() => join()} style={{ margin: 'auto', border: 'none', borderRadius: '15px', width: '60%', height: '60px', color: 'white', backgroundImage: 'linear-gradient(to right,#f12711, #f5af19)' }}>Success</button>
            </div>
        )
    }

    return (<div><h1 style={{ textAlign: 'center' }}>Post Detail</h1>
        <div style={{ width: '95%', borderRadius: '5px' }}>
            <div style={{ textAlign: 'center' }}>
                <img src="" style={{ width: '70px', height: '70px' }} />
            </div>
            <div style={{ margin: '10px', boxShadow: '7px 7px 10px rgba(0,0,0,0.3)' }}>
                <h1>{post.title}</h1>
                <h3>Paragon</h3>
                <h3>30 mins</h3>
                <h3>{post.maxPeople - post.currentPeople} people more</h3>
                <h3>{post.detail}</h3>
            </div>
        </div>
        {joined ? createTwoBtns() : createJoinBtn()}
        
    </div>)
}

export default withRouter(PostDetailPage)
