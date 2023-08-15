let groupsFilter = document.querySelector( ".groups-filter" );
let groupsSelect = document.querySelector( ".groups-select" );
let studentForm = document.querySelector( ".student-form" );
let saveBtn = document.querySelector( ".save-btn" );
let studentModal = document.querySelector( "#studentModal" );
let studentsTableBody = document.querySelector( ".students-table tbody" );
let openModalBtn = document.querySelector( ".open-modal-btn" );
let studentSearch = document.querySelector( ".student-search" );
let grRegion = document.querySelector( ".group-region" )
let MdRegion = document.querySelector( ".groups-region" )

groupsFilter.innerHTML = `<option value="all">Groups</option>`;

groups.map( ( gr ) => {
  groupsFilter.innerHTML += `<option value="${gr}">${gr}</option>`;
  groupsSelect.innerHTML += `<option value="${gr}">${gr}</option>`;
} );

grRegion.innerHTML = `<option value="all">Region</option>`;

region.map( ( rg ) => {
  grRegion.innerHTML += `<option value="${rg}">${rg}</option>`;
  MdRegion.innerHTML += `<option value="${rg}">${rg}</option>`;
} );

let studentsJson = localStorage.getItem( "students" );

let students = JSON.parse( studentsJson ) || [];

let selected = null;

let search = "";

let group = "all";

let regionSt = "all"
studentForm.addEventListener( "submit", function ( e ) {
  e.preventDefault();
  let elements = this.elements;

  let student = {
    firstName: elements.firstName.value,
    lastName: elements.lastName.value,
    group: elements.group.value,
    doesWork: elements.doesWork.checked,
    Grregion: elements.Grregion.value,

  };

  if ( this.checkValidity() ) {
    bootstrap.Modal.getInstance( studentModal ).hide();
    if ( selected == null ) {
      students.push( student );
    } else {
      students[ selected ] = student;
    }
    localStorage.setItem( "students", JSON.stringify( students ) );
    getStudents();
  } else {
    this.classList.add( "was-validated" );
  }

  console.log( students );
} );

function getStudentRow( { firstName, lastName, group, Grregion, doesWork }, i ) {
  return `
    <tr>
      <th scope="row">${i + 1}</th>
      <td scope="col">${firstName}</td>
      <td scope="col">${lastName}</td>
      <td scope="col">${group}</td>
      <td scope="col">${Grregion}</td>
      <td scope="col">${doesWork ? "Ha" : "Yo'q"}</td>
      <td scope="col" class="text-end">
        <button onClick="editStudent(${i})" class="btn btn-primary mr-3" data-bs-toggle="modal" data-bs-target="#studentModal">Edit</button>
        <button class="btn btn-danger" onClick="deleteStudent(${i})">Delete</button>
      </td>
    </tr>
  `;
}

function getStudents() {
  let results = students.filter(
    ( student ) =>
      student.firstName.toLowerCase().includes( search ) ||
      student.lastName.toLowerCase().includes( search )
  );

  if ( group !== "all" ) {
    results = results.filter( ( student ) => student.group === group );
  }
  if ( regionSt !== "all" ) {
    results = results.filter( ( student ) => student.Grregion === regionSt );
  }

  studentsTableBody.innerHTML = "";

  if ( results.length === 0 ) {
    studentsTableBody.innerHTML = "No students";
  } else {
    results.map( ( student, i ) => {
      studentsTableBody.innerHTML += getStudentRow( student, i );
    } );
  }
}

getStudents();

function editStudent( i ) {
  selected = i;
  saveBtn.textContent = "Save student";

  let { firstName, lastName, group, Grregion, doesWork } = students[ i ];
  let elements = studentForm.elements;
  elements.firstName.value = firstName;
  elements.lastName.value = lastName;
  elements.group.value = group;
  elements.Grregion.value = Grregion;
  elements.doesWork.checked = doesWork;

}

openModalBtn.addEventListener( "click", () => {
  selected = null;
  saveBtn.textContent = "Add student";

  let elements = studentForm.elements;
  elements.firstName.value = "";
  elements.lastName.value = "";
  elements.group.value = "REACT N11";
  elements.Grregion.value = "Toshkent"
  elements.doesWork.checked = false;
} );

function deleteStudent( i ) {
  let isDelete = confirm( "Do you want to delete this student ?" );
  if ( isDelete ) {
    students.splice( i, 1 );
    localStorage.setItem( "students", JSON.stringify( students ) );
    getStudents();
  }
}

studentSearch.addEventListener( "keyup", function () {
  search = this.value.trim().toLowerCase();
  getStudents();
} );

groupsFilter.addEventListener( "change", function () {
  group = this.value;
  getStudents();
} );

grRegion.addEventListener( "change", function () {
  regionSt = this.value;
  getStudents();
} );




let mdOpen = document.querySelector( "header button.open-modal-btn" )
let ModalOpen = document.querySelector( "" )
let Body = document.querySelector( "body" )
let darkBtn = document.querySelector( ".dark-mode button" );
let header = document.querySelector( "header" )
function darkMode() {
  document.body.classList.toggle( "light-mode" );
  header.classList.toggle( "dark" )
}