const doc = {
    empBody: document.getElementById('empBody')
} 

function getEmployees() {
    const url = 'http://localhost:8000/employees'

    fetch(url)
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
    `
    doc.empBody.appendChild(row)
    });
}

getEmployees()