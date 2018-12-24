import React from 'react'
import { Link } from 'react-router-dom'

const VotePage = (props) => {
    return (<div style={{ margin :'20px', marginTop: '40px'}}>
        <h1>Vote</h1>
        <div>Title: title</div>
        <div>Detail: detail</div>
        <div>Joined: 10 people</div>
        <div>Need more: 10 people</div>

        <Link to="/"><button style={{ width: '100%', height: '50px', marginTop: '20px' }}>Vote</button></Link>
    </div>)
}

export default VotePage