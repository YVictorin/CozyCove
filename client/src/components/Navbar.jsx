import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/games">Games</Link></li>
                <li><Link to="Products">Products</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/explore">Explore More</Link></li>
            </ul>
        </div>
    )
}