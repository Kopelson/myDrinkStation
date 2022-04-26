import React from "react";
import './style.css';

function Login() {
    return (
        <div>
            <form class="display-form">
                <div class="col-12">
                    <h1>My Drink Station</h1>
                </div>
                <div class="col-8">
                    <label for="username">Username</label><br/>
                    <input id="username" name="username"></input>
                </div>
                <div class="col-8">
                    <label for="password">Password</label><br/>
                    <input id="password" name="password"></input>
                </div>
                <div class="col-12">
                    <button>Sign In</button>
                    <button>Forgot password</button>  
                </div>
            </form>
            
        </div>
    );
}


export default Login;