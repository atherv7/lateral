import './PassForm.css';

const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

const expandPass = async () => {
  const passTab = document.getElementById('pass_tab')!;
  const closeButton = document.getElementById('close_button')!;
  const passForm = document.getElementById('form_holder')!;
  passTab.style.height = '300vh';
  passTab.style.width = '300vh';
  await sleep(450);
  closeButton.style.display = 'initial';
  passForm.style.display = 'flex';
}

const closePass = async () => {
  const passTab = document.getElementById('pass_tab')!;
  const closeButton = document.getElementById('close_button')!;
  const passForm = document.getElementById('form_holder')!;
  closeButton.style.display = 'none';
  passForm.style.display = 'none'
  await sleep(350);
  passTab.style.height = '0rem';
  passTab.style.width = '0rem';
}

const PassForm:React.FC = () => {
  return (
    <>
      <div id='button_holder'>
        <button onClick={expandPass}>pass</button>
        <div id='pass_tab'>
          <button id='close_button' onClick={closePass}>X</button>
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
