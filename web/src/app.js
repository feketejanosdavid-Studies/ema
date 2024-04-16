const doc = {
    empBody: document.getElementById('empBody')
} 

function getEmployees() {
    const url = 'http://localhost:8000/employees'

    fetch(url).then(response => response.json())
}

getEmployees()