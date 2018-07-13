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

    describe('with new knockedOut teams to update', () => {
      it('should return a new array of equal length', () => {
        const updatedCountryLevelDataArray = updateCountryLevel(
          mockCountryLevelDataArray,
          mockKnockedOutTeams
        )

        expect(updatedCountryLevelDataArray).not.toBe(mockCountryLevelDataArray)
        expect(updatedCountryLevelDataArray).toHaveLength(
          mockCountryLevelDataArray.length
        )
      })

      it('should have only update knockedOut status of teams who are still in', () => {
        const updatedCountryLevelDataArray = updateCountryLevel(
          mockCountryLevelDataArray,
          mockKnockedOutTeams
        )

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
        const updatedCountryLevelDataArrayNoUpdates = updateCountryLevel(
          mockCountryLevelDataArray,
          mockKnockedOutTeamsEmpty
        )

        expect(updatedCountryLevelDataArrayNoUpdates).not.toBe(
          mockCountryLevelDataArray
        )
        expect(updatedCountryLevelDataArrayNoUpdates).toHaveLength(
          mockCountryLevelDataArray.length
        )
      })

      it('should not update knockedOut status any of teams', () => {
        const updatedCountryLevelDataArrayNoUpdates = updateCountryLevel(
          mockCountryLevelDataArray,
          mockKnockedOutTeamsEmpty
        )

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
    describe('if update is successful', () => {
      it('should call the update function, and resolve successfully', done => {
        const mockCountries = {}
        const mockDbRef = {
          update: sinon.stub()
        }
        mockDbRef.update.resolves()
        const mockCloseFirebaseConnection = sinon.stub()

        writeUpdateToFirebase(
          mockCountries,
          mockDbRef,
          mockCloseFirebaseConnection
        ).then(confirmationMsg => {
          expect(confirmationMsg).toBe('teams updated 👍')
          expect(mockDbRef.update.calledOnce).toBe(true)
          expect(mockCloseFirebaseConnection.calledOnce).toBe(true)
          done()
        })
      })
    })

    describe('if there is an error with update', () => {
      const testError = new Error('This is a test error')
      const mockCountries = {}
      const mockDbRef = {
        update: sinon.stub()
      }
      mockDbRef.update.rejects(testError)
      const mockCloseFirebaseConnection = sinon.stub()

      it('should call the update function, and reject properly', done => {
        writeUpdateToFirebase(
          mockCountries,
          mockDbRef,
          mockCloseFirebaseConnection
        ).catch(err => {
          expect(err).toBe(testError)
          expect(mockDbRef.update.calledOnce).toBe(true)
          expect(mockCloseFirebaseConnection.calledOnce).toBe(true)
          done()
        })
      })
    })
  })

  describe('updateCountriesWithKnockOutStatus', () => {
    const mockCountryLevels = {
      mockLevel1: [
        {
          name: 'mock_team_name_1',
          knockedOut: false
        },
        {
          name: 'mock_team_name_2',
          knockedOut: true
        }
      ],
      mockLevel2: [],
      mockLevel3: []
    }
    const mockKnockedOutTeams = ['mock_team_name_1', 'mock_team_name_2']

    it('should return a new object', () => {
      expect(
        updateCountriesWithKnockOutStatus(
          mockCountryLevels,
          mockKnockedOutTeams
        )
      ).not.toBe(mockCountryLevels)
    })

    it('should return any knockedOut teams with updated status', () => {
      const updatedCountryLevels = updateCountriesWithKnockOutStatus(
        mockCountryLevels,
        mockKnockedOutTeams
      )

      expect(updatedCountryLevels['mockLevel1'][0].knockedOut).toBe(true)
      expect(updatedCountryLevels['mockLevel1'][1].knockedOut).toBe(true)
    })
  })

  describe('updateFirebaseWithKnockedOutTeams', () => {
    const mockSnapshot = {
      val: sinon.stub()
    }

    const mockDbRef = {
      update: sinon.stub()
    }
    const mockCloseFirebaseConnection = sinon.stub()

    afterEach(() => {
      mockSnapshot.val.reset()
      mockDbRef.update.reset()
      mockCloseFirebaseConnection.reset()
    })

    describe('if there are no teams to update', () => {
      it('should return early with confirmation msg', () => {
        const mockKnockedOutTeamsEmpty = []
        const confirmationMsg = updateFirebaseWithKnockedOutTeams(
          mockKnockedOutTeamsEmpty,
          mockSnapshot,
          mockDbRef,
          mockCloseFirebaseConnection
        )

        expect(mockCloseFirebaseConnection.calledOnce).toBe(true)
        expect(confirmationMsg).toBe('no teams to update')
      })
    })

    describe('if db update was successful', () => {
      it('should return with a resolved promise', done => {
        const mockKnockedOutTeams = ['mock_team_name_1', 'mock_team_name_2']

        mockSnapshot.val.returns({
          countries: {}
        })

        mockDbRef.update.resolves()

        updateFirebaseWithKnockedOutTeams(
          mockKnockedOutTeams,
          mockSnapshot,
          mockDbRef,
          mockCloseFirebaseConnection
        ).then(confirmationMsg => {
          expect(mockSnapshot.val.calledOnce).toBe(true)
          expect(mockDbRef.update.calledOnce).toBe(true)
          expect(mockCloseFirebaseConnection.calledOnce).toBe(true)
          expect(confirmationMsg).toBe('teams updated 👍')
          done()
        })
      })
    })

    describe('if there was an error with db update', () => {
      it('should return a rejected promise', done => {
        const mockKnockedOutTeams = ['mock_team_name_1', 'mock_team_name_2']
        const testError = new Error('This is a test error')

        mockSnapshot.val.returns({
          countries: {}
        })

        mockDbRef.update.rejects(testError)

        updateFirebaseWithKnockedOutTeams(
          mockKnockedOutTeams,
          mockSnapshot,
          mockDbRef,
          mockCloseFirebaseConnection
        ).catch(err => {
          expect(mockSnapshot.val.calledOnce).toBe(true)
          expect(mockDbRef.update.calledOnce).toBe(true)
          expect(mockCloseFirebaseConnection.calledOnce).toBe(true)
          expect(err).toBe(testError)
          done()
        })
      })
    })
  })
})
