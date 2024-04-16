const doc = {
    empBody: document.getElementById('empBody'),
    addButton: document.getElementById('addButton')
} 

const state = {
    url: 'http://localhost:8000/employees'
}

doc.addButton.addEventListener('click', () => {

})

function createEmployee() {
    fetch(state.url, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: "valaki",
            city: "valahol",
            salary: 300
        })
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