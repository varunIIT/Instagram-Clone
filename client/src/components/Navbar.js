import { useContext, useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../App"
import M from 'materialize-css'

const Navbar = () => {
    const history = useHistory()
    const searchModal=useRef(null)
    const { state, dispatch } = useContext(UserContext)
    const [search, setSearch] = useState('')
    const [user, setUser] = useState([])
    useEffect(() => {

        M.AutoInit();
    }, [])
    const fetchUsers = (query) => {
        fetch('/user/search', {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                query
            })
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.user)
            })
    } 
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
                    <li key={0}><i data-target="modal2" className="large material-icons modal-trigger" style={{ color: "black", cursor: 'pointer' }}>search</i></li>,
                    <li key={1}><Link to="/profile">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={state.profilePic} alt="" style={{ height: '35px', borderRadius: '50%', marginRight: '1px' }} />
                            {state.name}
                        </div>
                    </Link></li>,
                    <li key={2}><Link to="/create-post">Create Post</Link></li>,
                    <li key={3}><Link to="/my-followings-posts">My Followings Posts</Link></li>,
                    <li key={4}><button onClick={signOut} className="btn waves-effect waves-light  red lighten-1">Sign Out</button></li>

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
                    <Link to={state ? '/' : 'sign-in'} className="brand-logo left" style={{ marginLeft: '5px' }}>Instagram</Link>
                    <Link to="#" data-target="mobile-demo" className="sidenav-trigger right"><i className="material-icons">menu</i></Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {renderLinks()}
                    </ul>
                </div>
            </nav>
            <div id="modal2" className="modal"ref={searchModal}>
                    <div className="modal-content">
                       <div>
                            <input
                                type="text"
                                placeholder="Search Users"
                                onChange={(e) => fetchUsers(e.target.value)}
                            />
                       </div>
                        <ul className="collection" >
                            {user.map(item=>{
                                return  <li className="collection-item" onClick={()=>{
                                    const instance=M.Modal.getInstance(searchModal.current)
                                    instance.close()
                                }}><Link to={state._id == item._id ? '/profile' : `/others-profile/${item._id}`}>{item.email}</Link></li>
                            })}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close btn waves-effect waves-light  blue lighten-1">close</button>
                    </div>
                </div>

            <ul className="sidenav" id="mobile-demo">
                {renderLinks()}
            </ul>
        </>
    )
}
export default Navbar