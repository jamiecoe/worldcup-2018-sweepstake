import { isEmpty } from './isEmpty'

describe('isEmpty', () => {
  it('should be a function', () => {
    expect(typeof isEmpty).toBe('function')
  })

  it('should return true if the arguement is null, undefined or NaN', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty(NaN)).toBe(true)
  })

  it('should return true if an object is empty', () => {
    const emptyTestObject = {}

    expect(isEmpty(emptyTestObject)).toBe(true)
  })

  it('should return false if an object contains a value', () => {
    const testObject = {
      key: 'test value'
    }            

    expect(isEmpty(testObject)).toBe(false)
  })
})
