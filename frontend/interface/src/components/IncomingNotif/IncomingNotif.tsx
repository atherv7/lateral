import './IncomingNotif.css';
import React, { useEffect, useRef, useState } from 'react';

interface IncomingNotifProps {
  sender: string,
  fileName: string
}

const expandNotif = (event:React.MouseEvent<HTMLElement>, open:boolean) => {
  const notif = (event.target as any);
  notif.style.height = (open) ? '30vh' : '15vh';
};

const IncomingNotif:React.FC<IncomingNotifProps> = ({sender, fileName}) => {
  const [open, changeOpen] = useState(true);
  const fileNameHeaderRef = useRef<HTMLHeadingElement>(null);
  const senderHeaderRef = useRef<HTMLHeadingElement>(null);
  const notifHolderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const recenterNotif = () => {
      if(fileNameHeaderRef.current &&
         senderHeaderRef.current &&
         notifHolderRef.current) {
           const combinedWidthHeader = fileNameHeaderRef.current.offsetWidth +
                                       senderHeaderRef.current.offsetWidth;
           let widthOfHolder = notifHolderRef.current.offsetWidth;
           widthOfHolder -= (widthOfHolder/10);
           const marginRight = widthOfHolder - combinedWidthHeader;
           fileNameHeaderRef.current.style.marginRight = String(marginRight) + 'px';
         }
    }
    recenterNotif();
    window.addEventListener('resize', recenterNotif);
  },[]);

  return (
    <div onClick={(event:React.MouseEvent<HTMLElement>) => {
        changeOpen(!open);
        expandNotif(event, open);
      }} ref={notifHolderRef} id='notif_holder'>
      <h1 ref={fileNameHeaderRef} id='fileName_header'>{fileName}</h1>
      <h1 ref={senderHeaderRef} id='sender_header'>{sender}</h1>
    </div>
  )
};

export default IncomingNotif;
