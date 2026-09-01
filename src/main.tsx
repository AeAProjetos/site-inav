import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Ripple, initTWE } from 'tw-elements'

initTWE({ Ripple }, { allowReinits: true })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />,
)
