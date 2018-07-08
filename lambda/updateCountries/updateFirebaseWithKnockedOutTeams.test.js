const sinon = require('sinon')
const {
  updateFirebaseWithKnockedOutTeams,
  updateCountriesWithKnockOutStatus,
  writeUpdateToFirebase,
  updateCountryLevel
} = require('./updateFirebaseWithKnockedOutTeams')

describe('updateFirebaseWithKnockedOutTeams', () => {
  describe('updateCountryLevel', () => {
    const mockCountryLevelDataArray = [
      {
        name: 'mock_team_name_1',
        knockedOut: false
      },
      {
        name: 'mock_team_name_2',
        knockedOut: true
      }
    ]

    const mockKnockedOutTeams = ['mock_team_name_1', 'mock_team_name_2']
    const mockKnockedOutTeamsEmpty = []

    const updatedCountryLevelDataArray = updateCountryLevel(
      mockCountryLevelDataArray,
      mockKnockedOutTeams
    )
    const updatedCountryLevelDataArrayNoUpdates = updateCountryLevel(
      mockCountryLevelDataArray,
      mockKnockedOutTeamsEmpty
    )

    describe('with new knockedOut teams to update', () => {
      it('should return a new array of equal length', () => {
        expect(updatedCountryLevelDataArray).not.toBe(mockCountryLevelDataArray)
        expect(updatedCountryLevelDataArray).toHaveLength(
          mockCountryLevelDataArray.length
        )
      })

      it('should have only update knockedOut status of teams who are still in', () => {
        expect(updatedCountryLevelDataArray[0].knockedOut).not.toBe(
          mockCountryLevelDataArray[0].knockedOut
        )
        expect(updatedCountryLevelDataArray[1].knockedOut).toBe(
          mockCountryLevelDataArray[1].knockedOut
        )
      })
    })

    describe('with no teams to updates', () => {
      it('should return a new array of equal length', () => {
        expect(updatedCountryLevelDataArrayNoUpdates).not.toBe(
          mockCountryLevelDataArray
        )
        expect(updatedCountryLevelDataArrayNoUpdates).toHaveLength(
          mockCountryLevelDataArray.length
        )
      })

      it('should not update knockedOut status any of teams', () => {
        expect(updatedCountryLevelDataArrayNoUpdates[0].knockedOut).toBe(
          mockCountryLevelDataArray[0].knockedOut
        )
        expect(updatedCountryLevelDataArrayNoUpdates[1].knockedOut).toBe(
          mockCountryLevelDataArray[1].knockedOut
        )
      })
    })
  })

  describe('writeUpdateToFirebase', () => {
    const mockCountries = {}
    const mockDbRef = {
      update: sinon.stub()
    }
    const mockCloseFirebaseConnection = sinon.stub()

    describe('if update is successful', () => {
      beforeAll(() => {
        mockDbRef.update.resolves()

        return writeUpdateToFirebase(
          mockCountries,
          mockDbRef,
          mockCloseFirebaseConnection
        )
      })

      it('should call the update function', () => {
        expect(mockDbRef.update.calledOnce).toBe(true)
      })

      it('should call the closeFirebaseConnection function', () => {
        expect(mockCloseFirebaseConnection.calledOnce).toBe(true)
      })

      afterAll(() => {
        mockDbRef.update.reset()
        mockCloseFirebaseConnection.reset()
      })
    })

    describe('if there is an error with update', () => {
      beforeAll(() => {
        mockDbRef.update.rejects()

        return writeUpdateToFirebase(
          mockCountries,
          mockDbRef,
          mockCloseFirebaseConnection
        )
      })

      it('should call the update function', () => {
        expect(mockDbRef.update.calledOnce).toBe(true)
      })

      it('should call the closeFirebaseConnection function', () => {
        expect(mockCloseFirebaseConnection.calledOnce).toBe(true)
      })

      afterAll(() => {
        mockDbRef.update.reset()
        mockCloseFirebaseConnection.reset()
      })
    })
  })
})
