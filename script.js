var selectedRow = null;

// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields(){
    document.querySelector("#studentName").value = "";
    document.querySelector("#pizzaParlor").value = "";
    document.querySelector("#pizzaTop").value = "";
}

// Add Data

document.querySelector("#student-form").addEventListener( "submit", (e) =>{
    e.preventDefault();

    // Get Form Values
    const studentName = document.querySelector("#studentName").value;
    const pizzaParlor = document.querySelector("#pizzaParlor").value;
    const pizzaTop = document.querySelector("#pizzaTop").value;

    // validate 
    if(studentName =="" || pizzaParlor == "" || pizzaTop == ""){
        showAlert("Please fill in all fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${studentName}</td>
            <td>${pizzaParlor}</td>
            <td>${pizzaTop}</td>
            <td> 
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success");
        }
        else{
            selectedRow.children[0].textContent = studentName;
            selectedRow.children[1].textContent = pizzaParlor;
            selectedRow.children[2].textContent = pizzaTop;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
    

        clearFields();
    }
});


// Edit Data

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#studentName").value = selectedRow.children[0].textContent;
        document.querySelector("#pizzaParlor").value = selectedRow.children[1].textContent;
        document.querySelector("#pizzaTop").value = selectedRow.children[2].textContent;
    }
})


// Delete Data

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});