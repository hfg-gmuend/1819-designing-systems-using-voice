var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var synth = window.speechSynthesis;

var article;
var articleCount = 0;

var recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var diagnostic = document.querySelector('.output');

document.body.onclick = function() {
    // reset t2s
    responsiveVoice.cancel();

    $('header').css({
        backgroundColor: '#1707DA',
        opacity: '0.5'
    });

    recognition.start();
    console.log('Ready to receive an article search.');
}

recognition.onresult = function(event) {
    var last = event.results.length - 1;
    article = event.results[last][0].transcript;
    diagnostic.textContent = 'Your results for ' + article + '. ' + '  Confidence: ' + event.results[0][0].confidence;
    console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
    recognition.stop();
    handleSubmit();
}
recognition.onnomatch = function(event) {
    diagnostic.textContent = "I didn't recognise that.";
}
recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

function handleSubmit(event) {
    // const input = document.querySelector('.searchForm-input').value;
    const searchQuery = article;
    fetchResults(searchQuery);
}

function fetchResults(searchQuery) {
    // counter reset
    articleCount = 0;
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;
            displayResults(results);
        })
        .catch(() => console.log('An error occurred'));
}

function displayResults(results) {
    responsiveVoice.speak("Heres what if found about" + article);
    $('header').css({
        backgroundColor: '#1707DA',
        opacity: '1'
    });

    const searchResults = document.querySelector('.searchResults');
    searchResults.innerHTML = '';
    results.forEach(result => {
        console.log("articleCount:" + articleCount);
        // lese nur die ersten 5 titel vor 
        articleCount += 1;
        if (articleCount < 6) {
            responsiveVoice.speak(`${result.title}`);
            // problem mit satzzeichen
            //responsiveVoice.speak( `${result.snippet}`);
        }
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
        searchResults.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
        );
    });
}

const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);