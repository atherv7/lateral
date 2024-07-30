import './Main.css';
import PassForm from './../PassForm/PassForm';
import NotifTab from './../NotifTab/NotifTab';
import AddFriend from './../AddFriend/AddFriend'; 
import React from 'react';

const Main:React.FC = () => {
    return (
        <div id="main_page">
          <PassForm/>
          <NotifTab/>
          <AddFriend/>
        </div>
    );
};

export default Main;
