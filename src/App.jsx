import React, { useState,useEffect,lazy,Suspense } from 'react'
import { Routes, Route } from "react-router-dom"
import { useAuth } from "./contexts"
import * as Pages from "./pages"

const App = () => {

    const { user } = useAuth()

  return (
    <Suspense fallback={ <h1 id='loading-header'>Loading...</h1> }>
        <Routes>
            <Route path='/'>
                <Route index element={<Pages.Home />} />
            </Route>
        </Routes>
    </Suspense>
  )
}

export default App