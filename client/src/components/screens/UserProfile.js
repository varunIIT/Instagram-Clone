import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../App"

const UserProfile = () => {
    const { state, dispatch } = useContext(UserContext)
    const [userPosts, setUserPosts] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(0)
    const { userId } = useParams()

    useEffect(() => {
        fetch(`/user/others-profile/${userId}`, {
            method: 'get',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setUserPosts(data.post)
                setUser(data.user)
                setLoading(1)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const followUnfollow = () => {
        fetch(`/user/follow-unfollow/${userId}`, {
            method: 'PATCH',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.otherUser)

            })
    }
    return (
        <>
            {user && loading ?
                <div className="profile-container" style={{ margin: "30px auto", width: '60%' }}>
                    <div id="profile-box">
                        <div style={{width:'200px'}}>
                            <img className="profile-image" src={user.profilePic} alt="" />
                        </div>
                        <div>
                            
                              <div style={{display:'flex', alignItems:'flex-end'}}>
                              <h4 style={{margin:0,marginRight:'15px'}}> {user.name}</h4>
                                {user.followers.includes(state._id)
                                    ? <button className="btn-small waves-effect waves-light  red lighten-1" onClick={followUnfollow}>Unfollow</button>
                                    : <button className="btn-small waves-effect waves-light  green lighten-1" onClick={followUnfollow}>Follow</button>}
                              </div>
                           
                            <h5>{user.email}</h5>
                            <div id="profile-info">
                                <div style={{marginRight:'10px'}}>{userPosts.length} posts</div>
                                <div style={{marginRight:'10px'}}>{user.followers.length} followers</div>
                                <div>{user.followings.length} followings</div>
                            </div>



                        </div>
                    </div>
                    <hr />
                    <div id="post-container">
                        {
                            userPosts.map((item, index) => {
                                return <img key={index} className="post-image" src={item.photo} alt={item.title} />
                            })
                        }
                    </div>
                </div>
                : <h2>Loading...</h2>}
        </>

    )
}
export default UserProfile