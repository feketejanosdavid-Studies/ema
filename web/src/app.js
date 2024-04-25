const doc = {
    empBody: document.getElementById('empBody'),
    addButton: document.getElementById('addButton'),
    nameDoc: document.getElementById('name'),
    cityDoc: document.getElementById('city'), 
    salaryDoc: document.getElementById('salary'),
    idDoc: document.getElementById('id')
} 

const state = {
    url: 'http://localhost:8000/employees',
    name: '',
    city: '',
    salary:0,
    add:true
}

doc.addButton.addEventListener('click', () => {
    console.log('Működik');
    getDataFromForm();
    createEmployee();
    deleteEmployee();
    getEmployees();
})

function getDataFromForm() {
    state.name = doc.nameDoc.value
    state.city = doc.cityDoc.value
    state.salary= Number(doc.salaryDoc.value)
}

function createEmployee() {
    fetch(state.url, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: state.name,
            city: state.city,
            salary: state.salary
        })
    })
}

function deleteEmployee() {
    doc.idDoc.value="";
    doc.nameDoc.value="";
    doc.cityDoc.value="";
    doc.salaryDoc.value="";
}

function clearTableContent() {
    doc.empBody.textContent = "";
}


function getEmployees() {
    fetch(state.url)
    .then(response => response.json())
    .then(result => {
        clearTableContent();
        renderEmployees(result);
    })
}

function renderEmployees(employeeList) {
    employeeList.forEach(emp => {
        console.log(emp.name)
        var row = document.createElement('tr')
        row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.city}</td>
        <td>${emp.salary}</td>
        <td class="width text-center">
            <button class="btn btn-outline-primary"
            data-id="${emp.id}"
            data-name="${emp.name}"
            data-city="${emp.city}"
            data-salary="${emp.salary}"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onclick="startEdit(this)"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-outline-danger" onclick="startDelete(${emp.id})"><i class="bi bi-trash3"></i></button>
        </td>
    `
    doc.empBody.appendChild(row)
    });
}

function startAdding() {
    deleteEmployee();
}

function startDelete(id) {
    console.log('törlődő elem:', id)
    finishDelete(id)
    getEmployees()
}

function finishDelete(id) {
    let newUrl = state.url + '/' + id
    fetch(newUrl, {
        method: 'DELETE'
    })
}

function startEdit(source) {
    console.log("Szerkesztés...")
    console.log(source.dataset.id)
    doc.idDoc.value = source.dataset.id
    doc.nameDoc.value = source.dataset.name
    doc.cityDoc.value = source.dataset.city
    doc.salaryDoc.value = source.dataset.salary
}



getEmployees()