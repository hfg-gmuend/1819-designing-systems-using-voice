var json;
var myChoice;
var doc;

function searchWiki() {
    artyom.ArtyomVoicesIdentifiers["en-US"].unshift('Google US English', 'Alex');
    const searchQuery = cleanSearch.toLowerCase();
    fetchResults(searchQuery);
    artyom.say("Hi, I'm Alex. I'm responsible for your results, table of contents, snippets and abstracts. Here are your results:")

    function fetchResults(searchQuery) {
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${searchQuery}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                const results = data.query.search;
                json = results;
                console.log(json);
                displayResults(json);
            })
        // .catch(() => console.log('An error occurred'));
    }

    function displayResults(data) {
        artyom.say("Here are your results:")
        var arrayLength = data.length;
        console.log(arrayLength);
        for (var i = 0; i < arrayLength; i++) {
            artyom.say(data[i]['title']);
        }
        artyom.say("Which subject do you want to know more about?")
    }
}

function definitionWiki() {
    artyom.ArtyomVoicesIdentifiers["en-US"].unshift('Google US English', 'Alex');
    const searchQuery = cleanArticle.toLowerCase();
    fetchResults(searchQuery.trim());
    myChoice = cleanArticle.toLowerCase();
    console.log(myChoice);
   
    function fetchResults(searchQuery) {
        wtf.fetch(myChoice, 'en', function(err, doc) {
                artyom.say(doc.paragraphs(0).text())
        });
    }
}

function snippetWiki() {
    artyom.ArtyomVoicesIdentifiers["en-US"].unshift('Google US English', 'Alex');
    const searchQuery = cleanSnippet.toLowerCase();
    fetchResults(cleanSnippet.trim());
    myChoice = cleanSnippet.toLowerCase();
    console.log(myChoice);

    function fetchResults(searchQuery) {
        wtf.fetch(myChoice, 'en', function(err, doc) {
            artyom.say(doc.sentences(0).text())
        });

    }
}

function tocWiki() {
    artyom.ArtyomVoicesIdentifiers["en-US"].unshift('Google US English', 'Alex');
    const searchQuery = cleanTOC.toLowerCase();
    fetchResults(searchQuery.trim());
    myChoice = cleanTOC.toLowerCase();
    artyom.say("Hi, I'm Alex. I'm responsible for your results, table of contents, snippets and abstracts. Here are your results:")
    function fetchResults(searchQuery) {

        const endpoint = `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=sections&origin=*&page=${searchQuery}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                const results = data.parse.sections;
                json = results;
                console.log(json);
                displayResults(json);
            })
        // .catch(() => console.log('An error occurred'));
    }
    function displayResults(data) {
        var arrayLength = data.length;
        artyom.ArtyomVoicesIdentifiers["en-US"].unshift('Google US English', 'Alex');
        artyom.say("There are" + arrayLength + "subcategories, here are the first ten: ")
        console.log(arrayLength);
        for (var i = 0; i < 10; i++) {
            artyom.say(data[i]['toclevel'] + data[i]['line']);
        }
        artyom.say("Please choose a subcategory by its number")
    }
}

function subCat() {
    artyom.ArtyomVoicesIdentifiers["en-GB"].unshift('Google GB English', 'Daniel');
    artyom.say("Hi, I'm Daniel. Indepth knowledge and linked expertise are my passion. Here comes your subcategory text:")
    console.log("article choice: " + myChoice);
    const searchQuery = parseInt(cleanSub);
    fetchResults(searchQuery);
    console.log(searchQuery);
    function fetchResults(){
        wtf.fetch(myChoice, 'en', function(err, doc) {
            artyom.say(
                doc.sections(searchQuery).text()
            )
        });
    }   

}
function linksWiki() {
    artyom.ArtyomVoicesIdentifiers["en-GB"].unshift('Google GB English', 'Daniel');
    const searchQuery = myChoice.toLowerCase();
    fetchResults(searchQuery);

    function fetchResults(searchQuery) {
        wtf.fetch(myChoice, 'en', function(err, doc) {
            var linksLength = doc.links().map(p => p.page).length;
            allLinks = [doc.links()];
            console.log(allLinks);

            artyom.say("There are" + linksLength + "links in this article. Thats a lot to listen to. I'll tell you the first ten." )
            
            if (linksLength>10){
                for (var i = 0; i < 10; i++) {
                    artyom.say(
                    doc.links().map(p => p.text)[i])
                }
            }
        });
    }
}