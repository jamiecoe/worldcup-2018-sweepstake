import { SuccessState } from './SuccessState'

describe('SuccessState', () => {
    it('should return data that has been set in the constructor', () => {
        const testSuccess = new SuccessState('test data')

        expect(testSuccess.getState()).toBe('test data')
    })

    it('should be able to test if an object is an instance of SuccessState', () => {
        const testSuccess = new SuccessState('test data')
        const testObj = {}

        expect(SuccessState.isSuccess(testSuccess)).toBe(true)
        expect(SuccessState.isSuccess(testObj)).toBe(false)
    })
})
