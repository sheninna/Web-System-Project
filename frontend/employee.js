// Select the table body and form elements
const tableBody = document.querySelector("tbody");

// Add Employee
const addEmployeeForm = document.querySelector("#addEmployeeModal form");
addEmployeeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("addEmployeeName").value;
    const position = document.getElementById("addEmployeePosition").value;

    if (name && position) {
        const newRow = document.createElement("tr");
        const rowCount = tableBody.querySelectorAll("tr").length + 1;

        newRow.innerHTML = `
            <td>${String(rowCount).padStart(2, '0')}</td>
            <td>${name}</td>
            <td>${position}</td>
            <td>
                <button class="btn btn-primary bi bi-pen" data-bs-toggle="modal" data-bs-target="#editEmployeeModal"></button>
                <button class="btn bg-danger bi bi-trash" data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal"></button>
            </td>
        `;
        tableBody.appendChild(newRow);
        addEmployeeForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("addEmployeeModal")).hide();
    }
});

// Edit Employee
let editRow = null;
const editEmployeeModal = document.getElementById("editEmployeeModal");
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-pen")) {
        editRow = event.target.closest("tr");
        document.getElementById("editEmployeeName").value = editRow.children[1].textContent;
        document.getElementById("editEmployeePosition").value = editRow.children[2].textContent;
    }
});

const editEmployeeForm = document.querySelector("#editEmployeeModal form");
editEmployeeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("editEmployeeName").value;
    const position = document.getElementById("editEmployeePosition").value;

    if (editRow && name && position) {
        editRow.children[1].textContent = name;
        editRow.children[2].textContent = position;
        bootstrap.Modal.getInstance(editEmployeeModal).hide();
    }
});

// Delete Employee
let deleteRow = null;
const deleteEmployeeModal = document.getElementById("deleteEmployeeModal");
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-trash")) {
        deleteRow = event.target.closest("tr");
    }
});

const confirmDeleteButton = document.querySelector("#deleteEmployeeModal .btn-danger");
confirmDeleteButton.addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        bootstrap.Modal.getInstance(deleteEmployeeModal).hide();
    }
});