import './PassForm.css';
import './PassFormSmaller.css'; 
import { useEffect, useState } from 'react'; 
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
  closeButton.style.display = 'none';
  passForm.style.display = 'none';
  await sleep(350);
  passTab.style.height = '0rem';
  passTab.style.width = '0rem';
}

const PassForm:React.FC = () => {
  const [filePath, setFilePath] = useState<string>('');

  const selectFile = async () => {
    const result = await window.api.selectFile(); 
    if(result && result.length > 0) {
      setFilePath(result[0]); 
    }
  }

  useEffect(() => {
    const passTab = document.getElementById('pass_tab')!; 
    const closeButton = document.getElementById('close_button')!; 
    const passForm = document.getElementById('form_holder')!; 

    document.getElementById('button_holder')!.addEventListener('click', async () => {
      await expandPass(passTab, closeButton, passForm); 
    }); 

    closeButton.addEventListener('click', async (event:MouseEvent) => {
      event.stopPropagation(); 
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
            <div id='information_holder'>
              <div id='who_and_message'>
                <input type="text" 
                       name='username_input' 
                       placeholder="friend's username or your own" 
                       id="username_input" />
                <textarea name="message" 
                          id="message" 
                          placeholder='enter a description or message'></textarea>
              </div>
              <div id='file_select'>
                <button onClick={selectFile}>select</button>
                {filePath && <p>Selected File: {filePath}</p>}
              </div>
            </div>
            <div id='submit_button_holder'><h1>send</h1></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PassForm;
