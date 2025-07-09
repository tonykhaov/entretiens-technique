import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import { AppTestProviders } from './AppTestProviders.tsx'

function render(ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult {
  return rtlRender(ui, { wrapper: AppTestProviders, ...options })
}

export * from '@testing-library/react'
export { render, userEvent }
