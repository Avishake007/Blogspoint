import './App.css';
import { Route, Switch } from 'react-router-dom';

import Home from './Components/Home/home';
import Navbar from './Components/Navbar/navbar';
import Footer from './Components/Footer/footer';
import About from './Components/About/about';
import Write from './Components/Write/write'
import Login from './Components/Login/signin';
import Signup from './Components/Register/signup';
import Logout from './Components/Logout/logout';
import Update from './Components/UpdatePage/update';
import DetailView from './Components/DetailView/detailpost';
import ErrorPage from './Components/ErrorPage/errorpage';
import { useReducer, createContext } from 'react';
import { initialState, reducer } from '../src/reducer/UseReducer';
// ContextAPI
export const UserContext = createContext();
function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  return (


    <UserContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/write">
          <Write />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path='/update/:id' component={Update} />
        <Route exact path='/details/:id' component={DetailView} />
        <Route path="/logout">
          <Logout />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </UserContext.Provider>


  );
}
export default App;