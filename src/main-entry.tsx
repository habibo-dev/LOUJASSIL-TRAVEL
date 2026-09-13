import { createRoot } from 'react-dom/client'
import Root from './main'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('LOUJASSIL TRAVEL: #root element was not found.')
}

createRoot(rootElement).render(<Root />)
