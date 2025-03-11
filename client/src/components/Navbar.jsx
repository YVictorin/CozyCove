import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <ul className="header">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
      </ul>
    </div>
  );
}
