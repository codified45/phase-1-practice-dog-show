document.addEventListener('DOMContentLoaded', () => {

    const tableBody = document.getElementById('table-body');
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
        .then(obj => {
            for (const element of obj){
            console.log(element.name);
            let tableRow = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            let cell3 = document.createElement('td');
            let editBtn = document.createElement('button');
            cell1.textContent = element.name;
            cell2.textContent = element.breed;
            cell3.textContent = element.sex;
            editBtn.textContent = 'Edit Dog';
            document.addEventListener('click', editDog);
            tableRow.append(cell1, cell2, cell3, editBtn);
            tableBody.appendChild(tableRow);
            };


        })
    function editDog() {
        console.log('Im in EditDog');
    };
})