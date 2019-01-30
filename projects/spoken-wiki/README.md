![img not found](key_visual.png)

# Spoken Wiki – A Voice User Interface for Wikipedia


This snippet allows you to search for articles within Wikipedia using your voice.
No node installation required. It uses the [artyom.js library](https://sdkcarlos.github.io/sites/artyom.html), a powerful wrapper for the Webspeech API. You can either use the Wikimedia API directly or work with the [wtf_wikipedia library](https://beta.observablehq.com/@spencermountain/wtf_wikipedia). We recommend the latter because it takes care of the many markdown versions of Wikipedia for you.

A project by [Moritz Kuhn](https://moritzkuhn.com) and [Roman Kuhn](https://roman-k.de/). Read the extensive documentation of the project [here](https://doku.link).
 
> This is an university project, still under developement. Thank you for making suggestions and reporting any bugs you may find! Currently Google Chrome is the only browser that supports the webspeech API. Since late 2018 voice output requires an active user input to be triggered (e.g. onclick).

## Commands

* Searching the Wikipedia with **search for ...** 
* Fetching the TOC using **table of contents for …** 
* Get the articles snippet with **snippet for …** 
* Get the abstract with **tell me more about …** 
* Get the text from a subcategory with **subcategory …**
* List links using **links**
* **repeat** the last speech output
* Go back **home** in case you feel lost

## Features
* Speech input 
* Speech output for navigation, feedback and content
* The complete Wikipedia
* Constant recording
* Cross-level commands
* Minimal GUI


## Customizing

You can add your own commands and expand the feature list by adding commands and API calls. For more detailed instructions see the [artyom documentation](https://sdkcarlos.github.io/sites/artyom.html) and the [wtf_wikipedia documentation](https://beta.observablehq.com/@spencermountain/wtf_wikipedia).
You will also find the [responsiveVoice API](https://responsivevoice.org/api/) embeded in the code. Generally you can decide if you prefer artyom or responsiveVoice. While artyom tends to be more stable and a bit faster, responsiveVoice offers you more settings.

**Adding a command & triggering a function**

	myCommand = {	
		indexes: ["your hotword", "variation of it"],
        action: function() { // what it will trigger
            $(".intro").html("GUI feedback");
            responsiveVoice.speak("using responsiveVoice");
            artyom.say("using artyom");
            yourFunction(cleanedInput;
        }
    }
    
**Getting clean input strings**

	artyom.redirectRecognizedTextOutput(function(recognized, isFinal) {
    	if (isFinal) {
		cleanedInput = recognized.replace('your hotword variation of it', '')
		cleanSearch = cleanSearch.trim(); // getting a clean string
		console.log("clean input is: " + cleanedInput);
        }else{console.log(recognized);}
	});

**Using the input in the triggered function**

Example: Getting the first sentence of an article.
	
	wtf.fetch('cleanedInput', 'en', function(err, doc) {
		artyom.say("Here's the first sentence of" + cleanedInput);
		console.log(doc.sentences(0).text());
		artyom.say(doc.sentences(0).text());
 	});
 	
**Clean output strings**

Markdown and HTML-Tags will mess up your speech output.
Stripping markdown or tags from the string shouldn't be necessary at all while using wtf_wikipedia.js. 

If needed, consider using:

`myString.replace(/<(?:.|\n)*?>/gm, '');`

Or alternatively:

	function strip(html)
	{
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
  		return tmp.textContent || tmp.innerText || "";
	}

## Upcoming Features
We plan to **switch completely to wtf_wikipedia.js**. This will shorten the code and make way it easier to read and customize it. Also it offers more API functions than the orignal Wiki API.

In the future there will be a **power user feature** for the web-app. It will track how often the application is used and then turns off the introduction of the narrators.

## References

[artyom.js](https://sdkcarlos.github.io/sites/artyom.html)

[wtf_wikipedia.js](https://beta.observablehq.com/@spencermountain/wtf_wikipedia)

[responsiveVoice](https://responsivevoice.org/api/) 

[Mozilla Webspeech API](https://github.com/mdn/web-speech-api/tree/831ab0c97ac12b9af6c64089453d393df9773303)

[Wikipedia API docs](https://www.mediawiki.org/wiki/API:Main_page)

[Wikipedia API tutorial](https://freshman.tech/wikipedia-javascript/)
