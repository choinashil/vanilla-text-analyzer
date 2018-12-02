// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

var data = {};
var dataCount = 0;
var maxLimit = 5000;
var noHangeul = true;
var lessThanLimit = true;

var inputBox = document.querySelector('#inputBox');

var wordCount = document.querySelector('.wordCount');
wordCount.children[0].textContent = 'Number of characters: 0';
wordCount.children[1].textContent = 'Total word count: 0';

var result = document.querySelector('.result');

inputBox.addEventListener('keyup', function(e) {
  validateInputValue(e);
  countLength(e);
});

function validateInputValue (e) {
  var allCharacters = e.target.value;
  var regExpHangeul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;

  if (regExpHangeul.test(allCharacters)) {
    noHangeul = false;
    // console.log('한글이 있습니다');
    // console.log(noHangeul);
    throwErrorWhenTypedHangeul();
  } else {
    noHangeul = true;
    // console.log('validator 통과');
    // console.log(noHangeul);
    if (noHangeul && lessThanLimit) {
      analyzeInputValue(e);
    }
  }
}

function countLength(e) {
  var allCharacters = e.target.value;
  var lengthCount = allCharacters.length;
  wordCount.children[0].textContent = `Number of characters: ${lengthCount}`;

  if (lengthCount > maxLimit) {
    lessThanLimit = false;
    throwErrorWhenExceededLimit(lengthCount, maxLimit);
  } else {
    lessThanLimit = true;
    if (noHangeul && lessThanLimit) {
      analyzeInputValue(e);
    }
  }
}

var time = 100;
var counter = 0;

function analyzeInputValue(e) {
  var allCharacters = e.target.value;

  var regExpSymbols = /[`~@#$%^&*\-_=+(){}\[\]<>|\\/;:'",.?!\n]/g;

  if (regExpSymbols.test(allCharacters)) {
    allCharacters = allCharacters.replace(regExpSymbols, '');
  }

  if (allCharacters) {
    var allWords = allCharacters.toLowerCase().split(' ');

    if (allWords.includes('')) {
      var idxOfWhiteSpace = allWords.indexOf('');
      while (idxOfWhiteSpace !== -1) {
        allWords.splice(idxOfWhiteSpace, 1);
        idxOfWhiteSpace = allWords.indexOf('', idxOfWhiteSpace);
      }
    }

    wordCount.children[1].textContent = `Total word count: ${allWords.length}`;

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

  //   (function (data, allWords, dataCount) {
  //   setTimeout(function() {
  //     for (var i = dataCount; i < allWords.length; i++) {
  //       if (data[allWords[i]]) {
  //         data[allWords[i]] = data[allWords[i]] + 1;
  //         dataCount++;
  //         console.log('2.',data);
  //       } else {
  //         data[allWords[i]] = 1;
  //         dataCount++;
  //         console.log('3.',data);
  //       }
  //     }
  //     showResult();
  //   }, time * counter);
  //   counter++;
  // })(data, allWords, dataCount);

  } else {
    data = {};
    wordCount.children[1].textContent = 'Total word count: 0';
    result.textContent = '';
    // console.log(allWords);
    // console.log(data);
  }

}

function showResult() {
  // 글자 지웠을때 처리하기!
  var word;

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
      word = document.createElement('div');
      word.classList.add('word');
      word.textContent = key;
      word.style.left = Math.floor(Math.random() * 600) + 'px';
      word.style.top = Math.floor(Math.random() * 240) + 'px';
      word.style.opacity = '0.4';
      result.appendChild(word);
      // console.log(`${key}: width-${word.offsetWidth}, height-${word.offsetHeight}, left-${word.offsetLeft}, top-${word.offsetTop}`);

    }

  }

}

function changeWord(key, i) {
  switch(data[key]) {
    case 2 :
      result.children[i].style.fontSize = '25px';
      result.children[i].style.opacity = '0.65';
      // console.log(`${key}: width-${result.children[i].offsetWidth}, height-${result.children[i].offsetHeight}, left-${result.children[i].offsetLeft}, top-${result.children[i].offsetTop}`);
      break;
    case 3 :
      result.children[i].style.fontSize = '35px';
      result.children[i].style.opacity = '0.75';
      break;
    case 4 :
      result.children[i].style.fontSize = '45px';
      result.children[i].style.opacity = '0.90';
      break;
    case 5 :
      result.children[i].style.fontSize = '60px';
      result.children[i].style.opacity = '1';
      break;
  }
}

function throwErrorWhenTypedHangeul() {
  result.style.backgroundColor = 'orange';
  result.textContent = '영어만 입력하세요';
}

function throwErrorWhenExceededLimit(lengthCount, maxLimit) {
  result.style.backgroundColor = 'red';
  result.textContent = `5000자 이하로 입력하세요. 현재 ${lengthCount - maxLimit}자 초과입니다.`;
}

// 전치사 preposition
// [about, ]
