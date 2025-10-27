import React from "react";
import GamePage from "./pages/GamePage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import AccountDetails from "./pages/AccountDetails"
import { Background } from "./components";
function App(){
  return(
    <>
      <Background/>
      {/* <GamePage></GamePage> */}
      {/* <SignUp></SignUp> */}
      {/* <Login></Login> */}
      <AccountDetails></AccountDetails>
    </>
  )
}
export default App;