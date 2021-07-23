// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};
const vowelBonusStructure = {
  3: ['A', 'E', 'I', 'O', 'U', 'Y'],
  1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
};

let newPointStructure;

let oldScrabbleScorer = function(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
  
  for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
      letterPoints += Number(pointValue)
      //`Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let scrabbleWord = input.question(`Let's play some scrabble! 
  
Enter a word: `);
return scrabbleWord;
};



let simpleScore = function(word) {
  return word.length;
}

let vowelBonusScore = function(word){
  word = word.toUpperCase();
    let letterPoints = 0;
  
    for (let i = 0; i < word.length; i++) {
  
      for (const pointValue in vowelBonusStructure) {
  
      if (vowelBonusStructure[pointValue].includes(word[i])) {
        //letterPoints += pointValue;
        letterPoints += Number(pointValue)
        //`Points for '${word[i]}': ${pointValue}\n`
      }
  
      }
    }
    return letterPoints;
}


let scrabbleScore;

const scoringAlgorithms = [{name: 'Simple Score', description: 'Each letter is worth 1 point.', scorerFunction: simpleScore}, {name: 'Bonus Vowels', description:'Vowels are 3 pts, consonants are 1 pt.', scorerFunction: vowelBonusScore}, {name: 'Scrabble', description: 'The traditional scoring algorithm.', scorerFunction: oldScrabbleScorer},];

function scorerPrompt() {
let scoreOption = input.question(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `);
  
  return scoringAlgorithms[scoreOption]

}

function transform(oldPointStructure) {
  /*for all the points in old point structure
   make container to hold point value in old point structure
  then do .length for 2nd part of transform. for new array, transform into number. then do return thing to end portion of function. console log to check.*/

  let returnPointStructure = {};

  for(pointValue in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[pointValue].length; i++){
      returnPointStructure[oldPointStructure[pointValue][i]] = pointValue;
    }
  }

  return returnPointStructure;

};


function runProgram() {
 newPointStructure = transform(oldPointStructure);
 let userWord = initialPrompt();
 let scoreMethod = scorerPrompt();
 console.log(`Score for ${userWord}: \n ${scoreMethod.scorerFunction(userWord)}`);
}





// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

