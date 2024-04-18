const doc = {
    empBody: document.getElementById('empBody'),
    addButton: document.getElementById('addButton'),
    nameDoc: document.getElementById('name'),
    cityDoc: document.getElementById('city'), 
    salaryDoc: document.getElementById('salary')
} 

const state = {
    url: 'http://localhost:8000/employees',
    name: '',
    city: '',
    salary:0
}

doc.addButton.addEventListener('click', () => {
    console.log('Működik')
    createEmployee()
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

function editEmployee(){
    fetch(state.url, {
        method: 'DELETE',

    })
}

function getEmployees() {
    fetch(state.url)
    .then(response => response.json())
    .then(result => {renderEmployees(result)})
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
        <td>
            <button class="btn btn-outline-primary">Szerkesztés</button>
            <button class="btn btn-outline-danger">Törlés</button>
        </td>
    `
    doc.empBody.appendChild(row)
    });
}

getEmployees()