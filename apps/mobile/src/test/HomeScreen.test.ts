import handleLogin from '../screens/HomeScreen'
jest.mock('../screens/HomeScreen', () => ({
  handleLogin: jest.fn(),
}))

describe('handleLogin', () => {
  it('should set selectLogin state to true ', () => {
    expect(handleLogin).toBe(false)
  })
})
