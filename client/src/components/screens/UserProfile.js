import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const UserProfile=()=>{
    const [userPosts,setUserPosts]=useState([])
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(0)
    const {userId}=useParams()
    useEffect(()=>{
        fetch(`/user/profile/${userId}`,{
            method:'get',
            headers:{
                authorization:'Bearer '+localStorage.getItem('token')
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setUserPosts(data.post)
            setUser(data.user)
            setLoading(1)
        })
    },[])
    return(
        <>
        {user&&loading?
         <div className="profile-container" style={{ margin: "30px auto",width:'60%'}}>
         <div id="profile-box">
             <div>
                 <img className="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU" alt="" />
             </div>
             <div>
                 <h4>{user.name}</h4>
                 <div id="profile-info">
                     <div>{userPosts.length} posts</div>
                     <div>40 followers</div>
                     <div>40 followings</div>
                 </div>

             </div>
         </div>
         <hr />
             <div id="post-container">
                 {
                     userPosts.map((item,index)=>{
                         return <img key={index}className="post-image" src={item.photo} alt={item.title} />
                     })
                 }
             </div>
         </div>
        :<h2>Loading...</h2>}
    </>
   
    )
}
export default UserProfile