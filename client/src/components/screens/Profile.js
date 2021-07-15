import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import M from 'materialize-css'

const Profile = () => {

    const { state, dispatch } = useContext(UserContext)
    const [myPosts, setMyPosts] = useState([])
    const [user, setUser] = useState(null)
    const [image,setImage]=useState('')
    const [loading, setLoading] = useState(0)
    useEffect(() => {
        fetch('/user/profile-info', {
            method: 'get',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setMyPosts(data.myPost)
                setUser(data.user)
                setLoading(1)
            })
    }, [])
    useEffect(() => {
        M.AutoInit();
    }, [loading])
    return (
        <>
            {state && loading ?
                <div className="profile-container" style={{ margin: "30px auto", width: '60%' }}>
                    <div id="profile-box">
                        <div>
                            <img className="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU" alt="" />
                            <div style={{ display: 'flex', justifyContent: 'center', width: '65%', minWidth: '80px' }}><button data-target="modal1" class="modal-trigger btn-small waves-effect waves-light  blue lighten-1">Update Pic</button></div>

                            <div id="modal1" class="modal">
                            <h4 style={{ fontFamily: 'Grand Hotel, cursive', margin: '5px 5px' }}>Update Profile Pic</h4>
                                
                                <div class="modal-content" style={{padding: '20px 10px'}}>
                                    <div className="file-field input-field" style={{margin:0}}>
                                        <div className="btn  blue lighten-1">
                                            <span>Upload Image</span>
                                            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }}></input>
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="modal-close btn waves-effect blue lighten-1">Update</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ margin: 0 }}>{state.name}</h4>
                            <h5>{state.email}</h5>
                            <div id="profile-info">
                                <div style={{ marginRight: '10px' }}>{myPosts.length} posts</div>
                                <div style={{ marginRight: '10px' }}>{user.followers.length} followers</div>
                                <div>{user.followings.length} followings</div>
                            </div>

                        </div>
                    </div>

                    <hr />
                    <div id="post-container">
                        {
                            myPosts.map((item, index) => {
                                return <img key={index} className="post-image" src={item.photo} alt={item.title} />
                            })
                        }
                    </div>
                </div>
                : <h2>Loading...</h2>}
        </>

    )
}

export default Profile