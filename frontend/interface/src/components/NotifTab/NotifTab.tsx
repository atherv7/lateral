import './NotifTab.css';
import React from 'react';
import IncomingNotif from './../IncomingNotif/IncomingNotif';

const NotifTab:React.FC = () => {
  return (
    <div id="notif_tab">
      <IncomingNotif sender="john" fileName="todo.txt"/>
      <IncomingNotif sender="apple" fileName="schedule.txt"/>
      <IncomingNotif sender="pear" fileName="resume.txt"/>
      <IncomingNotif sender="pineapple" fileName="offer.txt"/>
    </div>
  );
};

export default NotifTab;
