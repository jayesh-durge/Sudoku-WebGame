import React from "react";
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import AccountDetails from "./pages/AccountDetails"
import GamePage from "./pages/GamePage"
import {Background} from "./components";

function App(){
  return(
    <div className="w-screen h-screen overflow-hidden">
      <Background/>
      {/* <SignUp></SignUp> */}
      {/* <Login></Login> */}
      {/* <AccountDetails></AccountDetails> */}
      <GamePage></GamePage>
    </div>
  )
}
export default App;