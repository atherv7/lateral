import './PassForm.css';
import { useEffect } from 'react'; 
const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

const expandPass = async (
  passTab:HTMLElement, 
  closeButton:HTMLElement, 
  passForm:HTMLElement 
) => {
  passTab.style.height = '300vh';
  passTab.style.width = '300vh';
  await sleep(450);
  closeButton.style.display = 'initial';
  passForm.style.display = 'flex';
}

const closePass = async (
  passTab:HTMLElement, 
  closeButton:HTMLElement, 
  passForm:HTMLElement
) => {
  closeButton.style.display = 'none !important';
  passForm.style.display = 'none !important';
  await sleep(350);
  passTab.style.height = '0rem';
  passTab.style.width = '0rem';
}

const PassForm:React.FC = () => {

  useEffect(() => {
    const passTab = document.getElementById('pass_tab')!; 
    const closeButton = document.getElementById('close_button')!; 
    const passForm = document.getElementById('form_holder')!; 

    document.getElementById('button_holder')!.addEventListener('click', async () => {
      await expandPass(passTab, closeButton, passForm); 
    }); 

    closeButton.addEventListener('click', async () => {
      await closePass(passTab, closeButton, passForm); 
    }); 

  }); 

  return (
    <>
      <div id='button_holder'>
        <h1>pass</h1>
        <div id='pass_tab'>
          <button id='close_button'>X</button>
          <div id='form_holder'>
            <div id='to_send_select'></div>
            <span id='vertical_rule'></span>
            <div id='files_select'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PassForm;
