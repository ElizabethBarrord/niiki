// Various Modules needed
var pronunciationsView = require("ui/pronunciationsView");
var flashcardsPractice = require("ui/flashcardsPractice");
var storyBook = require("ui/storyBook");
/*
 * Module containing View for the practice screen.
 * Contains navigation buttons for the story, cards, and pronunciations functionality
 */
module.exports = function() {

	// Formatting Variables
	var IOS_BORDER_RADIUS = '25%';
	var IOS_BORDER_WIDTH = '4%';
	var ANDROID_BORDER_RADIUS = 40;
	var ANDROID_BORDER_WIDTH = 5;

	// *****************************************************************************
	// *****************************************************************************
	// **************************INITIALIZE UI ELEMENTS*****************************
	// *****************************************************************************
	// *****************************************************************************

	var self = Ti.UI.createView({
		backgroundColor : '#ffffff'
	});

	// Top half of the UI - holds help button possible future features
	var screen = Ti.UI.createView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : '0%',
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/practice_background.png',
		zindex : 10
	});

	var cards = Ti.UI.createView({
		height : '30%',
		width : '60%',
		top : '2%',
		borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_WIDTH : IOS_BORDER_WIDTH),
		borderRadius : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_RADIUS : IOS_BORDER_RADIUS)
	});

	var story = Ti.UI.createView({
		height : '30%',
		width : '60%',
		bottom : '1%',
		borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_WIDTH : IOS_BORDER_WIDTH),
		borderRadius : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_RADIUS : IOS_BORDER_RADIUS)
	});

	var pronunciations = Ti.UI.createView({
		height : '30%',
		width : '60%',
		bottom : '34%',
		borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_WIDTH : IOS_BORDER_WIDTH),
		borderRadius : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_RADIUS : IOS_BORDER_RADIUS)
	});

	// *****************************************************************************
	// *****************************************************************************
	// **************************   EVENT LISTENERS   ******************************
	// *****************************************************************************
	// *****************************************************************************

	// Action performed cards button/box is clicked
	cards.addEventListener('click', function() {
		var win = Ti.UI.createWindow({
			title : 'Flashcards',
			backgroundColor : 'white'
		});
		win.add(new flashcardsPractice());
		if (Ti.App.OS_NAME === 'android') {
			win.open({
				modal : true
			});
		} else {
			nav.openWindow(win);
		}
	});

	// Action performed when storybook button/box is clicked
	story.addEventListener('click', function() {
		var win = Ti.UI.createWindow({
			title : 'Bookshelf',
			backgroundColor : 'white'
		});
		win.add(new storyBook());
		if (Ti.App.OS_NAME === 'android') {
			win.open({
				modal : true
			});
		} else {
			nav.openWindow(win);
		}
	});

	//Action performed when practice button is clicked
	pronunciations.addEventListener('click', function() {
		var win = Ti.UI.createWindow({
			title : 'Pronunciation Guide',
			backgroundColor : 'white'
		});
		win.add(new pronunciationsView());
		if (Ti.App.OS_NAME === 'android') {
			win.open({
				modal : true
			});
		} else {
			nav.openWindow(win);
		}
	});
	// ********************* ANDROID SPECIFIC EVENT LISTENER ***********************
	// 				     --CLOSE WINDOW ON ANDROID BACK BUTTON--
	self.addEventListener('android:back', function() {
		var activity = Titanium.Android.currentActivity;
		activity.finish();
		self.close();
	});

	// *****************************************************************************
	// *****************************************************************************
	// *************************   SET UP UI ELEMENTS  *****************************
	// *****************************************************************************
	// *****************************************************************************

	screen.add(story);
	screen.add(pronunciations);
	screen.add(cards);

	// Add sections to main view
	self.add(screen);

	self.addEventListener('android:back', function() {
		var activity = Titanium.Android.currentActivity;
		activity.finish();
		self.close();
	});

	// return main view
	return self;
};
