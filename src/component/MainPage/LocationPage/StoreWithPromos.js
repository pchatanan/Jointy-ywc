import React from 'react'
import {FirebaseContext} from '../../Firebase'

const StoreWithPromos = (props) => {

    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        firebase.getPromosFromStore(props.storeId, handlePromos)

    }, [props.storeId])

    return (
        <>

        </>
    )
}