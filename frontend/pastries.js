// Select the table body and form elements
const tableBody = document.querySelector("tbody");

// Add Pastry
const addPastryForm = document.querySelector("#addPastryModal form");
addPastryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("addPastryName").value;
    const stock = document.getElementById("addPastryStock").value;

    if (name && stock) {
        const newRow = document.createElement("tr");
        const rowCount = tableBody.querySelectorAll("tr").length + 1;

        newRow.innerHTML = `
            <td>${String(rowCount).padStart(2, '0')}</td>
            <td>${name}</td>
            <td>${stock}</td>
            <td>
                <button class="btn btn-primary bi bi-pen" data-bs-toggle="modal" data-bs-target="#editPastryModal"></button>
                <button class="btn bg-danger bi bi-trash" data-bs-toggle="modal" data-bs-target="#deletePastryModal"></button>
            </td>
        `;
        tableBody.appendChild(newRow);
        addPastryForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("addPastryModal")).hide();
    }
});

// Edit Pastry
let editRow = null;
const editPastryModal = document.getElementById("editPastryModal");
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-pen")) {
        editRow = event.target.closest("tr");
        document.getElementById("editPastryName").value = editRow.children[1].textContent;
        document.getElementById("editPastryStock").value = editRow.children[2].textContent;
    }
});

const editPastryForm = document.querySelector("#editPastryModal form");
editPastryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("editPastryName").value;
    const stock = document.getElementById("editPastryStock").value;

    if (editRow && name && stock) {
        editRow.children[1].textContent = name;
        editRow.children[2].textContent = stock;
        bootstrap.Modal.getInstance(editPastryModal).hide();
    }
});

// Delete Pastry
let deleteRow = null;
const deletePastryModal = document.getElementById("deletePastryModal");
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-trash")) {
        deleteRow = event.target.closest("tr");
    }
});

const confirmDeleteButton = document.querySelector("#deletePastryModal .btn-danger");
confirmDeleteButton.addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        bootstrap.Modal.getInstance(deletePastryModal).hide();
    }
});