import { useState } from "react"
import M from 'materialize-css'

const ResetPassword = () => {
    const [email,setEmail]=useState('')
    const postData=()=>{
        //validating email format
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            return  M.toast({html: 'Invalid Email!',classes:'red lighten-1 rounded',displayLength:3000})
        }
        //if valid email then make request to server to sign in current user
        fetch('/user/reset-password',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email
            })
        })
        .then(res=>res.json())
        .then(data=>{
            //if any errors while reset password from client side i.e by user
            if(data.error){
                M.toast({html: data.error,classes:'red lighten-1 rounded',displayLength:3000})
            }
            //successful email sent 
            else{
                M.toast({html:'Please check your email!',classes:'green lighten-1 rounded',displayLength:3000})
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
                    <input id="email" type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
                    <label htmlFor="email">Email</label>
                </div>
                <button className="btn waves-effect waves-light  blue lighten-1" onClick={postData}>Reset Password</button>

            </div>
        </div>
    )
}
export default ResetPassword