const Profile = () => {
    return (
        <div className="profile-container" style={{ margin: "30px auto",width:'60%'}}>
            <div id="profile-box">
                <div>
                    <img className="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU" alt="" />
                </div>
                <div>
                    <h4>Varun Kumar</h4>
                    <div id="profile-info">
                        <div>40 posts</div>
                        <div>40 followers</div>
                        <div>40 followings</div>
                    </div>

                </div>
            </div>
            <hr />
                <div id="post-container">
                    <img className="post-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrpYFFuYscpPd13yOv-elTXnb0HUZ_RfwjXQ&usqp=CAU" alt="" />
                    <img className="post-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrpYFFuYscpPd13yOv-elTXnb0HUZ_RfwjXQ&usqp=CAU" alt="" />
                    <img className="post-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrpYFFuYscpPd13yOv-elTXnb0HUZ_RfwjXQ&usqp=CAU" alt="" />
                    <img className="post-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrpYFFuYscpPd13yOv-elTXnb0HUZ_RfwjXQ&usqp=CAU" alt="" />  
                </div>
            </div>
    )
}

export default Profile