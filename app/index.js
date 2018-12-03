// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

var word;
var data;
var ranking = [];
var maxLimit = 5000;
var noHangeul = true;
var lessThanLimit = true;
var position = true;
var createData = false;

var chart = document.querySelector('.chart');
var inputBox = document.querySelector('#inputBox');
var infoBar = document.querySelector('.infoBar');
var result = document.querySelector('.result');

chart.addEventListener('click', showChart);
chart.addEventListener('mouseleave', tooltipReset);
inputBox.addEventListener('keyup', function(e) {
  validateInputValue(e);
  validateLength(e);
});
result.addEventListener('mouseover', showFrequency);

var regExpHangeul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
var stopWords = /\b(i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|me|myself|my|we|us|ourselves|ours|our|yourself|yourselves|you|your|yours|he|him|his|himself|she|herself|hers|her|itself|its|it|they|theirs|their|themselves|them|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|been|being|have|has|had|having|does|did|doing|do|will|would|should|can|could|ought|the|and|an|a|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|nor|not|no|only|own|same|so|than|too|very|says|said|say|shall|also|i|be)\b/gim;

function showChart(e) {
  chart.children[1].textContent = '';

  var chartWrapper = document.createElement('div');
  var chartTitle = document.createElement('div');
  var top5List = document.createElement('div');
  var frequency = document.createElement('div');

  chartTitle.classList.add('chartTitle');
  top5List.classList.add('top5List');
  frequency.classList.add('frequency');

  chartWrapper.appendChild(chartTitle);
  chartWrapper.appendChild(top5List);
  chartWrapper.appendChild(frequency);
  chart.children[1].appendChild(chartWrapper);

  if (ranking.length >= 5) {
    chartTitle.textContent = 'TOP5';
    top5List.innerHTML = `${ranking[0][0]} <br> ${ranking[1][0]} <br> ${ranking[2][0]} <br> ${ranking[3][0]} <br> ${ranking[4][0]}`;
    frequency.innerHTML = `${ranking[0][1]} <br> ${ranking[1][1]} <br> ${ranking[2][1]} <br> ${ranking[3][1]} <br> ${ranking[4][1]}`;
  } else if (!ranking.length) {
    chartTitle.classList.remove('chartTitle');
    chartTitle.textContent = 'Enter text first!';
  } else {
    chartTitle.classList.remove('chartTitle');
    chartTitle.textContent = 'need more than 5 words!';
  }
}

function tooltipReset() {
  chart.children[1].textContent = 'click!';
}

function validateInputValue (e) {
  var allCharacters = e.target.value;

  if (regExpHangeul.test(allCharacters)) {
    noHangeul = false;
    infoBar.children[0].textContent = 'Only available in English';
    infoBar.children[0].classList.remove('invisible');
    infoBar.children[0].classList.add('blink');
  } else {
    noHangeul = true;
    infoBar.children[0].classList.remove('blink');
    infoBar.children[0].classList.add('invisible');
  }
}

function validateLength(e) {
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
    infoBar.children[0].classList.add('blink');
    infoBar.children[1].classList.add('red');
  } else {
    lessThanLimit = true;
    infoBar.children[1].classList.remove('red');
  }
  if (lessThanLimit && noHangeul) {
    setData(e);
  }
}

function setData(e) {
  data = {};
  ranking = [];
  var allCharacters = e.target.value;
  var regExpSymbols = /[`~@#$%^&*\-_=+(){}\[\]<>|—\\/;:'",.?!\n]/g;

  if (stopWords.test(allCharacters)) {
    allCharacters = allCharacters.replace(stopWords, '');
  }
  if (regExpSymbols.test(allCharacters)) {
    allCharacters = allCharacters.replace(regExpSymbols, '');
  }

  var allWords = allCharacters.toLowerCase().split(' ');

  if (allWords.includes('')) {
    var idxOfWhiteSpace = allWords.indexOf('');
    while (idxOfWhiteSpace !== -1) {
      allWords.splice(idxOfWhiteSpace, 1);
      idxOfWhiteSpace = allWords.indexOf('', idxOfWhiteSpace);
    }
  }

  for (var i = 0; i < allWords.length; i++) {
    if (data[allWords[i]]) {
      data[allWords[i]]++;
    } else {
      data[allWords[i]] = 1;
    }
  }

  for (var word in data) {
    ranking.push([word, data[word]]);
  }
  ranking.sort(function(a, b) {
    return b[1] - a[1];
  });

  createData = true;
  showResult();
}

function showResult() {
  for (var i = 0; i < result.childElementCount; i++) {
    while (result.children[i].childElementCount) {
      result.children[i].removeChild(result.children[i].firstChild);
    }
  }

  for (var key in data) {
    word = document.createElement('div');
    word.classList.add('word');
    word.textContent = key;

    if (data[key] < 5) {
      for (var i = 1; i <= ranking[0][1]; i++) {
        if (data[key] === i) {
          word.classList.add('wordsInLevel' + i);
          if (position) {
            result.children[i - 1].appendChild(word);
          } else {
            result.children[9 - i].appendChild(word);
          }
        }
      }
    } else {
      word.classList.add('wordsInLevel5');
      result.children[4].appendChild(word);
    }
    position = !position;
  }
}

function showFrequency(e) {
  var tag = document.querySelector('.tag');

  setTimeout(function() {
    if (e.target.classList.contains('word')) {
      tag.style.display = 'block';
      tag.style.left = e.clientX + 'px';
      tag.style.top = e.clientY + 'px';
      tag.textContent = data[e.target.textContent];
    } else {
      tag.style.display = 'none';
    }
  }, 100);
}
