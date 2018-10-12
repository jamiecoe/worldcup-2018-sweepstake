import { getFirebaseData as _getFirebaseData } from "./getFirebaseData"

export const mapDataToState = (getFirebaseData = _getFirebaseData ) => {
    return getFirebaseData()
        .then(snapshot => {
            return snapshot.val()
        })
}
