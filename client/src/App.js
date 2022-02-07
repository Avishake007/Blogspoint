import { useReducer, createContext } from "react";
//Local Import
import Navbar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import { initialState, reducer } from "../src/reducer/UseReducer";
import Routes from "./routes";
// ContextAPI
export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Routes/>
      <Footer />
    </UserContext.Provider>
  );
}
export default App;
