const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twiterbutton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// show loading 



// get quote from API
async function getQuote (){
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // if author is blank, add 'Unknown'
    if(data.quoteAuthor === ''){
        authorText.innerText = 'Unknown';
    }
    else {
        authorText.innerText = data.quoteAuthor;
    }
//   reduce font size for long quotes
if (data.quoteText.length >120) {
    quoteText.classList.add('long-quote');
}else {
    quoteText.classList.remove('long-quote');
}

    quoteText.innerHTML = data.quoteText;

} catch (error) {
    getQuote();
    console.log('Whoops, No quote ', error)
}
}
// it will take u straight to twitter to tweet
function tweetquote () {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', getQuote);
twiterbutton.addEventListener('click',tweetquote);

// on load
getQuote();
