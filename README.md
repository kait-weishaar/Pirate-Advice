# ADVICE FROM A SWASHBUCKLER

## PURPOSE
The main goal of the app is to provide light-hearted advice to the user. The user inputs a term in the searchbar and receives advice that has been translated to pirate speak, as well as a pirate gif. The app features dynamically generated html and css, utilizes the mobile-first css framework bulma, and calls on three third party APIS: Advice Slip API, Giffy API, and Fun Translations API. The most interesting aspect of the project is that we are passing information from one API to another before displaying the response to the page. When a use inputs a search term, that term is used to get advice from the advice slip api, and that advice is then passed to the fun translations api, which turns it into pirate speak. A separate call is made to the giffy api for a randomly selected pirate gif. Users are given the opportunity to save a piece of advice they like, and this saves the advice to local storage and generates a button that can be displayed on the click of the favorites button. Once displayed to the page, the favorites buttons can be clicked to access saved searches.

## Challenges and Areas for Improvement
While the api interactions went surprisingly smoothly due to simplicity of the data being handled, handling the persistent data in local storage was a bit of a challenge. 

## BUILT WITH: 
The app is built with HTML, CSS, JAVASCRIPT, and the BULMA css framework. It accesses Advice Slip API, Giffy API, and Fun Translations API.

## Website 
https://kait-weishaar.github.io/Project-1/


