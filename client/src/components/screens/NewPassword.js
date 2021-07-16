import { useState } from "react"
import M from 'materialize-css'
import { useParams } from "react-router"

const NewPassword = () => {
    const {token}=useParams()
    const [password,setPassword]=useState('')
    const postData=()=>{
        fetch('/user/new-password',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                password,
                token
            })
        })
        .then(res=>res.json())
        .then(data=>{
            //if any errors while changing password
            if(data.error){
                M.toast({html: data.error,classes:'red lighten-1 rounded',displayLength:3000})
            }
            //successful password change
            else{
                M.toast({html:data.success,classes:'green lighten-1 rounded',displayLength:3000})
            }
           
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="signIn-container">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <div className="input-field">
                    <input id="password" type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
                    <label htmlFor="password">Enter New Password</label>
                </div>
                <button className="btn waves-effect waves-light  blue lighten-1" onClick={postData}>Change Password!</button>

            </div>
        </div>
    )
}
export default NewPassword