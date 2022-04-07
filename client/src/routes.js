//Third party imports
import { Route, Switch } from "react-router-dom";
//Local imports
import Home from "./pages/Home/home";
import About from "./pages/About/about";
import Write from "./pages/WritePost/write";
import Login from "./pages/Login/signin";
import Signup from "./pages/Register/signup";
import Logout from "./pages/Logout/logout";
import Update from "./pages/UpdatePost/update";
import DetailView from "./pages/DetailPost/detailpost";
import ErrorPage from "./pages/ErrorPage/errorpage";
import WelcomePage from "./pages/WelcomePage/welcomePage";
const Routes = () => {
  return (
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
        <WelcomePage path="/welcomePage" />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
};

export default Routes;
