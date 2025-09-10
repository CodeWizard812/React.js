import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import Todo from './component/Todo.jsx'
import AddTodo from './component/AddTodo.jsx'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
    <AddTodo/>
    <Todo/>
  </Provider>
)
