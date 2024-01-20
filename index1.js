const fs = require("fs");
const fileData = fs.readFileSync("sales.txt", "utf-8");

const arr = fileData.split("\n");
arr.shift();

//1.find total Sales of all Stores

const totalData=arr.reduce((total,value)=>{
   return total = total + parseFloat(value.split(',')[4]);
},0)
console.log(`1 => The Total Sales of All Stores is ${totalData} in Rupees`)

 //2.Month Wise Total Sales
let jan = 0;
let feb = 0;
let march = 0;

const monthWiseData = arr.reduce((total, value) => {
  if (value.split(",")[0].split("-")[1] == 1) {
    return (jan += parseFloat(value.split(",")[4]));
  } else if (value.split(",")[0].split("-")[1] == 2) {
    return (feb += parseFloat(value.split(",")[4]));
  } else {
    return (march += parseFloat(value.split(",")[4]));
  }
}, 0);
console.log( `2 => The sales of jan is ${jan},sales of feb is ${feb} and march is ${march}`);

//3.Most popular item (most quantity sold) in each month and most revenue Generating.

let jann=new Map();
let febb=new Map();
let March = new Map();

for(let value of arr){
    if (value.split(",")[0].split("-")[1] == 1) {

        if(jann.has(value.split(',')[1])){
            jann.set(value.split(',')[1],[parseFloat(jann.get(value.split(',')[1])[0]) + parseFloat(value.split(',')[3]), parseFloat(jann.get(value.split(",")[1])[1]) +
                      parseFloat(value.split(",")[4])])
        }else{
            jann.set(value.split(',')[1],[value.split(',')[3],value.split(',')[4]])
        }
}
else if(value.split(",")[0].split("-")[1] == 2){
    if(febb.has(value.split(',')[1])){
        febb.set(value.split(',')[1],[parseFloat(febb.get(value.split(',')[1])[0]) + parseFloat(value.split(',')[3]), parseFloat(febb.get(value.split(",")[1])[1]) +
                  parseFloat(value.split(",")[4])])
    }else{
        febb.set(value.split(',')[1],[value.split(',')[3],value.split(',')[4]])
    }

}
else{
    if(March.has(value.split(',')[1])){
        March.set(value.split(',')[1],[parseFloat(March.get(value.split(',')[1])[0]) + parseFloat(value.split(',')[3]), parseFloat(March.get(value.split(",")[1])[1]) +
                  parseFloat(value.split(",")[4])])
    }else{
        March.set(value.split(',')[1],[value.split(',')[3],value.split(',')[4]])
    }

}
}

// Finding Max of Jan
let JanmaxKey = null;
let JanmaxValue = -1;
let JanmaxRev=0;

for (let [key, value] of jann) {
    if (value[0] > JanmaxValue) {
        JanmaxValue = value[0];
        JanmaxRev=value[1]
        JanmaxKey = key;
    }
}
console.log(`3 => The Most Popular Item of Jan is ${JanmaxKey} its Quantity is ${JanmaxValue}`)
console.log(`4 => The  most Revenue Generating Item of January is ${JanmaxKey} that is ${JanmaxRev} in Rupees`);

// //Finding Max of Feb

let febmaxKey = null;
let febmaxValue = -1;
let febmaxRev=0;

for (let [key, value] of febb) {
    if (value[0] > febmaxValue) {
        febmaxValue = value[0];
        febmaxRev=value[1]
        febmaxKey = key;
    }
}
console.log(`3 => The Most Popular Item of Feb is ${febmaxKey} its Quantity is ${febmaxValue}`)
console.log(`4 => The  most Revenue Generating Item of feb is ${febmaxKey} that is ${febmaxRev} in Rupees`);

//Finding Max of March

let MarmaxKey = null;
let MarmaxValue = -1;
let MarchRev=0;

for (let [key, value] of March) {
    if (value[0] > MarmaxValue) {
        MarmaxValue = value[0];
        MarchRev=value[1];
        MarmaxKey = key;
    }
}
console.log(`3 => The Most Popular Item of March is ${MarmaxKey} its Quantity is ${MarmaxValue}`)
console.log(`4 => The  most Revenue Generating Item of March is ${MarmaxKey} that is ${MarchRev} in Rupees`);

//5.For the most popular item, find the min, max and average number of orders each month.
let janSum=0;
let febSum=0;
let marchSum=0;
let arrJan=[]; let arrFeb=[];  let arrMarch=[];
for(let value of arr){
    if (value.split(",")[0].split("-")[1] == 1 && value.split(",")[1] == JanmaxKey) {
       arrJan.push(value.split(",")[3])
       janSum += parseFloat(value.split(",")[3])
}
else if (value.split(",")[0].split("-")[1] == 2 && value.split(",")[1] == febmaxKey) {
    arrFeb.push(value.split(",")[3])
    febSum += parseFloat(value.split(",")[3])
}else if(value.split(",")[1] == MarmaxKey){
    arrMarch.push(value.split(",")[3])
    marchSum += parseFloat(value.split(",")[3])
}

}

//to get min max and Average of Jan

let minOfJan=Math.min(...arrJan); let minOffeb=Math.min(...arrFeb); let minOfmarch=Math.min(...arrMarch) 
let maxOfJan=Math.max(...arrJan); let maxOffeb=Math.max(...arrFeb); let maxOfmarch=Math.max(...arrMarch) 
let avgOfjan=janSum/arrJan.length; let avgOffeb=febSum/arrFeb.length; let avgOfmarch=marchSum/arrMarch.length;

console.log(`5 => The min order of Jan is ${minOfJan}, the max order is ${maxOfJan} and average is ${avgOfjan.toFixed(2)}`)
console.log(`5 => The min order of Feb is ${minOffeb}, the max order is ${maxOffeb} and average is ${avgOffeb.toFixed(2)}`)
console.log(`5 => The min order of March is ${minOfmarch}, the max order is ${maxOfmarch} and average is ${avgOfmarch.toFixed(2)}`)


