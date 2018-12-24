import React, { Component, useContext } from 'react'
import { observer } from 'mobx-react'
import { MobxContext } from '../../Mobx/index'
import BannerMock from '../../../res/images/bannerMock.jpg'
import CardWrapper from './CardWrapper'

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
        <div>
            <img src={BannerMock} />
            <CardWrapper title="Nearby" cards={[{}, {}, {}]} />
            
            <CardWrapper title="Location" cards={[{}, {}, {}]} />
            
            <CardWrapper title="Recommendation" cards={[{}, {}, {}]} />
        </div>
    )
}

export default LandingPage;