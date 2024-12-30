document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expensesList = document.getElementById('expenses');
    const totalAmountElement = document.getElementById('total-amount');

    let totalExpenses = 0;

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values
        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
        const expenseCategory = document.getElementById('expense-category').value;

        // Validate input
        if (!expenseName || isNaN(expenseAmount) || !expenseCategory) {
            alert('Please fill out all fields.');
            return;
        }

        // Add to total expenses
        totalExpenses += expenseAmount;
        totalAmountElement.textContent = `$${totalExpenses.toFixed(2)}`;

        // Add expense to list
        const expenseItem = document.createElement('li');
        expenseItem.textContent = `${expenseName} - $${expenseAmount.toFixed(2)} [${expenseCategory}]`;
        expensesList.appendChild(expenseItem);

        // Clear form
        expenseForm.reset();
    });
});
