// Select the table body and form elements
const tableBody = document.querySelector("tbody");

// Add Coffee Ingredient
const addCoffeeForm = document.querySelector("#addCoffeeModal form");
addCoffeeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("addCoffeeName").value;
    const stock = document.getElementById("addCoffeeStock").value;

    if (name && stock) {
        const newRow = document.createElement("tr");
        const rowCount = tableBody.querySelectorAll("tr").length + 1;

        newRow.innerHTML = `
            <td>${String(rowCount).padStart(2, '0')}</td>
            <td>${name}</td>
            <td>${stock}</td>
            <td>
                <button class="btn btn-primary bi bi-pen" data-bs-toggle="modal" data-bs-target="#editCoffeeModal"></button>
                <button class="btn bg-danger bi bi-trash" data-bs-toggle="modal" data-bs-target="#deleteCoffeeModal"></button>
            </td>
        `;
        tableBody.appendChild(newRow);
        addCoffeeForm.reset();
        bootstrap.Modal.getInstance(document.getElementById("addCoffeeModal")).hide();
    }
});

// Edit Coffee Ingredient
let editRow = null;
const editCoffeeModal = document.getElementById("editCoffeeModal");
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-pen")) {
        editRow = event.target.closest("tr");
        document.getElementById("editCoffeeName").value = editRow.children[1].textContent;
        document.getElementById("editCoffeeStock").value = editRow.children[2].textContent;
    }
});

const editCoffeeForm = document.querySelector("#editCoffeeModal form");
editCoffeeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("editCoffeeName").value;
    const stock = document.getElementById("editCoffeeStock").value;

    if (editRow && name && stock) {
        editRow.children[1].textContent = name;
        editRow.children[2].textContent = stock;
        bootstrap.Modal.getInstance(editCoffeeModal).hide();
    }
});

// Delete Coffee Ingredient
let deleteRow = null;
const deleteCoffeeModal = document.getElementById("deleteCoffeeModal");
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-trash")) {
        deleteRow = event.target.closest("tr");
    }
});

const confirmDeleteButton = document.querySelector("#deleteCoffeeModal .btn-danger");
confirmDeleteButton.addEventListener("click", () => {
    if (deleteRow) {
        deleteRow.remove();
        bootstrap.Modal.getInstance(deleteCoffeeModal).hide();
    }
});