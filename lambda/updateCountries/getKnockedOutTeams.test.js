const sinon = require('sinon')
const {
  findKnockedOutTeams,
  getKnockedOutTeamsPromise
} = require('./getKnockedOutTeams')

describe('getKnockedOutTeams', () => {
  const mockApiData = [
    {
      home_team_country: 'home_team_country_1',
      away_team_country: 'away_team_country_1',
      winner: 'home_team_country_1'
    },
    {
      home_team_country: 'home_team_country_2',
      away_team_country: 'away_team_country_2',
      winner: 'away_team_country_2'
    }
  ]

  const mockApiDataWinnerUndecided = [
    {
      home_team_country: 'home_team_country_1',
      away_team_country: 'away_team_country_1',
      winner: null
    },
    {
      home_team_country: 'home_team_country_2',
      away_team_country: 'away_team_country_2',
      winner: null
    }
  ]

  const mockApiDataEmpty = []

  describe('findKnockedOutTeams', () => {
    describe('if winner of match is available', () => {
      it('should return an array with the knockedOut countries', () => {
        const expected = ['away_team_country_1', 'home_team_country_2']

        expect(findKnockedOutTeams(mockApiData)).toEqual(expected)
      })
    })

    describe('if winner of match is unavailable', () => {
      it('should return an empty array', () => {
        const expected = []

        expect(findKnockedOutTeams(mockApiDataWinnerUndecided)).toEqual(
          expected
        )
      })
    })

    describe('if api data is empty', () => {
      it('should return an empty array', () => {
        const expected = []
        expect(findKnockedOutTeams(mockApiDataEmpty)).toEqual(expected)
      })
    })
  })

  describe('getKnockedOutTeamsPromise', () => {
    describe('if winner of match is available', () => {
      it('should return a promise which resolves to an array of knocked out teams', done => {
        const mockRequestJson = sinon.stub()
        mockRequestJson.resolves(mockApiData)

        const expected = ['away_team_country_1', 'home_team_country_2']

        getKnockedOutTeamsPromise(mockRequestJson)
          .then(knockedOutTeam => {
            expect(mockRequestJson.calledOnce).toBe(true)
            expect(knockedOutTeam).toEqual(expected)
            done()
          })
          .catch(done)
      })
    })

    describe('if winner of match is unavailable', () => {
      it('should return a promise which resolves to an empty array', done => {
        const mockRequestJson = sinon.stub()
        mockRequestJson.resolves(mockApiDataWinnerUndecided)

        const expected = []

        getKnockedOutTeamsPromise(mockRequestJson)
          .then(knockedOutTeam => {
            expect(mockRequestJson.calledOnce).toBe(true)
            expect(knockedOutTeam).toEqual(expected)
            done()
          })
          .catch(done)
      })
    })

    describe('if api data is empty', () => {
      it('should return a promise which resolves to an empty array', done => {
        const mockRequestJson = sinon.stub()
        mockRequestJson.resolves(mockApiDataEmpty)

        const expected = []

        getKnockedOutTeamsPromise(mockRequestJson)
          .then(knockedOutTeam => {
            expect(mockRequestJson.calledOnce).toBe(true)
            expect(knockedOutTeam).toEqual(expected)
            done()
          })
          .catch(done)
      })
    })

    describe('if the request throws an error', () => {
      it('should return a rejected promise', done => {
        const mockRequestJson = sinon.stub()
        const testError = new Error('this is a test error')
        mockRequestJson.rejects(testError)

        getKnockedOutTeamsPromise(mockRequestJson)
          .then(done)
          .catch(err => {
            expect(err).toBe(testError)
            done()
          })
      })
    })
  })
})
