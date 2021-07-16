import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import M from 'materialize-css'
import { Link } from "react-router-dom"

const Home = () => {
    const { state, dispatch } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [inpComment, setInpComment] = useState('')
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
    const likeUnlikePost = (postId) => {
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
    const createComment = (postId, text) => {
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

                setPosts(updatedPosts)
                setInpComment('')
                //toast message display
                M.toast({ html: 'Commented Successfully!', classes: 'green lighten-1 rounded', displayLength: 3000 })

            })
            .catch(err => {
                console.log(err)
            })
    }
    //deleting single post by user who created it
    const deletePost = (postId) => {
        fetch(`/post/delete/${postId}`, {
            method: 'delete',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                const updatedPosts = posts.filter(item => {
                    return item._id.toString() != postId
                })
                setPosts(updatedPosts)
                //toast message display
                M.toast({ html: 'Post deleted Successfully!', classes: 'green lighten-1 rounded', displayLength: 3000 })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //deleting single comment by user who created it
    const deleteComment = (commentId) => {
        fetch(`/comment/delete/${commentId}`, {
            method: 'delete',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                const updatedPosts = posts.map(item => {
                    if (item._id == data.post._id) {
                        return data.post
                    }
                    else {
                        return item
                    }
                })
                setPosts(updatedPosts)
                //toast message display
                M.toast({ html: 'Comment Deleted Successfully!', classes: 'green lighten-1 rounded', displayLength: 3000 })
            })
    }
    //liking/unliking single comment
    const likeUnlikeComment = (commentId) => {
        fetch(`/comment/like-unlike/${commentId}`, {
            method: 'PATCH',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                const updatedPosts = posts.map(item => {
                    if (item._id == data.post._id) {
                        return data.post
                    }
                    else {
                        return item
                    }
                })
                setPosts(updatedPosts)
                //toast message display
                M.toast({ html: `${data.isLiked} Comment Successfully!`, classes: 'green lighten-1 rounded', displayLength: 3000 })
            })
    }
    return (
        <div className="home">
            {posts.map((item, index) => {
                return (
                    <div className="card home-card" key={index}>
                        <h5 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 5px', margin: 0, fontWeight: '500' }}>
                            <Link to={state._id == item.user._id ? '/profile' : `/others-profile/${item.user._id}`}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={item.user.profilePic} alt="" style={{ height: '40px', borderRadius: '50%', marginRight: '1px' }} />
                                    {item.user.name}
                                </div>
                            </Link>
                            {item.user._id == state._id && <i className="material-icons" style={{ float: 'right', cursor: 'pointer' }} onClick={() => { deletePost(item._id) }}>delete</i>}
                        </h5>

                        <div className="card-image">
                            <img src={item.photo} alt="" />
                        </div>
                        <div className="card-content">
                            {
                                item.likedBy.includes(state._id)
                                    ? <i className="material-icons red-text" onClick={() => { likeUnlikePost(item._id) }} style={{ cursor: 'pointer' }}>favorite</i>
                                    : <i className="material-icons" onClick={() => { likeUnlikePost(item._id) }} style={{ cursor: 'pointer' }}>favorite_border</i>
                            }
                            <br /><b>{item.likedBy.length} likes</b>
                            <h6 style={{ fontWeight: '560' }}>{item.title}</h6>
                            <p>{item.body}</p>

                            <form onSubmit={(e) => {
                                e.preventDefault()
                                createComment(item._id, inpComment)
                            }}>
                                <input placeholder="comment here..." type="text" value={inpComment} onChange={(e) => { setInpComment(e.target.value) }}></input>
                            </form>


                            <div data-target={`model-${index}`} className="modal-trigger" style={{ fontWeight: 500, cursor: 'pointer' }} >View all {item.comments.length} comments!</div>

                            <div id={`model-${index}`} className="modal">
                                <h4 style={{ fontFamily: 'Grand Hotel, cursive', margin: '5px 5px' }}>Recent Comments</h4>
                                <hr style={{ margin: 0 }} />
                                <div className="modal-content" style={{ padding: '10px' }}>
                                    <ul className="collection" style={{ margin: 0 }}>
                                        {item.comments.map((comment, index) => {
                                            return <li key={index} className="collection-item">
                                                <div>
                                                    <b>
                                                        <Link to={state._id == comment.user._id ? '/profile' : `/others-profile/${comment.user._id}`}>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <img src={comment.user.profilePic} alt="" style={{ height: '25px', borderRadius: '50%', marginRight: '1px' }} />
                                                                {comment.user.name}
                                                            </div>
                                                        </Link>
                                                    </b>
                                                    {
                                                        comment.likedBy.includes(state._id)
                                                            ? <i className="material-icons red-text" onClick={() => { likeUnlikeComment(comment._id) }} style={{ cursor: 'pointer', float: 'right' }}>favorite</i>
                                                            : <i className="material-icons" onClick={() => { likeUnlikeComment(comment._id) }} style={{ cursor: 'pointer', float: 'right' }}>favorite_border</i>
                                                    }
                                                </div>
                                                <div>{comment.text}
                                                </div>
                                                <div style={{marginTop:'2px'}}><b style={{ color: 'grey' }}>{comment.likedBy.length} likes</b>
                                                    {comment.user._id == state._id && <i className="material-icons" style={{ float: 'right', cursor: 'pointer' }} onClick={() => { deleteComment(comment._id) }}>delete</i>}
                                                </div>
                                            </li>
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