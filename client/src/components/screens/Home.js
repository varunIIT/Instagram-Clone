import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"

const Home = () => {
    const {state,dispatch}=useContext(UserContext)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('/post/all-post', {
            method: 'get',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                    setPosts(data.allPost)
            })
    }, [])
    const likeUnlike=(postId)=>{
        fetch(`/post/like-unlike/${postId}`,{
            method:'PATCH',//'patch' does not work here
            headers:{
                authorization:'Bearer '+localStorage.getItem('token')
            }
        })
        .then(res=>res.json())
        .then(data=>{
            const updatedPosts=posts.map(item=>{
                if(item._id==data._id){
                    return data
                }
                else{
                    return item
                }
            })
            setPosts(updatedPosts)
        })
        
    }
    return (
        <div className="home">
            {posts.map((item,index) => {
                return (
                    <div className="card home-card" key={index}>
                        <h5 style={{marginLeft:'10px'}}>{item.user.name}</h5>
                        <div className="card-image">
                            <img src={item.photo} alt="" />
                        </div>
                        <div className="card-content">
                            {/* <i className="material-icons red-text">favorite</i> */}
                            {  
                                item.likedBy.includes(state._id)
                                ?<i className="material-icons red-text" onClick={()=>{likeUnlike(item._id)}} style={{cursor:'pointer'}}>favorite</i>
                                : <i className="material-icons" onClick={()=>{likeUnlike(item._id)}} style={{cursor:'pointer'}}>favorite_border</i>
                            }
                            <br/><b>{item.likedBy.length} likes</b>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input placeholder="comment here..." type="text" ></input>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default Home