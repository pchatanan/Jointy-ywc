import React, { Component, useContext } from 'react'
import { observer } from 'mobx-react'
import { MobxContext } from '../../Mobx/index'

const Test = observer((props) => {
    const add = () => {
        props.mobx.value.set(props.mobx.value.get() + 1)
    }

    return <div>
        <div>{props.mobx.value.get()}</div>
        <button onClick={add}>add</button>
    </div>
})

const LandingPage = (props) => {
    const mobx = useContext(MobxContext)

    return (
        <div>Landing Page
            <div>value</div>
            <Test mobx={mobx} />
        </div>
    )
}

export default LandingPage;