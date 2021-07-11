import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"

const Profile = () => {
    const {state,dispatch}=useContext(UserContext)
    const [myPosts,setMyPosts]=useState([])
    useEffect(()=>{
        fetch('/post/my-post',{
            method:'get',
            headers:{
                authorization:'Bearer '+localStorage.getItem('token')
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setMyPosts(data.myPost)
        })
    },[])
    return (
        <div className="profile-container" style={{ margin: "30px auto",width:'60%'}}>
            <div id="profile-box">
                <div>
                    <img className="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU" alt="" />
                </div>
                <div>
                    <h4>Varun</h4>
                    <div id="profile-info">
                        <div>{myPosts.length} posts</div>
                        <div>40 followers</div>
                        <div>40 followings</div>
                    </div>

                </div>
            </div>
            <hr />
                <div id="post-container">
                    {
                        myPosts.map((item,index)=>{
                            return <img key={index}className="post-image" src={item.photo} alt={item.title} />
                        })
                    }
                </div>
            </div>
    )
}

export default Profile