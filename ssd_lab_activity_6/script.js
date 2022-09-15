function dragStartHandler(event) {
  //   e.preventDefault();
  event.dataTransfer.setData('draggedElementId', event.target.id);
  //   console.log(event.target);
}

function dragOverHandler(event) {
  event.preventDefault();
}

function dropHandler(event) {
  event.preventDefault();

  var elementId = event.dataTransfer.getData('draggedElementId');
  event.target.appendChild(document.getElementById(elementId));
}

function validateUserName(textBox) {
  console.log(textBox);
  let regex = new RegExp('^(?=.*[A-Z])(?=.*\\d).+$');
  let serverUserName = document.getElementById('serverUserName');
  let value = serverUserName.value;
  if (regex.test(value)) {
    // console.log('Correct');
    serverUserName.style.border = '';
  } else {
    console.log('incorrect');
    serverUserName.style.border = '5px solid red';
    // serverUserName.se = 'Invalid';
  }
}

function confirmPasswordHandler(event) {
  console.log(event.target.value);
  let originalPassword = document.getElementById('serverPassword').value;
  let confirmPassword = document.getElementById('confirmPassword');
  if (event.target.value != originalPassword) {
    confirmPassword.style.border = '5px solid red';
  } else {
    confirmPassword.style.border = '';
  }
}

function submit(event) {
  event.preventDefault();
  let originalPassword = document.getElementById('serverPassword').value;
  let confirmPassword = document.getElementById('confirmPassword').value;
  let name = document.getElementById('mgrName').value;
  let email = document.getElementById('grpEmail').value;
  let serverUserName = document.getElementById('serverUserName').value;
  let teamLead = document.getElementById('teamLead').value;
  if (
    originalPassword === confirmPassword &&
    name != '' &&
    email != '' &&
    serverUserName != '' &&
    teamLead != ''
  ) {
    let result = {
      name,
      email,
      serverUserName,
      teamLead,
    };
    alert(JSON.stringify(result));
  }
}

function toggleMode() {
  var element = document.body;
  element.classList.toggle('dark-mode');
}

window.addEventListener('keypress', (e) => {
  if (e.ctrlKey && e.code == 'KeyM') {
    toggleMode();
  }
});
