import { ErrorState } from './ErrorState'

describe('ErrorState', () => {
    it('should return data that has been set in the constructor', () => {
        const testError = new ErrorState('test error')

        expect(testError.getState()).toBe('test error')
    })

    it('should be able to test if an object is an instance of ErrorState', () => {
        const testError = new ErrorState('test error')
        const testObj = {}

        expect(ErrorState.isError(testError)).toBe(true)
        expect(ErrorState.isError(testObj)).toBe(false)
    })
})
