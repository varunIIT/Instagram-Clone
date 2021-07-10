import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import M from 'materialize-css'
const Home = () => {
    const { state, dispatch } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        //fectching all posts to display all into frontend
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
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        M.AutoInit();
    }, [posts])
    //function to like/unlike a post
    const likeUnlike = (postId) => {
        fetch(`/post/like-unlike/${postId}`, {
            method: 'PATCH',//'patch' does not work here
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                const updatedPosts = posts.map(item => {
                    if (item._id == data._id) {
                        return data
                    }
                    else {
                        return item
                    }
                })
                setPosts(updatedPosts)
            })
            .catch(err => {
                console.log(err)
            })
    }
    //function to comment a post
    const commentFun = (postId, text) => {
        fetch(`/comment/create/${postId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                text
            })
        })
            .then(res => res.json())
            .then(data => {
                //data is an object with key post and value required post object
                const updatedPosts = posts.map(item => {
                    if (item._id == data.post._id) {
                        return data.post
                    }
                    else {
                        return item
                    }
                })
                console.log(updatedPosts)
                setPosts(updatedPosts)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="home">
            {posts.map((item, index) => {
                return (
                    <div className="card home-card" key={index}>
                        <h5 style={{ margin:'4px 4px', fontWeight: '500' }}>{item.user.name}</h5>
                        <div className="card-image">
                            <img src={item.photo} alt="" />
                        </div>
                        <div className="card-content">
                            {
                                item.likedBy.includes(state._id)
                                    ? <i className="material-icons red-text" onClick={() => { likeUnlike(item._id) }} style={{ cursor: 'pointer' }}>favorite</i>
                                    : <i className="material-icons" onClick={() => { likeUnlike(item._id) }} style={{ cursor: 'pointer' }}>favorite_border</i>
                            }
                            <br /><b>{item.likedBy.length} likes</b>
                            <h6 style={{ fontWeight: '560' }}>{item.title}</h6>
                            <p>{item.body}</p>
                            
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                commentFun(item._id, e.target[0].value)
                            }}>
                                <input placeholder="comment here..." type="text" ></input>
                            </form>

                            <div data-target={`model-${index}`} class="modal-trigger"style={{fontWeight:500}} >View all {item.comments.length} comments!</div>

                            <div id={`model-${index}`} class="modal">
                            <h5 style={{fontFamily: 'Grand Hotel, cursive'}}>Recent Comments</h5>
                                <hr style={{margin:0}}/>
                                <div class="modal-content" style={{padding:'10px'}}>
                                    <ul class="collection" style={{margin:0}}>
                                       {item.comments.map((comment)=>{
                                            return <li class="collection-item"><div><b><i>{comment.user}</i></b></div><div>{comment.text}</div></li>
                                       })}
                                    </ul>
                                </div>
                            </div>


                        </div>
                    </div>
                )
            })}
        </div>

    )

}

export default Home