
// Select the input fields and button
let nameInput = document.getElementById('name') as HTMLInputElement;
let quantityInput = document.getElementById('quantity') as HTMLInputElement;
let priceInput = document.getElementById('price') as HTMLInputElement;
let btn = document.getElementById('btn') as HTMLButtonElement;

// Select the table body where rows will be added
let tableBody = document.querySelector('#dataTable tbody');
let editingRow: HTMLTableRowElement | null = null;

// Function to check if all inputs are filled
function checkInputs() {
    if (nameInput.value && quantityInput.value && priceInput.value) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

// Add event listeners to input fields
nameInput.addEventListener('input', checkInputs);
quantityInput.addEventListener('input', checkInputs);
priceInput.addEventListener('input', checkInputs);

// Add an event listener to the button to save and display data
btn.addEventListener('click', () => {
    if (nameInput && quantityInput && priceInput) {
        const nameValue = nameInput.value;
        const quantityValue = quantityInput.value;
        const priceValue = priceInput.value;

        if (editingRow) {
            // Update existing row
            const cells = editingRow.getElementsByTagName('td');
            cells[0].textContent = nameValue;
            cells[1].textContent = quantityValue;
            cells[2].textContent = priceValue;

            // Optionally update localStorage
            updateLocalStorage();

            // Clear the input fields and reset button
            editingRow = null;
            btn.textContent = 'Add';
            btn.disabled === true ? btn.style.cursor = 'not-allowed' : 'pointer';

        } else {
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
function addDataToTable(name: string, quantity: string, price: string) {
    if (tableBody) {
        // Create a new row and insert the data
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${price}</td>
            <div>
            <td class="btn_triangle">
            <button class="edit_btn">Edit</button>
            <button class="delete_btn">Delete</button>
            </td>
            </div>
        `;
        tableBody.appendChild(row);

        const deleteBtn = row.querySelector('.delete_btn') as HTMLButtonElement;
        deleteBtn.addEventListener('click', () => {
            row.remove();
            updateLocalStorage();
        });

        const editBtn = row.querySelector('.edit_btn') as HTMLButtonElement;
        editBtn.addEventListener('click', () => {
            nameInput.value = name;
            quantityInput.value = quantity;
            priceInput.value = price;
            editingRow = row;
            btn.textContent = 'Save';
            btn.style.cursor = 'pointer';
        });
    }
}

// Function to update localStorage
function updateLocalStorage() {
    const rows = tableBody?.querySelectorAll('tr');
    const data = Array.from(rows || []).map(row => {
        const cells = row.getElementsByTagName('td');
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
    const savedData = localStorage.getItem('products');
    if (savedData) {
        const products = JSON.parse(savedData) as { name: string; quantity: string; price: string }[];
        products.forEach(product => {
            addDataToTable(product.name, product.quantity, product.price);
        });
    }
}

// Load the data from localStorage when the page loads
window.onload = loadDataFromLocalStorage;

// Initial check to disable/enable button based on input fields' state
checkInputs();


// Select the elements
const menuIcon = document.querySelector('.nav-menu-icon') as HTMLDivElement;
let menuOpenPanel = document.querySelector('.nav-menu') as HTMLDivElement;

menuIcon?.addEventListener('click', () => {
    if (menuOpenPanel) {
        menuOpenPanel.style.right = '-0';
    }
});

const closeBtn = document.querySelector('.close_btn') as HTMLDivElement;

closeBtn?.addEventListener('click', () => {
    if (menuOpenPanel) {
        menuOpenPanel.style.right = '-100%';
    }
});