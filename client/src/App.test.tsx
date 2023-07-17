import { renderWithProviders } from './utils/test-ultils'
import App from './App'

describe('App', () => {
  it('App mounts properly', () => {
    const wrapper = renderWithProviders(<App />)
    expect(wrapper).toBeTruthy()

    // Get by h1
    const h1 = wrapper.container.querySelector('h1')
    expect(h1?.textContent).toBe('Discover')

  })

});
