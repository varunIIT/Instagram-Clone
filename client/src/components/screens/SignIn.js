const SignIn = () => {
    return (
        <div className="signIn-container">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <div className="input-field">
                    <input id="email" type="email"></input>
                    <label for="email">Email</label>
                </div>
                <div className="input-field">
                    <input id="password" type="password"></input>
                    <label for="password">Password</label>
                </div>
                <button class="btn waves-effect waves-light  blue lighten-1">Sign In</button>

            </div>
        </div>
    )
}
export default SignIn