//this is a basic constructor that allows for the creation of multiple objects
function Bird() {
  this.name = "Albert";
  this.color = "blue";
  this.numLegs = 2;
}
//setting a variable to have the same object properties
let blueBird = new Bird();
//changing one of the properties in the new object
blueBird.name = 'Elvira';
console.log(blueBird)