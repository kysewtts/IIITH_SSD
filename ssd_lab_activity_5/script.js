function submitBtn(e) {
  window.location.href = 'studentRecords.html';
}

let rowColor = ['white', 'lightblue'];
let currentColor = 0;

function addDetail() {
  let name = document.getElementById('name').value;
  let roll = document.getElementById('roll').value;
  if (name != '' && roll != '') {
    let tableBody = document
      .getElementById('studentTable')
      .getElementsByTagName('tbody')[0];
    let row = tableBody.insertRow();
    let rollCell = row.insertCell(0);
    let nameCell = row.insertCell(1);
    rollCell.innerHTML = roll;
    nameCell.innerHTML = name;
    row.style.backgroundColor = rowColor[currentColor % 2];
    currentColor += 1;
    tableBody.appendChild(row);
    document.getElementById('name').value = '';
    document.getElementById('roll').value = '';
  }
}

function deleteDetail() {
  let tableBody = document
    .getElementById('studentTable')
    .getElementsByTagName('tbody')[0];
  tableBody.deleteRow(-1);
}
