import { createContext, useContext, useEffect, useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import Profile from './components/screens/Profile'
import SignUp from './components/screens/SignUp'
import SignIn from './components/screens/SignIn'
import Home from './components/screens/Home'
import CreatePost from './components/screens/CreatePost'
import { initialState, reducer } from './reducers/userReducer'

export const UserContext = createContext()
const Routing = () => {
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:'USER',payload:{_id:user._id,name:user.name,email:user.email}})
      // history.push('/')
    }
    else{
      history.push('/sign-in')
    }
  },[])
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/profile"><Profile /></Route>
      <Route exact path="/sign-in"><SignIn /></Route>
      <Route exact path="/sign-up"><SignUp /></Route>
      <Route exact path="/create-post"><CreatePost /></Route>
    </Switch>
  )
}
function App() {
  console.log('app')
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>

  );
}

export default App;
