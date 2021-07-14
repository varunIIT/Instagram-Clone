import { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../App"
import M from 'materialize-css'

const Navbar = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {

        M.AutoInit();
    }, [])
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
                    <li key={0}><Link to="/my-followings-posts">My Followings Posts</Link></li>,
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
        <>
            <nav>
            <div className="nav-wrapper white">
                <Link to={state ? '/' : 'sign-in'} className="brand-logo left" style={{marginLeft:'5px'}}>Instagram</Link>
                <Link to="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderLinks()}
                </ul>
            </div>
        </nav>
         <ul className="sidenav" id="mobile-demo">
         {renderLinks()}
       </ul>
        </>
    )
}
export default Navbar