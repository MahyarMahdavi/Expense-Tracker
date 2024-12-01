// Select elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const customCategoryInput = document.getElementById('custom-category');
const expenseList = document.getElementById('expenses');
const expenseChartCanvas = document.getElementById('expense-chart');

let expenses = []; // Store expenses
let categories = ["Food", "Transport", "Shopping"]; // Default categories

// Show/hide custom category input based on selection
expenseCategoryInput.addEventListener('change', () => {// Reset form fields explicitly
    function resetForm() {
        expenseNameInput.value = ''; // Clear name field
        expenseAmountInput.value = ''; // Clear amount field
        expenseCategoryInput.selectedIndex = 0; // Reset dropdown to default
        customCategoryInput.value = ''; // Clear custom category input
        customCategoryInput.style.display = 'none'; // Hide custom category input
        customCategoryInput.required = false; // Make sure it's not required anymore
    }
    if (expenseCategoryInput.value === 'Other') {
        customCategoryInput.style.display = 'block'; // Show input field
        customCategoryInput.required = true; // Make it required
    } else {
        customCategoryInput.style.display = 'none'; // Hide input field
        customCategoryInput.required = false; // Remove required
        customCategoryInput.value = ''; // Clear custom category input
    }
});

// Add Expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    let category = expenseCategoryInput.value;

    if (category === 'Other') {
        category = customCategoryInput.value.trim();
        if (category && !categories.includes(category)) {
            categories.push(category); // Add new category to the list
            addCategoryToDropdown(category); // Update dropdown
        }
    }

    if (!name || isNaN(amount) || amount <= 0 || !category) return;

    // Add expense to array
    const expense = { name, amount, category };
    expenses.push(expense);

    // Update UI
    addExpenseToUI(expense);
    updateChart();
    saveExpenses();

    // Explicitly reset fields
    resetForm();
});


// Add expense to UI
function addExpenseToUI(expense) {
    const li = document.createElement('li');
    li.innerHTML = `${expense.name} - $${expense.amount} <span>[${expense.category}]</span>`;
    expenseList.appendChild(li);
}

// Add new category to the dropdown
function addCategoryToDropdown(category) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    expenseCategoryInput.appendChild(option);
}

// Update chart
function updateChart() {
    const categoriesData = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const labels = Object.keys(categoriesData);
    const data = Object.values(categoriesData);

    if (expenseChart) expenseChart.destroy();

    expenseChart = new Chart(expenseChartCanvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        }
    });
}

// Save expenses to local storage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load expenses from local storage
function loadExpenses() {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    savedExpenses.forEach(expense => {
        expenses.push(expense);
        addExpenseToUI(expense);
    });
    updateChart();
}

let expenseChart;
loadExpenses();