/* eslint-disable no-undef */

'use strict';
let ImgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
  'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
  'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let count = 25;
let firstImageIndex = 0;
let secondImageIndex = 0;
let thirdImageIndex = 0;
const images = document.getElementById('images');
const firstImage = document.getElementById('firstImage');
const secondImage = document.getElementById('secondImage');
const thirdImage = document.getElementById('thirdImage');
document.getElementById('result');



function Obj(name) {
  this.name = name;
  if (name ==='usb'){
    this.img = `./img/${name}.gif`;}
  else if (name === 'sweep'){
    this.img = `./img/${name}.png`;
  }else {
    this.img = `./img/${name}.jpg`;
  }
  this.NumberOfClicks = 0;
  this.show= 0;
  Obj.all.push(this);
}
Obj.all = [];
Obj.counter = 0;


for (let i = 0; i < ImgArray.length; i++) {
  new Obj(ImgArray[i]);
}
let newArr = [];



function render() {
  newArr=[];
  if (Obj.counter >0){
    newArr= [firstImageIndex,secondImageIndex,thirdImageIndex];
  }

  let firstIndex;
  let secondIndex;
  let thirdIndex;

  firstIndex = randomNumber(0, Obj.all.length - 1);
  firstImage.src = Obj.all[firstIndex].img;
  firstImage.alt = Obj.all[firstIndex].name;
  firstImageIndex = firstIndex;
  newArr.push(firstIndex);



  do {
    secondIndex = randomNumber(0, Obj.all.length - 1);
  } while (firstIndex === secondIndex || secondIndex === thirdIndex);

  secondImage.src = Obj.all[secondIndex].img;
  secondImage.alt = Obj.all[secondIndex].name;
  secondImageIndex = secondIndex;
  newArr.push(secondIndex);



  do {
    thirdIndex = randomNumber(0, Obj.all.length - 1);
  } while (firstIndex === thirdIndex || thirdIndex === secondIndex);
  thirdImage.src = Obj.all[thirdIndex].img;
  thirdImage.alt = Obj.all[thirdIndex].name;
  thirdImageIndex = thirdIndex;
  newArr.push(thirdIndex);


  Obj.all[firstIndex].show++;
  Obj.all[secondIndex].show++;
  Obj.all[thirdIndex].show++;
}

function handleClick (event){
  if (Obj.counter < count){
    const clickedElement = event.target;
    if (clickedElement.id === 'firstImage' || clickedElement.id === 'secondImage' || clickedElement.id === 'thirdImage'){

      if (clickedElement.id === 'firstImage'){
        Obj.all[firstImageIndex].NumberOfClicks++;

      }
      if (clickedElement.id === 'secondImage'){
        Obj.all[secondImageIndex].NumberOfClicks++;
      }
      if (clickedElement.id === 'thirdImage'){
        Obj.all[thirdImageIndex].NumberOfClicks++;
      }
    }

    Obj.counter++;

    render();
  }
  if (Obj.counter === count){
    document.getElementById('result').style.visibility = 'visible';
    images.removeEventListener ('click', handleClick);
  }
}

images.addEventListener('click',handleClick);

function randomNumber( min, max ) {
  let indexNumber = Math.floor( Math.random() * ( max - min + 1 ) ) + min;

  for (let index = 0 ; index < newArr.length ; index++){

    if (indexNumber === newArr[index]){
      indexNumber = Math.floor( Math.random() * ( max - min + 1 ) ) + min;

    }
  }
  return (indexNumber);
}


let buttonClick = 0 ;
let clickArr = [];
let viewArr = [];
localStorage;
render();

document.getElementById('result').addEventListener('click', function() {
  localStorage.setItem ('Obj',JSON.stringify(Obj.all));
  console.log (localStorage);
  buttonClick = buttonClick +1;
  const container = document.getElementById ('Results');
  const ulElement =document.createElement ('ul');
  container.appendChild (ulElement);

  for (let index = 0 ; index < ImgArray.length ; index++){
    const liElement = document.createElement ('li');

    ulElement.appendChild (liElement);
    liElement.textContent = (`${ImgArray[index]} had ${Obj.all[index].NumberOfClicks } votes, and was seen ${Obj.all[index].show} times.`);
    clickArr.push (Obj.all[index].NumberOfClicks);
    viewArr.push (Obj.all[index].show);
  }

  let ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ImgArray,
      datasets: [{
        label: 'Number of Votes',
        data: clickArr,
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }
      ,{
        label: 'Times Seen',
        data: viewArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


  if (buttonClick >= 1){
    document.getElementById('result').style.visibility = 'hidden';
  }

});
function getData() {
  const updateData = localStorage.getItem('Obj');
  if(updateData) {
    const objData = JSON.parse(updateData);
    Obj.all = objData;
    render();
  }
}
getData();



