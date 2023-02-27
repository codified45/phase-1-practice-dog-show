document.addEventListener('DOMContentLoaded', () => {

    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');
    let hasInputChanged = false;
    dogForm.addEventListener('input', inputAlert); // delete later
    dogForm.addEventListener('submit', patchDog);
    let dogBeingEditedId; 
    const dogsUrl = 'http://localhost:3000/dogs';
    fetchDogs();    

    function fetchDogs() {
        fetch(dogsUrl)
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
    };

    function inputAlert() {
        console.log('input has been changed!');
        hasInputChanged = true;
    };

    function editDog(e) {
        console.log('Im in EditDog');
        populateForm(e);
        console.log("after populateForm, in edit dog");
        dogBeingEditedId = e.target.id;
        console.log(`dogBeingEditedId set as ${e.target.id}`);

    };

    function populateForm(e) { //done
        dogForm.name.value = e.target.parentNode.parentNode.children[0].textContent;
        dogForm.breed.value = e.target.parentNode.parentNode.children[1].textContent;
        dogForm.sex.value = e.target.parentNode.parentNode.children[2].textContent;
    };

    function patchDog(e) {
        e.preventDefault();
        console.log(e.target.name.value);
        let editDogUrl = dogsUrl + `/${dogBeingEditedId}`;
        console.log(editDogUrl);

        let formData = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value,
        };

        const patchConfig = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Application": "application/json",
            },
            body: JSON.stringify(formData),
        };

        if (hasInputChanged){
            fetch(editDogUrl, patchConfig)
            .then(res => res.json())
            .then(obj => {
                console.log(obj);
                tableBody.replaceChildren();
                fetchDogs();
            });
        } else {window.alert('No changes have been made.')};

        dogForm.reset();
        hasInputChanged = false;
    };
})