// Select the input fields and button
var nameInput = document.getElementById('name');
var quantityInput = document.getElementById('quantity');
var priceInput = document.getElementById('price');
var btn = document.getElementById('btn');
// Select the table body where rows will be added
var tableBody = document.querySelector('#dataTable tbody');
var editingRow = null;
// Function to check if all inputs are filled
function checkInputs() {
    if (nameInput.value && quantityInput.value && priceInput.value) {
        btn.disabled = false;
    }
    else {
        btn.disabled = true;
    }
}
// Add event listeners to input fields
nameInput.addEventListener('input', checkInputs);
quantityInput.addEventListener('input', checkInputs);
priceInput.addEventListener('input', checkInputs);
// Add an event listener to the button to save and display data
btn.addEventListener('click', function () {
    if (nameInput && quantityInput && priceInput) {
        var nameValue = nameInput.value;
        var quantityValue = quantityInput.value;
        var priceValue = priceInput.value;
        if (editingRow) {
            // Update existing row
            var cells = editingRow.getElementsByTagName('td');
            cells[0].textContent = nameValue;
            cells[1].textContent = quantityValue;
            cells[2].textContent = priceValue;
            // Optionally update localStorage
            updateLocalStorage();
            // Clear the input fields and reset button
            editingRow = null;
            btn.textContent = 'Add';
            btn.disabled === true ? btn.style.cursor = 'not-allowed' : 'pointer';
        }
        else {
            // Add new row
            addDataToTable(nameValue, quantityValue, priceValue);
        }
        // Clear the input fields
        nameInput.value = '';
        quantityInput.value = '';
        priceInput.value = '';
        checkInputs();
    }
});
// Function to add data to the table
function addDataToTable(name, quantity, price) {
    if (tableBody) {
        // Create a new row and insert the data
        var row_1 = document.createElement('tr');
        row_1.innerHTML = "\n            <td>".concat(name, "</td>\n            <td>").concat(quantity, "</td>\n            <td>").concat(price, "</td>\n            <div>\n            <td class=\"btn_triangle\">\n            <button class=\"edit_btn\">Edit</button>\n            <button class=\"delete_btn\">Delete</button>\n            </td>\n            </div>\n        ");
        tableBody.appendChild(row_1);
        var deleteBtn = row_1.querySelector('.delete_btn');
        deleteBtn.addEventListener('click', function () {
            row_1.remove();
            updateLocalStorage();
        });
        var editBtn = row_1.querySelector('.edit_btn');
        editBtn.addEventListener('click', function () {
            nameInput.value = name;
            quantityInput.value = quantity;
            priceInput.value = price;
            editingRow = row_1;
            btn.textContent = 'Save';
            btn.style.cursor = 'pointer';
        });
    }
}
// Function to update localStorage
function updateLocalStorage() {
    var rows = tableBody === null || tableBody === void 0 ? void 0 : tableBody.querySelectorAll('tr');
    var data = Array.from(rows || []).map(function (row) {
        var cells = row.getElementsByTagName('td');
        return {
            name: cells[0].textContent || '',
            quantity: cells[1].textContent || '',
            price: cells[2].textContent || ''
        };
    });
    localStorage.setItem('products', JSON.stringify(data));
}
// Function to load data from localStorage and display in table on page load
function loadDataFromLocalStorage() {
    var savedData = localStorage.getItem('products');
    if (savedData) {
        var products = JSON.parse(savedData);
        products.forEach(function (product) {
            addDataToTable(product.name, product.quantity, product.price);
        });
    }
}
// Load the data from localStorage when the page loads
window.onload = loadDataFromLocalStorage;
// Initial check to disable/enable button based on input fields' state
checkInputs();
// Select the elements
var menuIcon = document.querySelector('.nav-menu-icon');
var menuOpenPanel = document.querySelector('.nav-menu');
menuIcon === null || menuIcon === void 0 ? void 0 : menuIcon.addEventListener('click', function () {
    if (menuOpenPanel) {
        menuOpenPanel.style.right = '-0';
    }
});
var closeBtn = document.querySelector('.close_btn');
closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', function () {
    if (menuOpenPanel) {
        menuOpenPanel.style.right = '-100%';
    }
});
