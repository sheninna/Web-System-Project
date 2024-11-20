// Select the table body and form elements
const tableBody = document.querySelector("tbody");

// Add Bread
const addBreadForm = document.querySelector("#addBreadModal form");
addBreadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("addBreadName").value;
    const stock = document.getElementById("addBreadStock").value;

    if (name && stock) {
        const newRow = document.createElement("tr");
        const rowCount = tableBody.querySelectorAll("tr").length + 1;

        newRow.innerHTML = `
            <td>${String(rowCount).padStart(2, '0')}</td>
            <td>${name}</td>
            <td>${stock}</td>
            <td>
                <button class="btn btn-primary bi bi-pen" data-bs-toggle="modal" data-bs-target="#editBreadModal"></button>
                <button class="btn bg-danger bi bi-trash" data-bs-toggle="modal" data-bs-target="#deleteBreadModal"></button>
            </td>
        `;
        tableBody.appendChild(newRow);
        addBreadForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("addBreadModal")).hide();
    }
});

// Edit Bread
let editRow = null;
const editBreadModal = document.getElementById("editBreadModal");
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-pen")) {
        editRow = event.target.closest("tr");
        document.getElementById("editBreadName").value = editRow.children[1].textContent;
        document.getElementById("editBreadStock").value = editRow.children[2].textContent;
    }
});

const editBreadForm = document.querySelector("#editBreadModal form");
editBreadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("editBreadName").value;
    const stock = document.getElementById("editBreadStock").value;

    if (editRow && name && stock) {
        editRow.children[1].textContent = name;
        editRow.children[2].textContent = stock;
        bootstrap.Modal.getInstance(editBreadModal).hide();
    }
});

// Delete Bread
let deleteRow = null;
const deleteBreadModal = document.getElementById("deleteBreadModal");
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-trash")) {
        deleteRow = event.target.closest("tr");
    }
});

const confirmDeleteButton = document.querySelector("#deleteBreadModal .btn-danger");
confirmDeleteButton.addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        bootstrap.Modal.getInstance(deleteBreadModal).hide();
    }
});