import React from "react";
import {SignUp,Login,AccountDetails, GamePage,ProfilePage } from "./pages";
import {Background} from "./components";
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom";
function App(){
  const router=createBrowserRouter(
      createRoutesFromElements(
        <Route>
          <Route path='/' element={<Login/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Sign-Up' element={<SignUp/>}/>
          <Route path='/Account-Details' element={<AccountDetails/>}/>
          <Route path='/Game-On' element={<GamePage/>}>
              <Route path="Profile" element={<ProfilePage/>}/>
              <Route path="Player" element={<ProfilePage self={false} />}/>
          </Route>
        </Route>
      )
  )
  return(
    <div className="w-screen h-screen overflow-hidden">
      <Background/>
      <RouterProvider router={router}/>
    </div>
  )
}
export default App;