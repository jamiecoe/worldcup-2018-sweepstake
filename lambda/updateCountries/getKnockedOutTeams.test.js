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
    it('should return an array with the knockedOut countries', () => {
      const expected = ['away_team_country_1', 'home_team_country_2']

      expect(findKnockedOutTeams(mockApiData)).toEqual(expected)
    })

    it('should return an empty array if data is empty', () => {
      const expected = []
      expect(findKnockedOutTeams(mockApiDataEmpty)).toEqual(expected)
    })

    it('should return an empty array if a winner has not been decided yet', () => {
      const expected = []

      expect(findKnockedOutTeams(mockApiDataWinnerUndecided)).toEqual(expected)
    })
  })

  describe('getKnockedOutTeamsPromise', () => {
    it('should return a promise which resolves to an array of knocked out teams, if winner is available', () => {
      const mockRequestJson = sinon.stub()
      mockRequestJson.resolves(mockApiData)

      const expected = ['away_team_country_1', 'home_team_country_2']

      return getKnockedOutTeamsPromise(mockRequestJson).then(knockedOutTeam => {
        expect(mockRequestJson.calledOnce).toBe(true)
        expect(knockedOutTeam).toEqual(expected)
      })
    })

    it('should return a promise which resolves to an empty array, if winner is unavailable', () => {
      const mockRequestJson = sinon.stub()
      mockRequestJson.resolves(mockApiDataWinnerUndecided)

      const expected = []

      return getKnockedOutTeamsPromise(mockRequestJson).then(knockedOutTeam => {
        expect(mockRequestJson.calledOnce).toBe(true)
        expect(knockedOutTeam).toEqual(expected)
      })
    })

    it('should return a promise which resolves to an empty array, if data is empty', () => {
      const mockRequestJson = sinon.stub()
      mockRequestJson.resolves(mockApiDataEmpty)

      const expected = []

      return getKnockedOutTeamsPromise(mockRequestJson).then(knockedOutTeam => {
        expect(mockRequestJson.calledOnce).toBe(true)
        expect(knockedOutTeam).toEqual(expected)
      })
    })
  })
})
