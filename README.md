# Favorite Fonts (Google Fonts clone)

### A **[Chingu](https://www.chingu.io)** Tier 1 Solo Project 

## Overview

![Favorite Fonts homepage](/docs/image/Capture&#32;d’écran&#32;2020-01-28&#32;à&#32;08.46.15.png)

Favorite Fonts is a single page application that mimics some of the features of Google Fonts.

## Technology

Vanilla JavaScript, CSS, HTML

## Note 
My choice was to work in pure Vanilla JavaScript before adding any framework / library. However level 2 requirements have been applied

## Requirements

### Structure

- [x]  Header with minor navigation (Logo and Catalog/Featured/Articles/About link list)
- [x]  Nav with Major navigation / page-manipulation (search, custom text, font-size, dark/light mode, grid/list mode, and reset)
- [x]  Main section to contain the font cards
- [x]  Font cards which display the Font Name, the font category, the sample text, and an add button
- [x]  Footer section with your developer information

### Style

- [x] Sample text in each card should be displayed in the corresponding font
- [x] Buttons/links should be evident (make sure the cursor changes, etc.)
- [x] Implement a way to handle overflow from sample text in font cards, as the font size is adjustable
  
###  Functionality

- [x] Text typed into the custom text (type something) box should immediately change the sample text displayed in each font card
- [x] The sample text should return to the default sample if the input box (type something) no longer has any input (ex. input == "")
- [x] Font size chooser should have at least four sizes and should immediately change the sample text font size in each font card
- [x] Implement the clickable 'reset' icon on the far right of the major navigation; it should make the page appear as if the user reloaded the page (do not actually reload the page)
##### (Requirements from Tier 2) 
- [x] On load, the page should display fonts sorted by current popularity, as returned by the Google Fonts Developer API (see below); this call should be server-side
- [x]  The search feature should be fully functional and display matching fonts (it's up to you if you want to do this via a 'submit' or through onchange)
- [x] When the search input is cleared (via reset button or manually), the fonts should automaticaly display sorted by poplarity again
- [x] Fonts from the Developer API should be retrieved on the back-end and sent to the client (see below)
  
### Extras (Not Required)

- [x] Include a back-to-top button that allows users to scroll to the top once the top of the page is out of view
- [x] Make your design fully responsive (small/large/portrait/landscape, etc.)
- [x] Implement the light/dark mode toggle buttons
- [x] Implement the change display icon so you can flip between a grid and list layout for the font cards
- [x] Add or remove your favorites fonts to your local storage with the add/remove button

## Installation 
```
git clone https://github.com/Chingu-Solo/solo-koala-105.git 
cd <your directory>/solo-koala-105
create a config.js file and add your API Key in it as so: 
export const config = {
	apiKey: <your Google Font API Key>
};```
