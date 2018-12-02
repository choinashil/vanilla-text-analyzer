// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

var word;
var data = {};
var dataCount = 0;
var maxLimit = 5000;
var lessThanLimit = true;

var inputBox = document.querySelector('#inputBox');
var infoBar = document.querySelector('.infoBar');
var result = document.querySelector('.result');

inputBox.addEventListener('keyup', function(e) {
  validateInputValue(e);
  countLength(e);
});

var regExpHangeul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;

function validateInputValue (e) {
  var allCharacters = e.target.value;

  if (regExpHangeul.test(allCharacters)) {
    infoBar.children[0].textContent = 'Only available in English';
    infoBar.children[0].classList.remove('invisible');
    infoBar.children[0].classList.add('visible');
  } else {
    infoBar.children[0].classList.remove('visible');
    infoBar.children[0].classList.add('invisible');
  }
}

function countLength(e) {
  var allCharacters = e.target.value;

  if (regExpHangeul.test(allCharacters)) {
    allCharacters = allCharacters.replace(regExpHangeul, '');
  }

  var lengthCount = allCharacters.length;
  infoBar.children[1].textContent = lengthCount;

  if (lengthCount > maxLimit) {
    lessThanLimit = false;
    infoBar.children[0].textContent = 'Exceeded length limit';
    infoBar.children[0].classList.remove('invisible');
    infoBar.children[0].classList.add('visible');
    infoBar.children[1].classList.add('red');
  } else {
    lessThanLimit = true;
    infoBar.children[1].classList.remove('red');
  }
  if (lessThanLimit) {
    analyzeInputValue(e);
  }
}

function analyzeInputValue(e) {
  var allCharacters = e.target.value;
  var regExpSymbols = /[`~@#$%^&*\-_=+(){}\[\]<>|\\/;:'",.?!\n]/g;

  if (stopWords.test(allCharacters)) {
    allCharacters = allCharacters.replace(stopWords, '');
  }

  if (regExpSymbols.test(allCharacters)) {
    allCharacters = allCharacters.replace(regExpSymbols, '');
  }

  // console.log(allCharacters);

  if (allCharacters) {
    var allWords = allCharacters.toLowerCase().split(' ');

    if (allWords.includes('')) {
      var idxOfWhiteSpace = allWords.indexOf('');
      while (idxOfWhiteSpace !== -1) {
        allWords.splice(idxOfWhiteSpace, 1);
        idxOfWhiteSpace = allWords.indexOf('', idxOfWhiteSpace);
      }
    }

    // console.log(allWords);
    // infoBar.children[1].textContent = `Total word count: ${allWords.length}`;

    // console.log('1.',data);
    // console.log(`dataCount: ${dataCount}`);

    // console.log(`data.length: ${Object.keys(data).length}`);
    // console.log(`arr.length: ${allWords.length}`);
    // console.log(`dataCount: ${dataCount}`);

    if (e.keyCode === 32) {
      for (var i = dataCount; i < allWords.length; i++) {
        if (data[allWords[i]]) {
          data[allWords[i]] = data[allWords[i]] + 1;
          dataCount++;
          // console.log('2.',data);
        } else {
          data[allWords[i]] = 1;
          dataCount++;
          // console.log('3.',data);
        }
      }
      showResult();
    }

  // 스페이스키 눌러서 글자 지울때도 대응하도록!


  } else {
    data = {};
    dataCount = 0;
    result.textContent = '';
  }
}

function showResult() {
  for (var key in data) {
    var needToCreate = false;
    if (result.childElementCount) {
      for (var i = 0; i < result.childElementCount; i++) {
        if (key === result.children[i].textContent) {
          if (data[key] > 1) {
            changeWord(key, i);
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
      createWord(key);
    }
  }
}

var level1 = document.querySelector('.level1');
var level2 = document.querySelector('.level2');
var level3 = document.querySelector('.level3');
var level4 = document.querySelector('.level4');
var level5 = document.querySelector('.level5');


function createWord(key) {
  word = document.createElement('div');
  word.classList.add('word');
  word.textContent = key;
  result.insertBefore(word, level1);
}


function changeWord(key, i) {

  switch(data[key]) {
    case 2 :
      result.insertBefore(result.children[i], level2);
      for (var i = 0; i < result.childElementCount; i++) {
        if (result.children[i].textContent === key) {
          result.children[i].style.fontSize = '25px';
          result.children[i].style.opacity = '0.65';
          result.children[i].style.lineHeight = '1.3em';
        }
      }
      break;
    case 3 :
      result.insertBefore(result.children[i], level3);
      for (var i = 0; i < result.childElementCount; i++) {
        if (result.children[i].textContent === key) {
          result.children[i].style.fontSize = '35px';
          result.children[i].style.opacity = '0.75';
          result.children[i].style.lineHeight = '1.5em';
        }
      }
      break;
    case 4 :
      result.insertBefore(result.children[i], level4);
      for (var i = 0; i < result.childElementCount; i++) {
        if (result.children[i].textContent === key) {
          result.children[i].style.fontSize = '45px';
          result.children[i].style.opacity = '0.90';
          result.children[i].style.lineHeight = '1.8em';
        }
      }
      break;
    case 5 :
      result.insertBefore(result.children[i], level5);
      for (var i = 0; i < result.childElementCount; i++) {
        if (result.children[i].textContent === key) {
          result.children[i].style.fontSize = '60px';
          result.children[i].style.opacity = '1';
        }
      }
      break;
  }

  console.log(level5.offsetTop, result.clientHeight)
  if (level5.offsetTop > result.clientHeight - 10) {
    var i = 0;
    while (level5.offsetTop > result.clientHeight - 10) {
      // result.removeChild(result.children[i]);
      result.children[i].style.display = 'none';
      i++;
    }
  }
}


var stopWords = /\b(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|also)\b/gim;
