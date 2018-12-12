Combining Moz Webspeech API with responsiveVoice
===================================================

This snippet allows you to search for articles of the Wikipedia using your voice.
No node installation required. It makes use of the Mozilla Webspeech for recognition.
For the sake of simplicity i used responsiveVoice for Text2Speech.

**Features**
Lists the first page of search results of any term
Reads out the first five (adjustable) article titles
Is able to read the first paragraph of the articles

**Know issue**
The 'paragraph reading feature' is commented out by default.
This is because i got an issue with the processing of punctuation.
Often the first result isn't recognized correctly and you get the search result for 
*undefined*. I wasn't able to solve that. 

**References**
-[responsiveVoice](https://responsivevoice.org/api/)
-[Mozilla Webspeech](https://github.com/mdn/web-speech-api/tree/831ab0c97ac12b9af6c64089453d393df9773303)
-[Wikipedia API](https://freshman.tech/wikipedia-javascript/)
