import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Account from "./pages/Account";
import Explore from "./pages/Explore";
import Products from "./pages/Products";
import Games from "./pages/Games";
import SupportBot from "./components/SupportBot";
import VisualSchedule from "./components/VisualSchedule";

import './global.css';
import EmotionDrawing from "./components/game/draw/EmotionDrawing"; // <-- new import

// import './styles/Resource.css';

import Unauthorized from "./components/Unauthorized"
import Admin from "./pages/Admin";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
  ADMIN: "test@gmail.com",
};


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
        
      <Route path="games/emotions-artist" element={<EmotionDrawing/>}></Route>
      
        {/* Protected Routes */}
        <Route path="admin" 
          element={
            <RequireAuth allowedRoles={[ROLES.ADMIN]}>
              <Admin />
            </RequireAuth>
            }
        />
      
        <Route path="account" element={<Account />} />

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;

