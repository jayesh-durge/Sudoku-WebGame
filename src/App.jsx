import React from "react";
import GamePage from "./pages/GamePage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import AccountDetails from "./pages/AccountDetails"
import ScoreBoard from "./pages/SocreBoard"
import ProfilePage from "./pages/ProfilePage";
import {GameOver,ControlSection,AccessicibilityBar} from "./components";
import {Flame} from "lucide-react"
function App(){
  return(
    <>
      {/* <GamePage></GamePage> */}
      {/* <SignUp></SignUp> */}
      {/* <Login></Login> */}
      {/* <AccountDetails></AccountDetails> */}
      {/* <ScoreBoard></ScoreBoard> */}
      {/* <ProfilePage 
        img={"./../profile.jpg"}
        username={"jayesh durge"}
        level={14}
        rank={12}
        Bio={"word imposiable itself says im possible"}
        self={false}
        Bagdes={[{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1},{text:"supers",icon:<Flame />,id:1}]}
        solvedProblem={13}
        totalProblem={15}
      /> */}
      {/* <GameOver></GameOver> */}
      {/* <ControlSection></ControlSection> */}
      <AccessicibilityBar/>
    </>
  )
}
export default App;