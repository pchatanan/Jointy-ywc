import React from 'react'
import { Link } from 'react-router-dom'

const VotePage = (props) => {
    return (
        <>
            <div style={{ zIndex: '-1', position: 'fixed', top: '0', left: '0', width: `100%`, minHeight: `100vh`, backgroundImage: `url('https://images.unsplash.com/photo-1528732263440-4dd1a18a4cc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')` }}>
            </div>
            <div>
                <div style={{ position: 'fixed', bottom: '10%', left: '5%', width: `90%`, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div style={{ margin: '10px' }}>
                        <h1>Unlock promo, <br />control your style</h1>
                        <div>ปลดปล่ยอโปรโมชั่น สร้างสรรค์ด้วยตัวคุณ โปรโมชั่นพิเศษ 1 แถม 1 สงวนสิทธิ์เฉพาะลูปค้าในเว็บนี้เท่านั้น</div>
                        <div>Joined: 10 people</div>
                        <div>Need more: 10 people</div>

                        <Link to="/"><button style={{ width: '100%', height: '50px', fontSize: '1.3em', border: 'none',marginTop: '20px', borderRadius: '15px', color: 'white', backgroundColor: '#e74c3c' }}>Vote</button></Link>
                    </div>
                </div>
            </div>
        </>)
}

export default VotePage