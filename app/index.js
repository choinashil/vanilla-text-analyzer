// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

var inputBox = document.querySelector('#inputBox');
var maxLimit = 5000;
var data = {};
var dataCount = 0;


var wordCount = document.querySelector('.wordCount');
wordCount.children[0].textContent = 'Number of characters: 0';
wordCount.children[1].textContent = 'Total word count: 0';


var result = document.querySelector('.result');

inputBox.addEventListener('keyup', function(e) {
  validateInputValue(e);
  countLength(e);
  analyzeInputValue(e);
});

function validateInputValue (e) {
  var allCharacters = e.target.value;
  var currentCharacter = allCharacters[allCharacters.length - 1];

  if (allCharacters) {
    if ((currentCharacter.charCodeAt() >= 45032 && currentCharacter.charCodeAt() <= 55203) || (currentCharacter.charCodeAt() >= 12593 && currentCharacter.charCodeAt() <= 12622) || (currentCharacter.charCodeAt() >= 12623 && currentCharacter.charCodeAt() <= 12643)) {
      alert(`${currentCharacter} is not a valid character.`);
    }
  }
}

function countLength(e) {
  var allCharacters = e.target.value;
  var lengthCount = allCharacters.length;
  wordCount.children[0].textContent = `Number of characters: ${lengthCount}`;

  if (lengthCount > maxLimit) {
    alert('Exceeded maximum length.');
  }
}

function analyzeInputValue(e) {
  var allCharacters = e.target.value.toLowerCase();
  // if (allCharacters.includes('.' || ',' || '!' || '?')) {
  //
  // }

  if (allCharacters) {
    var allWords = allCharacters.split(' ');
    // allWords = allWords.map(word) {
    //   if (word[word.length-1] === '.' || word[word.length-1] === '.' || word[word.length-1] === '.' || word[word.length-1] === '.')
    // }

    if (allWords.includes('')) {
      var idxOfWhiteSpace = allWords.indexOf('');
      while (idxOfWhiteSpace !== -1) {
        allWords.splice(idxOfWhiteSpace, 1);
        idxOfWhiteSpace = allWords.indexOf('', idxOfWhiteSpace);
      }
    }

    wordCount.children[1].textContent = `Total word count: ${allWords.length}`;

    console.log('arr:',allWords);
    console.log('1.',data);
    console.log(`data.length: ${Object.keys(data).length}`);
    console.log(`arr.length: ${allWords.length}`);
    console.log(`dataCount: ${dataCount}`);

    if (e.keyCode === 32) {
      for (var i = dataCount; i < allWords.length; i++) {

        if (data[allWords[i]]) {
          data[allWords[i]] = data[allWords[i]] + 1;
          dataCount++;
          console.log('2.',data);
        } else {
          data[allWords[i]] = 1;
          dataCount++;
          console.log('3.',data);
        }

      }
      showResult();
    }

  } else {
    data = {};
    wordCount.children[1].textContent = 'Total word count: 0';

    console.log(allWords);
    console.log(data);
  }

}

function showResult() {
  // 글자 지웠을때 처리!
  var word;

  for (var key in data) {
    var needToCreate = false;

    if (result.childElementCount) {
      for (var i = 0; i < result.childElementCount; i++) {
        if (key === result.children[i].textContent) {
          if (data[key] > 1) {
            result.children[i].style.fontSize = '25px';
          } else if (data[key] > 3) {
            result.children[i].style.fontSize = '40px';
          }
          needToCreate = false;
          break;
        } else {
          needToCreate = true;
        }
      }
    } else {
      needToCreate = true;
    }

    if (needToCreate) {
      word = document.createElement('span');
      word.classList.add('word');
      word.textContent = key;
      result.appendChild(word);
    }

  }

}
