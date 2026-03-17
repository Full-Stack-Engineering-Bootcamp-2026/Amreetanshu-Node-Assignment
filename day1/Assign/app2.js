    let name ='Amreet';
    let age =23;
    let hobbies= 'Sketching';


    console.log("Hi my name is " + name + "age is "+ age + "hobby is "+ hobbies);


    //Square arrow function

    const square = (num1)=>{ return num1*num1};

    console.log(square(4));


    //isEven function

    const isEven = (num)=> {
        if(num%2==0)return true;
        else{
            return false;
        }
    }

    console.log(isEven(4));


    let fruits =['Apple','Ban','papaya','grapes','pineApple'];

    console.log(fruits);

    //map
    console.log(fruits.map(change =>"fav fruit is "+ change));

    const result = fruits.filter(fruit => fruit.length >3);

    console.log( "Filtered fruits :",result);



