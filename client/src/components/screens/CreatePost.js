import { useState } from "react"
import M from 'materialize-css'
import { useHistory } from "react-router"
const CreatePost = () => {
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')
    const [image,setImage]=useState('')
    const history=useHistory()
    
    const postDetails=()=>{
        //validating candidate post 
        if(!title||!body||!image){
            return M.toast({html: 'Title/Description/Pic can not be empty!',classes:'red lighten-1 rounded',displayLength:3000})
        }
        //setup to upload file(image)
        const data=new FormData()
        data.append('file',image)
        data.append('upload_preset','insta-clone')
        data.append('cloud_name','imageuploadtocloud')
        fetch('https://api.cloudinary.com/v1_1/imageuploadtocloud/image/upload',{
            method:'post',
            body:data
        })
        .then(res=>res.json())
        .then(data=>{//image uploaded to cloud successfully
            //now create rest post into database by requesting to server
            fetch('/post/create',{
                method:'post',
                headers:{
                   'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title,body,pic:data.url
                })
            })
            .then(res=>res.json())
            .then(data=>{
                //if any errors while creating post from client side i.e by user
                if(data.error){
                    M.toast({html: data.error,classes:'red lighten-1 rounded',displayLength:3000})
                }
                //successful creation of post
                else{
                    M.toast({html:data.success,classes:'green lighten-1 rounded',displayLength:3000})
                    history.push('/')
                }
               
            })
            .catch(err=>{
                console.log(err)
            })
        })
    }
    return (
        <div className="card createPost-card">
            <div className="input-field">
                <input id="title" type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title}></input>
                <label htmlFor="title">Title</label>
            </div>

            <div className="input-field">
                <input id="body" type="text" onChange={(e)=>{setBody(e.target.value)}} value={body}></input>
                <label htmlFor="body">Description</label>
            </div>
            
            <div className="file-field input-field">
                <div className="btn  blue lighten-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}></input>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light  blue lighten-1" onClick={postDetails}>Submit Post</button>
        </div>
    )
}

export default CreatePost