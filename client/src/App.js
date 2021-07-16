import { createContext, useContext, useEffect, useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'

import Profile from './components/screens/Profile'
import SignUp from './components/screens/SignUp'
import SignIn from './components/screens/SignIn'
import Home from './components/screens/Home'
import CreatePost from './components/screens/CreatePost'
import UserProfile from'./components/screens/UserProfile'
import MyFollowingsPosts from'./components/screens/MyFollowingsPosts'
import ResetPassword from './components/screens/ResetPassword'
import NewPassword from './components/screens/NewPassword'

import { initialState, reducer } from './reducers/userReducer'

export const UserContext = createContext()
const Routing = () => {
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:'USER',payload:{_id:user._id,name:user.name,email:user.email,profilePic:user.profilePic}})
      if(history.location.pathname.startsWith('/sign-in')||history.location.pathname.startsWith('/sign-up')){
        history.push('/')
      }
    }
    else{
      if(!history.location.pathname.startsWith('/reset-password')&&!history.location.pathname.startsWith('/new-password')&&!history.location.pathname.startsWith('/sign-up'))
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
      <Route exact path="/others-profile/:userId"><UserProfile/></Route>
      <Route exact path="/my-followings-posts"><MyFollowingsPosts/></Route>
      <Route exact path="/reset-password"><ResetPassword/></Route>
      <Route exact path="/new-password/:token"><NewPassword/></Route>
    </Switch>
  )
}
function App() {
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
