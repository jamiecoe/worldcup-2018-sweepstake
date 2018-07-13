const sinon = require('sinon')
const {
  closeFirebaseConnection,
  getFirebaseDataPromise,
  getFirebaseRef
} = require('./firebaseHelperFunctions')

describe('firebaseHelperFunctions', () => {
  describe('closeFirebaseConnection', () => {
    it('should call admin.delete(), to close db connection', () => {
      const mockAdmin = {
        delete: sinon.spy()
      }

      closeFirebaseConnection(mockAdmin)

      expect(mockAdmin.delete.calledOnce).toBe(true)
    })
  })

  describe('getFirebaseRef', () => {
    it('should call admin.database().ref(), to return reference to db', () => {
      const mockAdmin = {
        database: sinon.stub()
      }
      const mockRef = sinon.stub()
      mockAdmin.database.returns({ ref: mockRef })
      mockRef.returns('db ref')

      expect(getFirebaseRef(mockAdmin)).toBe('db ref')
      expect(mockAdmin.database.calledOnce).toBe(true)
      expect(mockRef.calledOnce).toBe(true)
    })
  })

  describe('getFirebaseDataPromise', () => {
    describe('if dbRef successfully gets a snapshot of db', () => {
      it('should return a promise which resolves to a snapshot of db', done => {
        const mockGetFirebaseRef = sinon.stub()
        const mockOnce = sinon.stub()
        const mockSnapshot = {}

        mockGetFirebaseRef.returns({ once: mockOnce })
        mockOnce.withArgs('value').resolves(mockSnapshot)

        getFirebaseDataPromise(mockGetFirebaseRef).then(snapshot => {
          expect(mockGetFirebaseRef.calledOnce).toBe(true)
          expect(mockOnce.calledOnceWithExactly('value')).toBe(true)
          expect(snapshot).toBe(mockSnapshot)
          done()
        })
      })
    })

    describe('if there is an error in accessing the db snapshot', () => {
      it('should return a rejected promise', done => {
        const mockGetFirebaseRef = sinon.stub()
        const mockOnce = sinon.stub()
        const testError = new Error('this is a test error')

        mockGetFirebaseRef.returns({ once: mockOnce })
        mockOnce.withArgs('value').rejects(testError)

        getFirebaseDataPromise(mockGetFirebaseRef).catch(err => {
          expect(mockGetFirebaseRef.calledOnce).toBe(true)
          expect(mockOnce.calledOnceWithExactly('value')).toBe(true)
          expect(err).toBe(testError)
          done()
        })
      })
    })
  })
})
