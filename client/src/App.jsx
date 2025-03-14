import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home"
import Account from "./pages/Account";
import Explore from "./pages/Explore";
import Products from "./pages/Products";
import Games from "./pages/Games";

import Unauthorized from "./components/Unauthorized"
import Admin from "./pages/Admin";
import RequireAuth from "./components/RequireAuth";




function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />}/>
        <Route path="games" element={<Games />}/>
        <Route path="explore" element={<Explore />}/>
        <Route path="unauthorized" element={<Unauthorized/>}></Route>

        {/* Protected Routes */}
            <Route path="admin" element={<Admin/>}/>
        
            <Route path="account" element={<Account />} />
=
        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
