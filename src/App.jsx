import React, { useState,useEffect,lazy,Suspense } from 'react'
import { Routes, Route } from "react-router-dom"
import { useAuth } from "./contexts"
import * as Pages from "./pages"
import "./App.scss"

const App = () => {

    const { user } = useAuth()

  return (
    <Suspense fallback={ <h1 id='loading-header'>Loading...</h1> }>
        <Routes>
            <Route path='/'>
                <Route index element={<Pages.Home />} />
                <Route path="play" element={ <Pages.Questions/> } />
                <Route path="lose" element={ <Pages.Lose/> }/>
                <Route path="*" element={<Pages.NotFound/>}/>
            </Route>
        </Routes>
    </Suspense>
  )
}

export default App