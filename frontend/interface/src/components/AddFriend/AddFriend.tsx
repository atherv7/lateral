import './AddFriend.css'; 
import { useState, useEffect } from 'react'; 

const AddFriend:React.FC = () => {
    const [friendUsername, changeFriendUsername] = useState(''); 
    useEffect(() => {
        const closeButton = document.getElementById('friend_close_button')!; 
        const friendTab = document.getElementById('friend_list')!; 
        const expandedInfo = document.getElementById('expanded_information')!; 

        closeButton.addEventListener('click', (event:MouseEvent) => {
            event.stopPropagation(); 
            expandedInfo.style.display = 'none';
            friendTab.style.height = '8vh'; 
            friendTab.style.width = '12vw'; 
            friendTab.style.bottom = '1rem'; 
            friendTab.style.left = '1rem'; 
        }); 
    }); 

    const expandFriendTab = () => {
        const friendTab = document.getElementById('friend_list')!; 
        const expandedInfo = document.getElementById('expanded_information')!; 

        friendTab.style.height = '100vh'; 
        friendTab.style.width = '30vw'; 
        friendTab.style.bottom = '0'; 
        friendTab.style.left = '0'; 
        expandedInfo.style.display = 'flex'; 
    }; 

    const sendFriendRequest = async () => {
        const response = await window.api.friendRequest(friendUsername);
        if(response.success) {
            console.log('friend request successfully sent'); 
        }
        else {
            console.log('there was an error sending friend request'); 
        }
    }; 

    return (
        <div onClick={expandFriendTab} id='friend_list'>
            <h1>friends</h1>
            <div id='expanded_information'>
                <div id='friend_req_form'>
                    <input type="text" 
                           name="friend_username" 
                           id="friend_add" 
                           placeholder="enter your friend's username" 
                           onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                            changeFriendUsername(event.target.value); 
                           }}/>
                    <button id='friend_req_submit' onClick={sendFriendRequest}>send</button>
                </div>
                <div id='current_friends_requests'></div>
                <div id='friend_close_button'>close</div>
            </div>
        </div>
    ); 
}; 

export default AddFriend; 