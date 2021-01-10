var fs = require('fs');
const names = require("./name");

function randomSpecialChar () {
    // example set of special chars as a string in no particular order
    var s = "!\"§$%&/()=?\u{20ac}";
    
    // generating a random index into the string and extracting the character at that position
    return s.substr(Math.floor(s.length*Math.random()), 1);
}

var Err = false;

addChars = (arr=[])=> {
    var Arr = [];
    arr.forEach(value=>{
        if(typeof(value) === "string") {
            let valLength = value.length;
            let randomIndex = Math.floor(Math.random() * valLength);
            let splArr = value.split("");
            splArr.splice(randomIndex,0,randomSpecialChar());
            var tempVal = splArr.join("");
            Arr.push(tempVal);
        }
        else {
            Err = true;
            console.log("Value Not a String");
        }
    })
    return Arr;
};


removeChars = (arr=[])=> {
    var Arr = [];
    arr.forEach((value)=>{
        let name = value.toLowerCase(); // Converted name to Lowercase for better comparison with Unicode Char numbers
        let nameArr = value.split(""); // Original Name Array with Upper and Lower Chars and Special Chars
        let splCharIndexArr = [], normArr = []; // One Array for storing special char indexes and another to which we will restore Normalized name
        
        //spliting name char wise for comparison
        name.split("").forEach((ch,index)=>{
            if(!(name.charCodeAt(index)>=97 && name.charCodeAt(index)<=122)){ // if Char is not in a-z unicode range
                splCharIndexArr.push(index); //Storing Special Chars in an array for restoring Normalized Name
            };
        });


        //Will copy normal Characters in Normalized Array skipping special chars with the help of special Char indexes list
        nameArr.forEach((ch,index)=>{
            if(!splCharIndexArr.includes(index)){
                normArr.push(ch);
            }
        });
        //Pushing joined String from Normalized array
        Arr.push(normArr.join(""));
    });
    return Arr;
};

var namesWithSpecialChars = addChars(names);
var namesWithoutSpecialChars = removeChars(namesWithSpecialChars);

names.forEach((name, index)=>{
    // console.log(`${name}||${namesWithoutSpecialChars[index]}||${namesWithSpecialChars[index]}`);
    if(name != namesWithoutSpecialChars[index]) {
        console.log(`Original Name : ${name} Modified Name: ${namesWithSpecialChars[index]}  Corrected Name ${namesWithoutSpecialChars[index]}`);
    }
});

fs.writeFileSync('./Normalized.txt', namesWithoutSpecialChars);

// console.log(names.some((value,index)=>{if(value != namesWithoutSpecialChars[index]) {
//     console.log(`Original Name : ${value} Modified Name: ${namesWithSpecialChars[index]}  Corrected Name ${namesWithoutSpecialChars[index]}`);
//     return true}}));

