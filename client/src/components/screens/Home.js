import { useEffect, useState } from "react"

const Home = () => {
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
    return (
        <div className="home">
            {posts.map((item,index) => {
                return (
                    <div className="card home-card" key={index}>
                        <h5>{item.user.name}</h5>
                        <div className="card-image">
                            <img src={item.photo} alt="" />
                        </div>
                        <div className="card-content">
                            <i className="material-icons red-text">favorite</i>
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