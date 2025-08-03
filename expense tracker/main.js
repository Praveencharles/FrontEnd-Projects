const balanceEl = document.getElementById("balance")
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transaction")) ||[]; 

transactionFormEl.addEventListener("submit",addTransaction);

function addTransaction(e){
    e.preventDefault();

    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        id:Date.now(),
        description,
        amount
    })

    localStorage.setItem("transactions",JSON.stringify(transactions))

    updateTransactionList();
    updateSumary();

    transactionFormEl.reset()

    //console.log(description);
    //console.log(amount);
    //console.log(transactions);
}


function updateTransactionList(){
    transactionListEl.innerHTML = "";

    const sortedTransactions = [...transactions].reverse()

    //console.log(sortedTransactions);

    sortedTransactions.forEach((transaction)=>{
        const transactionEl = createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);

        //console.log(transactionEl);
        //console.log(transactionListEl);
    })
}

function createTransactionElement(transaction){
    const li = document.createElement("li")
    li.classList.add("transaction")
    li.classList.add(transaction.amount > 0 ? "income" : "expense")

    li.innerHTML = `
    <span>${transaction.description}</span>
    <span>${transaction.amount}
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>
    `;
    
    return li;
}

function updateSumary(){

    const balance = transactions.reduce((acc,transaction)=>acc+transaction.amount,0)

    const income = transactions.filter(transaction => transaction.amount > 0).reduce((acc,transaction)=>acc+transaction.amount,0)

    const expense = transactions.filter(transaction => transaction.amount < 0).reduce((acc,transaction)=>acc+transaction.amount,0)
    

    balanceEl.textContent = balance;
    incomeAmountEl.textContent = income;
    expenseAmountEl.textContent = expense;
}

