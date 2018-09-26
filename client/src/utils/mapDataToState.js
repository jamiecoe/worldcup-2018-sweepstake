import { getFirebaseData as _getFirebaseData } from "./getFirebaseData"

export const mapDataToState = (Component, getFirebaseData = _getFirebaseData ) => {
    return getFirebaseData()
        .then(snapshot => {
            const values = snapshot.val()
            Component.setState(values)
        }).catch(err => {
            Component.setState({
                error: err.message
            })
        })
}