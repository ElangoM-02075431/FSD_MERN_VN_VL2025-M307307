const num = (numb) => {
    if(numb % 2 === 0){
        console.log(`The number is Even`);
    }
    else{
        console.log(`The number is Odd`);
    }
    if(numb > 0){
        console.log(`The number is Positive`);
    }
    else if(numb < 0){
        console.log(`The number is Negative`);
    }
    else{
        console.log(`The number is Zero`);
    }
     if(numb % 3 === 0  && numb % 5 === 0){
        console.log(`The number is divisible by both 3 and 5`);
    }
    else{
        console.log(`The number is Not divisible by both 3 and 5`)
    }
}
num(-15)