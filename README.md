# TodoList

- fix mobile home page styles for the h1 and p elements
- Add clear buttom for complete tasks
- Add date at the top of the task list 
- Implement authentification in backend

# get current date with format 
const date = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = date.toLocaleString('es', options);

# Transform the first letter to uppercase
const weekday = 'viernes';
const charToUpperCase = weekday.at(0).toUpperCase();
const finalString = charToUpperCase.concat(weekday.slice(1))
console.log(finalString);
