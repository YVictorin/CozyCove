import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home"
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Explore from "./pages/Explore";
import Products from "./pages/Products";
import Games from "./pages/Games";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
          <Route path="products" element={<Products />} />
          <Route path="games" element={<Games />} />
          <Route path="explore" element={<Explore />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
