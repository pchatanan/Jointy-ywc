import { observable } from 'mobx'

class Mobx {
    value = observable.box(123)
}


export default Mobx