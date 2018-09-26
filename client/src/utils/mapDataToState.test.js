import { mapDataToState } from "./mapDataToState"

describe("mapDataToState", function () {
    it("should call setState with the snapshot values, if there are no errors", done => {
        const mockComponentClass = {
            setState: jest.fn()
        }

        const mockValues = {
            countries: {},
            players: {}
        }

        const mockSnapshot = {
            val: () => mockValues
        }

        const mockGetFirebaseData = () => Promise.resolve(mockSnapshot)

        return mapDataToState(mockComponentClass, mockGetFirebaseData)
            .then(() => {
                expect(mockComponentClass.setState).toHaveBeenCalledWith(mockValues)
                done()
            })
    })

    it("should call setState with error values, if getFirebaseData throws an error", done => {
        const mockComponentClass = {
            setState: jest.fn()
        }

        const testError = new Error('This is a test error')

        const mockGetFirebaseData = () => Promise.reject(testError)

        return mapDataToState(mockComponentClass, mockGetFirebaseData)
            .then(() => {
                expect(mockComponentClass.setState).toHaveBeenCalledWith({
                    error: testError.message
                })
                done()
            })
    })
})