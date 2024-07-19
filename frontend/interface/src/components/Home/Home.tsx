import './Home.css';
import {useState} from 'react';

export default function Home() {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');

    function handleRequest() {
        console.log('handeling request');
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
    }

    return (
        <div id='homepage'>
          <div id='login_option_holder'>
            <h1>join us</h1>
            <button id='google_signin_option'>google</button>
            <button id='github_signin_option'>github</button>
            <button id='facebook_signin_option'>facebook</button>
            <hr/>
            <form id='login_form'>
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
                <input type="submit" value="join" onClick={handleRequest}/>
            </form>
          </div>
        </div>
    );
}
