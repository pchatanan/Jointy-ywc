import { observable } from 'mobx'

class Mobx {
    value = observable.box(123)
    joss = observable({

    })
}


export default Mobx