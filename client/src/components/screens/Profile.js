import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"

const Profile = () => {
    const {state,dispatch}=useContext(UserContext)
    const [myPosts,setMyPosts]=useState([])
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(0)
    useEffect(()=>{
        fetch('/user/profile-info',{
            method:'get',
            headers:{
                authorization:'Bearer '+localStorage.getItem('token')
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setMyPosts(data.myPost)
            setUser(data.user)
            setLoading(1)
        })
    },[])
    return (
        <>
            {state&&loading?
             <div className="profile-container" style={{ margin: "30px auto",width:'60%'}}>
             <div id="profile-box">
                 <div>
                     <img className="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU" alt="" />
                 </div>
                 <div>
                     <h4 style={{margin:0}}>{state.name}</h4>
                     <h5>{state.email}</h5>
                     <div id="profile-info">
                         <div style={{marginRight:'10px'}}>{myPosts.length} posts</div>
                         <div style={{marginRight:'10px'}}>{user.followers.length} followers</div>
                         <div>{user.followings.length} followings</div>
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
            :<h2>Loading...</h2>}
        </>
       
    )
}

export default Profile