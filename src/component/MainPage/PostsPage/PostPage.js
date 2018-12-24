import React, { useEffect, useContext, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { FirebaseContext } from '../../Firebase'

const PostPage = (props) => {
    const firebase = useContext(FirebaseContext)
    const id = props.match.params.id

    const [postArray, setPostArray] = useState([])

    useEffect(() => {
        firebase.getPromoFromId(id, (promotion) => {
            console.log(promotion)
            Object.keys(promotion.promoPosts).map((postId) => {
                firebase.getPostFromId(postId, handlePost)
            })
        })
    }, [id])

    const handlePost = ([postId, post]) => {
        console.log(postId)
        var temp = postArray
        temp.push({ id: postId, item: post })
        setPostArray(temp)
    }

    const createPostItem = posts => {
        var content = []
        posts.map(item => {
            console.log(item)
            content.push(
                <Link to={`/post/${item.id}`}>
                    <div>
                        <h3>{item.item.title}</h3>
                        <div>{item.item.detail}</div>
                    </div>
                </Link>)
        })
        return content
    }

    return (<div>
        <div>Promotion detail</div>
        <div>posts</div>
        <ul>

            {createPostItem(postArray)}
        </ul>
    </div>)
}

export default withRouter(PostPage)