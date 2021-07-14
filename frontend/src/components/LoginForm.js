import React from 'react'

function LoginForm() {
    return (
        <form>
            <div className="form-inner">
                <h2>Login</h2>
                {/*ERROR*/}
                <div className="form-group">
                    <label htmlFor="nam">Name</label>
                    <input type="text" name="name" id="name"/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <input type="submit" value="Login"/>
            </div>
        </form>    
    )
}
export default LoginForm
