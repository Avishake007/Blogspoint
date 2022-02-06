// Third Party import
import { Route, Switch } from "react-router-dom";
import { useReducer, createContext } from "react";
//Local Import
import Home from "./pages/Home/home";
import Navbar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import About from "./pages/About/about";
import Write from "./pages/WritePost/write";
import Login from "./pages/Login/signin";
import Signup from "./pages/Register/signup";
import Logout from "./Components/Logout/logout";
import Update from "./pages/UpdatePost/update";
import DetailView from "./pages/DetailPost/detailpost";
import ErrorPage from "./pages/ErrorPage/errorpage";
import { initialState, reducer } from "../src/reducer/UseReducer";
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
        <Route exact path="/update/:id" component={Update} />
        <Route exact path="/details/:id" component={DetailView} />
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
