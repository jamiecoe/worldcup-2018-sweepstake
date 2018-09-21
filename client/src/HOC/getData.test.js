import React from 'react'
import {shallow} from 'enzyme'
import getData, {mapSnapshotToState} from './getData'

describe('getData HOC', () => {

    describe('mapSnapshotToState', function () {
        it('should call setState with the snapshot values', () => {
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

            mapSnapshotToState(mockComponentClass, mockSnapshot);

            expect(mockComponentClass.setState).toHaveBeenCalledWith(mockValues)
        })
    })

    it('should initially show the loading <span>, when state is empty', () => {
        const MockComponent = () => <div>Test Component</div>
        const mockGetFirebaseData = () => {
            return Promise.resolve({val: () => ({})})
        }

        const MockComponentWithData = getData(MockComponent, mockGetFirebaseData)
        const mockComponentWithData = shallow(<MockComponentWithData/>)

        expect(mockComponentWithData.contains(<span>Loading...</span>)).toBe(true)
    })


    it('should render the test component when state is not empty', () => {
        const MockComponent = () => <div>Test Component</div>
        const mockState = {
            countries: {},
            players: {}
        }

        const mockGetFirebaseData = jest.fn(() => {
            const snapshot = {
                val: () => mockState
            }

            return Promise.resolve(snapshot)
        })

        const MockComponentWithData = getData(MockComponent, mockGetFirebaseData)
        const mockComponentWithData = shallow(<MockComponentWithData/>)

        Promise.resolve().then(() => {
            expect(mockGetFirebaseData).toHaveBeenCalled()

            mockComponentWithData.update()
            expect(mockComponentWithData.contains(<MockComponent countries={{}} players={{}}/>)).toBe(true)
        })

    })

    it('should do something if getFirebaseData() throws an error', () => {

    });

})
