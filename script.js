const balance = document.getElementById('totalbalance');
const income = document.getElementById('totalIncome');
const expenses = document.getElementById('totalExpense');
const form = document.getElementById('form');
const text = document.getElementById('Text');
const amount = document.getElementById('number')
const cash_amount = document.getElementById('amountCash');
const operation = document.getElementById('transactionType')
const list = document.getElementById('list');


let y = new Date()

const date = y.toLocaleDateString("defualt", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

let localStorageTransaction = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem('transactions') !== null ? 
localStorageTransaction : [];



function generateID() {
   return Math.floor(Math.random() *100000);
}

function addTransaction(e){
    e.preventDefault()  
    
    let x =  operation.value === 'minusOperation' ? +amount.value * -1 : +amount.value;  

    let transaction ={
        id: generateID(),
        date: date,
        text: text.value,
        cash_amount:x  
        
    };
    
    transactions.push(transaction)
    addTransactionDom(transaction)
    updateValue()
    updatelocalstorage()
}



function addTransactionDom(transaction){
    const sign = transaction.cash_amount >= 0 ? '+' : '' ;
     
    const item = document.createElement('li');

    item.classList.add(transaction.cash_amount >= 0 ? 'plus': 'minus')

    item.innerHTML = `
    ${transaction.date} <span>${transaction.text}</span>
    <span>${sign}${transaction.cash_amount}</span>
    <button class='delete' onclick='removeTransaction(${transaction.id})'>x</button>
    `;

    list.appendChild(item);
}   

function updateValue(){
    const amount = transactions.map(transaction => transaction.cash_amount)

    const total = amount
                    .reduce((acc, item) => (acc += item),0)
                    .toFixed(2);


    const totalIncome = amount
                        .filter(item => item > 0)
                        .reduce((acc, item) => (acc += item), 0)
                        .toFixed(2);

    const expense = (amount
                        .filter(item => item < 0)
                        .reduce((acc, item) => (acc += item), 0 )* 
                        -1)  
                        .toFixed(2);
    

    balance.innerText = `$${total}`
    income.innerText = `$${totalIncome}`
    expenses.innerText = `$${expense}`
    
}

function removeTransaction(id){ transactions = transactions.filter(transactions => transactions.id !== id);

    updatelocalstorage()
    init()
}

function updatelocalstorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}




function init(){
    list.innerHTML = '';

    transactions.forEach(addTransactionDom);
    updateValue();
}

init()

form.addEventListener('submit', addTransaction)


