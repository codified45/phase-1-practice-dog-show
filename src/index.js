document.addEventListener('DOMContentLoaded', () => {

    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
        .then(obj => {
            for (const element of obj){
            console.log(element.name);
            let tableRow = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            let cell3 = document.createElement('td');
            let cell4 = document.createElement('td');
            let editBtn = document.createElement('button');
            cell1.textContent = element.name;
            cell2.textContent = element.breed;
            cell3.textContent = element.sex;
            editBtn.textContent = 'Edit Dog';
            editBtn.id = element.id;
            editBtn.addEventListener('click', editDog);
            cell4.append(editBtn);
            tableRow.append(cell1, cell2, cell3, cell4);
            tableBody.appendChild(tableRow);
            };
        });

    

    function editDog(e) {
        console.log('Im in EditDog');
        populateForm(e);
    };

    function populateForm(e) {
        console.log('I\'m in populate form');
        console.log(e.target.parentNode.parentNode.children[0].textContent);
        dogForm.name.value = e.target.parentNode.parentNode.children[0].textContent;
        dogForm.breed.value = e.target.parentNode.parentNode.children[1].textContent;
        dogForm.sex.value = e.target.parentNode.parentNode.children[2].textContent;

    };

    function patchDog() {


        dogForm.reset();
    };
})