import { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../App"

const Navbar = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    const renderLinks = () => {
        const signOut = () => {
            localStorage.clear()
            dispatch({ type: 'CLEAR' })
            history.push('/sign-in')
            //disabling back button code
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function () {
                window.history.pushState(null, "", window.location.href);
            };
        }
        if (state) {
            return (
                [
                    <li key={1}><Link to="/profile">Profile</Link></li>,
                    <li key={2}><Link to="/create-post">Create Post</Link></li>,
                    <li key={3}><button onClick={signOut} className="btn waves-effect waves-light  red lighten-1">Sign Out</button></li>,

                ]
            )
        }
        else {
            return (
                [
                    <li key={1}><Link to="/sign-in">Sign In</Link></li>,
                    <li key={2}><Link to="/sign-up">Sign Up</Link></li>
                ]
            )
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? '/' : 'sign-in'} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderLinks()}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar