import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../App"
const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const renderLinks = () => {
        if (state) {
            return (
                [
                    <li><Link to="/profile">Profile</Link></li>,
                    <li><Link to="/create-post">Create Post</Link></li>
                ]
            )
        }
        else {
            return (
                [
                    <li><Link to="/sign-in">Sign In</Link></li>,
                    <li><Link to="/sign-up">Sign Up</Link></li>
                ]
            )
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state?'/':'sign-in'} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderLinks()}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar