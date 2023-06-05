import {Route} from "wouter"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Todo from "./Pages/Todo"
function App() {
  return (
    <>
    <div className="App">
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/" component={Todo}/>
    </div>
    </>
  )
}

export default App
