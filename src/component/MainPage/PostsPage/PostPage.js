import React, { useEffect, useContext, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { FirebaseContext } from '../../Firebase'

const PostPage = (props) => {
    const firebase = useContext(FirebaseContext)
    const id = props.match.params.id

    const [postArray, setPostArray] = useState([])

    useEffect( () => {
        firebase.getPromoFromId(id, (promotion) => {
            console.log(promotion)
            Object.keys(promotion.promoPosts).map( (postId) => {
                firebase.getPostFromId(postId, handlePost)
            })
        })
    }, [id])

    const handlePost = (post) => {
        var temp = postArray
        temp.push(post)
        setPostArray(temp)
    }

    const createPostItem = posts => {
        var content = []
        posts.map(item => {
            content.push(<div>{JSON.stringify(item)}</div>)
        })
        return content
    }

    return (<div>
        <div>Promotion detail</div>
        <div>posts</div>
        <ul>
            <Link to={`/promo/${id}/detail`}>li</Link>
        </ul>
        {createPostItem(postArray)}
    </div>)
}

export default withRouter(PostPage)