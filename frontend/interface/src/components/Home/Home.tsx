import './Home.css';
import { useState } from 'react';
import React from 'react';

const Home:React.FC = () => {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');

    async function handleRequest(event:any) {
      event.preventDefault(); 
      const response = await (window as any).api.login([username, password]); 
      console.log(response); 
    }

    return (
        <div id='homepage'>
          <div id='login_option_holder'>
            <h1>join us</h1>
            <button id='google_signin_option'>google</button>
            <button id='github_signin_option'>github</button>
            <button id='facebook_signin_option'>facebook</button>
            <hr/>
            <form id='login_form' onSubmit={event => handleRequest(event)}>
                <input type="text"
                       name="username"
                       onChange={e => changeUsername(e.target.value)}
                       id="username"
                       placeholder='username' />
                <input type="text"
                       name="password"
                       onChange={e => changePassword(e.target.value)}
                       id="password"
                       placeholder='password'/>
                <input type="submit" value="join"/>
            </form>
          </div>
        </div>
    );
};

export default Home;
