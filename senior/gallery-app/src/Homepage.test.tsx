import { render, screen } from '../test/utils.tsx'
import Homepage from './Homepage.tsx'

describe('Homepage', () => {
  it('should render correctly', () => {
    render(<Homepage />)
    expect(screen.getByText('Homepage.tsx')).toBeInTheDocument()
  })
})
