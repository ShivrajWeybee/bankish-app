'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(acc) {
  containerMovements.innerHTML = '';

  acc.forEach(function (mov, i) {
    
      const type = mov > 0 ? 'deposit' : 'withdrawal';
  
      const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${mov} ???</div>
          </div>`;
  
        containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}



const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementUsd =  movements.map(function(mov) {
//   return mov*euroToUsd;
// })
// const movementUsd = movements.map(mov => mov*euroToUsd);

// console.log(movements);
// console.log(movementUsd);
// console.log(movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} ???`;
  return `${acc.balance} ???`;
  console.log(acc);
}

// ---------------------------------------------
// ---------------------------------------------
const calcDisplaySummary = function(acc) {

  console.log(acc);

  const income = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}???`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}???`

  const interest = acc.movements.map(deposit => deposit * acc.interestRate/100).filter((int, i, arr) => int >= 1).reduce((acc, mov) => acc + mov, 0);

  // const interest = accounts.movements.filter(mov => mov > 0).map(deposit => deposit * 1.2/100).filter((int, i, arr) => int >= 1).reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}???`
}


// ---------------------------------------------
// ---------------------------------------------
const movmentDescription = movements.map( (mov, i, arr) => 
  `Movement ${i+1}: you ${mov>0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);


// ---------------------------------------------
// ---------------------------------------------
const createUserNames = function(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
};
createUserNames(accounts);


// ---------------------------------------------
// ---------------------------------------------

let currentAccount;
btnLogin.addEventListener('click', function(e) {
  // prevent form to submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username == inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin == inputLoginPin.value) {

    console.log('login clicked');

    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear feilds
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    // Display movments
    displayMovements(currentAccount.movements);

    // Display Balance
    calcDisplayBalance(currentAccount);

    // display Summary
    calcDisplaySummary(currentAccount);
  } else {
    labelWelcome.textContent = 'Login to get started';
    containerApp.style.opacity = 0;
    alert('Enter valid login credential');
  }
});

console.log('hello')

// Implement Transfer
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log('........................');
  
  currentAccount.movements.push(-amount);
  receiverAcc.movements.push(amount);

  const splited = labelBalance.textContent.split(' ')[0];

  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && amount < splited && receiverAcc && receiverAcc.username !== currentAccount.username) {
    console.log("Transfered Succes..");
    calcDisplayBalance(currentAccount);
    displayMovements(currentAccount.movements);
    calcDisplaySummary(currentAccount);
  }
  else {
    alert("Envalid");
  }
})


btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) == currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    labelWelcome.textContent = 'Login to get started';
    containerApp.style.opacity = 0;
    console.log(accounts.splice(index, 1));
  }
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);



/////////////////////////////////////////////////

let arr = ['v', 'i', 's', 'h', 'u'];

// SLICE & SPLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2,4));
// console.log(arr.slice(-1));
// // console.log(arr);

// // console.log(arr.splice(2));
// console.log(arr);

// // REVERSE
// const arr2 = ['s','h', 'i', 'v'];
// console.log(arr2.reverse());

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// // OR like this
// console.log([...arr, ...arr2]);

// // JOIN
// let blah = letters.join(' - ');
// console.log(typeof blah);

// // AT method
// const arr3 = [12, 23, 34];
// console.log(arr3[0]);
// console.log(arr3.at(0));

// // Get the last element of array
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.slice(-1)[0]);
// console.log(arr3.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if(movement>0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("------ forEach ------");

// movements.forEach(function(movement) {
//   if(movement>0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// })

// movements.forEach(function(mov, i, arr) {
//   if(mov>0) {
//     console.log(`action: ${i} - You deposited ${mov}`);
//   } else {
//     console.log(`action: ${i} - You withdrew ${Math.abs(mov)}`);
//   }
// })


// // forEach loop with Map & Set
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// // Map
// currencies.forEach(function(value, key, map) {
//   console.log(`${key}: ${value}`);
// })

// // Sets
// const currenciesUnique = new Set(['a', 'b', 'a', 'c', 's', 'r']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function(value, _, map) {
//   console.log(`${value}: ${value}`);
// })



// FILTER
// const deposits = movements.filter(function(mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const wihdrawals = movements.filter(function(mov) {
//   return mov < 0;
// });
// console.log(wihdrawals);


// REDUCE

// acc = accumaltor
// const balance = movements.reduce(function(acc, cur, i, arr) {
//   console.log(acc);
//   return acc + cur;
// }, 0);
// console.log(balance);
// console.log('-------------------');
// console.log(movements);

// Maximum value
// const max = movements.reduce((acc, cur) => {
//   if (acc > cur) {
//     return acc;
//   } else {
//     return cur;
//   }
// }, movements[0]);
// console.log(max);



// Chaining Method
// const totalDipositUSD = movements.filter(mov => mov > 0).map(mov => mov*euroToUsd).reduce((acc, mov) => acc+mov, 0);

// const total = movements.filter(mov => mov > 0).map(mov => mov*euroToUsd).reduce((acc, mov) => acc + mov, 0);
// console.log(total);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// for (const ele of accounts) {
//   const a = accounts.filter(elem => accounts.name === 'Jessica Davis');
//   console.log(a);
// }



// FindIndex method
