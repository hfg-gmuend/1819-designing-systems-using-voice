const artyom = new Artyom();


function startRec() {
    var elem = document.getElementById("call2action");
    elem.value = 'i\'m listening!';
    elem.style.color = 'red';

    startContinuousArtyom();
    responsiveVoice.speak("I'm listening!");
    $( ".status" ).fadeTo( "slow" , 1);

    
}

let isVisible = false;
function swipeUp() {
    var elem = document.getElementById("about");
    isVisible = !isVisible;

    if(isVisible == true){
    elem.style.bottom = "9%";
    $(".arrow").html("&#x2925;");
    }else{
        elem.style.bottom = "-40%";
        $(".arrow").html("&#x2924;");
    }
}


let commandsVisible = false;
function commandsUp() {
    var elem = document.getElementById("commands");
    commandsVisible = !commandsVisible;

    if(commandsVisible == true){
    elem.style.bottom = "9%";
    $(".arrow1").html("&#x2925;");
    }else{
        elem.style.bottom = "-40%";
        $(".arrow1").html("&#x2924;");
    }
}


artyom.ArtyomVoicesIdentifiers["en-US"].unshift('Google US English', 'Alex');

function startContinuousArtyom() {
    artyom.fatality(); // use this to stop any of

    setTimeout(function() { // if you use artyom.fatality , wait 250 ms to initialize again.
        artyom.initialize({
            lang: "en-GB", // A lot of languages are supported. Read the docs !
            continuous: true, // Artyom will listen forever
            listen: true, // Start recognizing
            debug: true, // Show everything in the console
            speed: 1 // talk normally
        }).then(function() {
            console.log("Ready to work !");
        });
    }, 250);

}




var userInput;
var cleanSearch;

artyom.redirectRecognizedTextOutput(function(recognized, isFinal) {
    if (isFinal) {
        console.log("Final recognized text: " + recognized);
        $(".currentResult").html("Recognized: " + recognized);

        
        cleanSearch = recognized.replace('search for', '')
        cleanSearch = cleanSearch.trim();
        console.log("search term is: " + cleanSearch);

        cleanArticle = recognized.replace('tell me more about', '')
        cleanArticle = cleanArticle.trim();
        console.log("article is: " + cleanArticle);

        cleanSnippet = recognized.replace('snippet for', '')
        cleanSnippet = cleanSnippet.trim();
        console.log("snippet is: " + cleanSnippet);

        cleanTOC = recognized.replace('table of content for', '')
        cleanTOC = cleanTOC.trim();
        console.log("TOC for: " + cleanTOC);

        cleanSub = recognized.replace('subcategory', '')
        cleanSub = cleanSub.trim();
        console.log("Subcategory choice: " + cleanSub);

        cleanLinks = recognized.replace('links please','')
        cleanLinks = cleanLinks.trim(); 
        console.log("links for: " + cleanLinks);


    } else {
        console.log(recognized);
        
    }
});


var myGroup = [
    commandSearch = {
        indexes: ["search", "search for"],
        action: function() {
            $(".intro").html("Here are your results for " + cleanSearch + ". Use "+ "<span class = 'blue'>tell me more about … </span>" + "for the snippet. Or " + "<span class='blue'>table of content for … </span>" + "to get an overview.");

            responsiveVoice.speak("I'm Karen, i'm here to help you to find the best resuls. I'll search the wikipedia for" + cleanSearch);
            searchWiki(cleanSearch);
        }
    },
    articleChoice = {
        indexes: ["tell me more about", "the article"],
        action: function() {
            $(".intro").html("Here's the abstract of " + cleanArticle + ". Use " + "<span class='blue'>table of content for … </span>" + "to get an overview.");
            definitionWiki(cleanArticle);
        }
    },
    getSnippet = {
        indexes: ["snippet for", "the article"],
        action: function() {
            $(".intro").html("Here's the snippet for " + cleanSnippet + ". Use " + "<span class='blue'>table of content for … </span>" + "to get an overview. Or " + "<span class='blue'>tell me more about … </span>" + "for the first paragraph.");
            snippetWiki(cleanSnippet);
        }

    },
    tocSearch = {
        indexes: ["table of content for"],
        action: function() {
            tocWiki(cleanTOC);
            $(".intro").html("Here's the table of content. Use " + "<span class='blue'>sucategory [number] </span>" + "to choose one.");
        }
    },
    subChoice = {
        indexes: ["subcategory"],
        action: function() {
            subCat(cleanSub);
            $(".intro").html("Here's your in depth knowledge. Use " + "<span class='blue'>table of content for … </span>" + "or check the" + "<span class='blue'> links</span>" + ".");
        }
    },
    showLinks = {
        indexes: ["links"],
        action: function() {
            linksWiki();
            $(".intro").html("Here are all the links from " + myChoice + ".");
        }
    },
    backHome = {
        indexes: ["home", "bring me home", "back to start"],
        action: function() {
            $(".intro").html("This web-app allows you to search and navigate the Wikipedia with your voice. Use " + "<span class='blue'>search for …</span>" +" to start.");
        }
    },
    repeat = {
        indexes: ["repeat", "repeat please"],
        action: function() {
            artyom.repeatLastSay();
        }
    }, 
    about = {
        indexes: ["about this project"],
        action: function() {
            $(".intro").html("This project was made by " + "<span class='blue'>Moritz </span>" + "and " + "<span class='blue'>Roman</span>" + " for the " + "<span class='blue'>System Design </span>" + "course during the winter semester of 2018/19 at the" + "<span class='blue'> HfG</span>" + " Schwaebisch Gmuend. They were lectured by" + "<span class='blue'> Prof. Benedikt Gross</span>" + " and" + "<span class='blue'> Prof. Hartmut Bohnacker</span>" + ".");
            artyom.say("This project was made by Moritz and Roman for the system design course during the winter semester of 2018/19 at the HfG Schwaebisch Gmuend. They were lectured by professor Benedikt Gross and professor Hartmut Bohnacker");           
        }

    }

];

artyom.addCommands(myGroup);