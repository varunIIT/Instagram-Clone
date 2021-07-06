import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <nav>
           <div className="nav-wrapper white">
                <Link to="/" class="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" class="right">
                    <li><Link to="/sign-in">Sign In</Link></li>
                    <li><Link to="/sign-up">Sign Up</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create-post">Create Post</Link></li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar