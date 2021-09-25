import dva from 'dva'
import { createHashHistory } from 'history'

// 1. Initialize
const app = dva({
  history: createHashHistory()
})

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default)
app.model(require('./models/workflow').default)

// 4. Router
app.router(require('./routes').default)

// 5. Start
const App = app.start()

export const appStore: any = App().props.store

export default App
