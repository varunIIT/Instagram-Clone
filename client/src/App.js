import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Profile from './components/screens/Profile'
import SignUp from './components/screens/SignUp'
import SignIn from './components/screens/SignIn'
import Home from './components/screens/Home'

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/profile"><Profile/></Route>
          <Route exact path="/sign-in"><SignIn/></Route>
          <Route exact path="/sign-up"><SignUp/></Route>
        </Switch>
      </Router>

    </>
  );
}

export default App;
