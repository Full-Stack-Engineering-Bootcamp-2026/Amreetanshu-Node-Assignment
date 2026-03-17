// const fs = require('fs');

// //creates a new file and write the text what we write 
// fs.writeFileSync('hello.txt','hello from Node.js');

// var name ='amreet';
// var age =23;
// var isPresent =true;
// function write(name, age, isPresent) {
//     return(
//         'Name is '+ name + ' age is '+ age + 'and is present'+ isPresent

//     );
// }//usual function

// let pname='Ansh';
// const func = (pname)=>{
//     return (
//         'name is '+pname
//     );
// }
// console.log(write(name,age,isPresent));
// console.log(func(pname));

// const person = {
//     name:'Amreet',
//     Age:23,

//      greet() {
//         console.log('hi my name is ' + this.name + 'my age is '+ this.Age)
//     }
// };

// person.greet(); // here this refers to the global scope so name and age is undefined

const hobbies = ['amreet','ansh',23];

console.log(hobbies);

console.log(hobbies.map(mapped=>"added "+ mapped)); // we can map and add anything 