const { resolve } = require("node:dns");

const obj ={
    name: 'thing',
    roll:2,
    thing:4
}

console.log(obj);

const copyObj = obj;

//obj is a reference type so even if it is a constant 

copyObj.name='other'
console.log(copyObj);

const arr1 =[1,2,3,4];
let arr2 =[5,6,7,8];

arr2 =[...arr1, ...arr2];  //merging two arrays
console.log(arr2);


//Deconstructing object
const person ={
    name : 'Ansh',
    age:23,
    city:'Mumbai',
    prn:'411046'
}

const{name,age,prn}=person;

console.log(name + " "+age + " "+prn);

//Array Destructuring

const arr =[1,2,3];
const [first, ,third ]= arr;

console.log(first);
console.log(third);

//Promise 
function delay(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    });
}

delay(2000).then(
    ()=>{
        console.log("Done Waiting")
    }
);



