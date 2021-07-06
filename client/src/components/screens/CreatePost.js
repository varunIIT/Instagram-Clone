const CreatePost = () => {
    return (
        <div className="card createPost-card">
            <div className="input-field">
                <input id="title" type="text"></input>
                <label for="title">Title</label>
            </div>

            <div className="input-field">
                <input id="body" type="text"></input>
                <label for="body">Description</label>
            </div>
            
            <div className="file-field input-field">
                <div className="btn  blue lighten-1">
                    <span>Upload Image</span>
                    <input type="file"></input>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light  blue lighten-1">Submit Post</button>
        </div>
    )
}

export default CreatePost