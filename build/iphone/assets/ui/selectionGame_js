// various modules required
var contentView = require("ui/contentView");
var missedItemsView = require("ui/tableView");

module.exports = function() {

	// Format Variables
	var IOS_PROGRESS_BORDER_W = '3%';
	var IOS_PROGRESS_BORDER_R = '10%';
	var IOS_BORDER_RADIUS = '25%';
	var IOS_BORDER_WIDTH = '4%';

	var ANDROID_PROGRESS_BORDER_W = 5;
	var ANDROID_PROGRESS_BORDER_R = 30;
	var ANDROID_BORDER_RADIUS = 40;
	var ANDROID_BORDER_WIDTH = 5;

	var NUM_GUESSES_TO_END = 10;
	var IMAGES_TO_GUESS = 4;
	var GAME_VIEW_PERCENT = 0.6;
	var ANIMATION_COUNT = 0;
	var CORRECT_GUESSES = 0;
	var WRONG_BLINKS = 0;

	var ACCEPT_INPUT = false;

	var correctSound = Ti.Media.createSound({
		url : Ti.App.ASSETS_FOLDER.nativePath + '/Sounds/bing.mp3'
	});

	var wrongSound = Ti.Media.createSound({
		url : Ti.App.ASSETS_FOLDER.nativePath + '/Sounds/rattlesound.mp3'
	});

	//***************************************
	//************** GAME VIEW **************
	//***************************************
	var screenWidth = Titanium.Platform.displayCaps.getPlatformWidth();
	var screenHeight = Titanium.Platform.displayCaps.getPlatformHeight();
	var viewHeight = screenHeight * GAME_VIEW_PERCENT;

	var gameWindow = Titanium.UI.createView({
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/cube_background_h.png',
		top : '0%'
	});

	var wrongView = Titanium.UI.createView({
		top : '0%',
		bottom : '31%',
		backgroundColor : '#f00',
		opacity : 0.0,
		touchEnabled : false
	});

	// View to display table of missed items after game has been completed
	// hide and disable touch until in focus
	var endView = Titanium.UI.createView({
		backgroundColor : 'white',
		top : '0%',
		botttom : '0%',
		opacity : 0.0,
		data : [],
		touchEnabled : false
	});
	endView.hide();

	gameWindow.add(endView);
	gameWindow.add(wrongView);

	// Flag to en/disable additions to missedItems array
	var addToMissedList = true;
	// Stores correct items if missed
	var missedItems = [];

	gameWindow.addEventListener('android:back', function() {
		var activity = Titanium.Android.currentActivity;
		activity.finish();
		gameWindow.close();
	});

	// Array for holding all the buttons
	var choices = new Array(IMAGES_TO_GUESS);
	var images = new Array(IMAGES_TO_GUESS);

	// Variables for the correct picture, sound, and button index
	var correctChoiceArea, correctChoiceItem, sound, correctChoiceIndex;

	// Relative border size for the pictures
	var buffer = screenWidth * 0.015;

	// Starting position is the top left of the screen
	var xStart = buffer;
	var yStart = buffer;

	// Sizing for 2 pictures per row
	var buttonWidth = (screenWidth / 2.0) - (buffer * 2);

	// Sizing to use 60% of the screen for images
	var buttonHeight = (viewHeight / 2.0) - (buffer * 2);

	// Creating the buttons
	for (var i = 0; i < choices.length; ++i) {
		// Add a button to the button array
		choices[i] = Titanium.UI.createView({
			left : xStart,
			top : yStart,
			width : buttonWidth,
			height : buttonHeight,
			buttonIndex : i,
			opacity : 0.0
		});

		images[i] = Titanium.UI.createImageView({
			top : '0%',
			width : '100%',
			height : '100%',
			borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_WIDTH : IOS_BORDER_WIDTH),
			borderColor : '#000',
			buttonIndex : i,
			wordId : '',
			miamiId : '',
			room : '',
			touchEnabled : false
		});

		// Adds an event listener for the user's guess
		choices[i].addEventListener('click', function(e) {
			if (ACCEPT_INPUT) {
				checkAnswer(e);
			}
		});

		choices[i].add(images[i]);

		// Formatting the image locations
		if ((i % 2) != 0) {
			xStart = buffer;
			yStart += buttonHeight + (buffer * 2);
		} else {
			xStart += buttonWidth + (buffer * 2);
		}
	}

	populateButtons();

	// Adding the buttons to the view
	for (b in choices) {
		gameWindow.add(choices[b]);
	}

	//**********************************************************************************
	//****************************** Controls ******************************************
	//**********************************************************************************

	// Container for progress bar
	var progressBar = Titanium.UI.createView({
		top : '70%',
		left : '5%',
		height : '5%',
		width : '90%',
		borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_PROGRESS_BORDER_W : IOS_PROGRESS_BORDER_W),
		borderRadius : (Ti.App.OS_NAME === 'android' ? ANDROID_PROGRESS_BORDER_R : IOS_PROGRESS_BORDER_R),
		borderColor : '#000',
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/progressBackground.png',
		opacity : 0.0
	});

	// Success portion of the bar
	var progress = Titanium.UI.createImageView({
		top : '0%',
		height : '100%',
		width : screenWidth,
		left : -screenWidth,
		opacity : 0.7,
		backgroundColor : '#0f0'
	});

	var playButton = Titanium.UI.createButton({
		left : '10%',
		top : '75%',
		width : '30%',
		height : Titanium.Platform.displayCaps.getPlatformWidth() * 0.3,
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/graphics/button-play-red.png',
		opacity : 0.0
	});

	playButton.addEventListener('click', function(e) {
		if (ACCEPT_INPUT) {
			ACCEPT_INPUT = false;
			sound.play();
		}
	});

	var resetButton = Titanium.UI.createButton({
		right : '10%',
		top : '75%',
		width : '30%',
		height : Titanium.Platform.displayCaps.getPlatformWidth() * 0.3,
		opacity : 0.0,
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/graphics/button-reload-red.png'
	});

	resetButton.addEventListener('click', function() {
		resetGame();
	});

	var startButton = Titanium.UI.createButton({
		left : (screenWidth / 2) * 0.7,
		top : '35%',
		width : '30%',
		height : Titanium.Platform.displayCaps.getPlatformWidth() * 0.3,
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/graphics/button-play-red.png'
	});

	var tempReset = Titanium.UI.createButton({
		left : (screenWidth / 2) * 0.7,
		top : '35%',
		width : '30%',
		height : Titanium.Platform.displayCaps.getPlatformWidth() * 0.3,
		opacity : 0.0,
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/graphics/button-reload-red.png'
	});

	startButton.addEventListener('click', function(e) {
		correctSound.play();
		tempReset.opacity = 1.0;
		startButton.animate({
			transform : Ti.UI.create2DMatrix().translate(playButton.rect.x - startButton.rect.x, playButton.rect.y - startButton.rect.y),
			duration : 1000
		}, function(e) {
			ACCEPT_INPUT = true;
			playButton.opacity = 1.0;
			startButton.opacity = 0.0;
			gameWindow.remove(startButton);
			startButton = null;

			progressBar.animate({
				opacity : 1.0,
				duration : 500
			});

			for (var i = 0; i < IMAGES_TO_GUESS; ++i) {
				choices[i].animate({
					opacity : 1.0,
					duration : 500
				}, function(e) {
					sound.play();
				});
			}
		});

		tempReset.animate({
			transform : Ti.UI.create2DMatrix().translate(resetButton.rect.x - tempReset.rect.x, resetButton.rect.y - tempReset.rect.y),
			duration : 1000
		}, function(e) {
			resetButton.opacity = 1.0;
			tempReset.opacity = 0.0;
			gameWindow.remove(tempReset);
			tempReset = null;
		});
	});

	progressBar.add(progress);

	// Adding the controls to the window
	gameWindow.add(tempReset);
	gameWindow.add(progressBar);
	gameWindow.add(playButton);
	gameWindow.add(resetButton);
	gameWindow.add(startButton);

	//**********************************************************************************
	//**************************** Animations ******************************************
	//**********************************************************************************

	var correctAnimation_1 = Titanium.UI.createAnimation({
		transform : Ti.UI.create2DMatrix().rotate(180).scale(0.0, 0.0),
		duration : 500
	});

	correctAnimation_1.addEventListener('complete', function(e) {++ANIMATION_COUNT;

		if (ANIMATION_COUNT == IMAGES_TO_GUESS) {
			populateButtons();
			for (var i = 0; i < IMAGES_TO_GUESS; ++i) {
				choices[i].animate(correctAnimation_2);
			}
		}
	});

	var correctAnimation_2 = Titanium.UI.createAnimation({
		transform : (Ti.App.OS_NAME === 'android' ? Ti.UI.create2DMatrix().rotate(180, 0).scale(1.0, 1.0) : Ti.UI.create2DMatrix().scale(1.0, 1.0) ),
		duration : 500
	});

	correctAnimation_2.addEventListener('complete', function(e) {
		if (CORRECT_GUESSES != NUM_GUESSES_TO_END) {
			sound.play();
		}
	});

	var wrongAnimation_Red = Titanium.UI.createAnimation({
		opacity : 1.0,
		duration : 200
	});

	var wrongAnimation_Back = Titanium.UI.createAnimation({
		opacity : 0,
		duration : 200
	});

	wrongAnimation_Red.addEventListener('complete', function(e) {
		if (WRONG_BLINKS < 6) {++WRONG_BLINKS;
			wrongView.animate(wrongAnimation_Back);
		}
	});

	wrongAnimation_Back.addEventListener('complete', function(e) {
		if (WRONG_BLINKS < 5) {++WRONG_BLINKS;
			wrongView.animate(wrongAnimation_Red);
		} else {
			sound.play();
		}
	});

	// Reset Animation for choices
	var resetAnimation_1 = Ti.UI.createAnimation({
		opacity : 0.0,
		duration : 500
	});

	var resetAnimation_1_reverse = Ti.UI.createAnimation({
		opacity : 1,
		duration : 500
	});

	resetAnimation_1.addEventListener('complete', function() {++ANIMATION_COUNT;
		if (ANIMATION_COUNT == IMAGES_TO_GUESS) {
			populateButtons();
			for (var i = 0; i < IMAGES_TO_GUESS; ++i) {
				choices[i].animate(resetAnimation_1_reverse);
			}
			sound.play();
			ANIMATION_COUNT = 0;
		}
	});

	// Reset Animation for progress bar
	var resetAnimation_2 = Ti.UI.createAnimation({
		left : -screenWidth,
		duration : 500
	});

	resetAnimation_2.addEventListener('complete', function() {
		progress.left = -screenWidth;
		CORRECT_GUESSES = 0;
	});

	//*****************************************
	//************** FUNCTIONS ****************
	//*****************************************

	// Places images on the buttons
	function populateButtons() {
		// Set flag to enable adding items to missed List
		addToMissedList = true;

		// Selecting a random picture and placement
		correctChoiceArea = (Math.floor(Math.random() * Ti.App.parsedFile.areas.length));
		correctChoiceItem = (Math.floor(Math.random() * Ti.App.parsedFile.areas[correctChoiceArea].info.length));
		correctChoiceIndex = (Math.floor(Math.random() * choices.length));

		var randomArea;
		var randomInfo;

		// Arrays for flags to determine already selected wrong answers
		var chosenAreaCheck = new Array(Ti.App.parsedFile.areas.length);
		var chosenInfoCheck = new Array(Ti.App.parsedFile.areas[correctChoiceArea].info.length);

		// Setting the background images for the buttons
		for (var i = 0; i < choices.length; ++i) {
			if (i != correctChoiceIndex) {
				// Choosing random numbers until they aren't the same
				// as the correct image
				do {
					randomArea = (Math.floor(Math.random() * Ti.App.parsedFile.areas.length));
					randomInfo = (Math.floor(Math.random() * Ti.App.parsedFile.areas[randomArea].info.length));
				} while( (randomArea == correctChoiceArea) && (randomInfo == correctChoiceItem) || //Checking correct choice repeat
				(chosenAreaCheck[randomArea] == 1 && chosenInfoCheck[randomInfo] == 1) );//Checking wrong choice repeat

				// Setting the repeat flag
				chosenAreaCheck[randomArea] = 1;
				chosenInfoCheck[randomInfo] = 1;

				// Add a wrong button to the button array
				images[i].image = Ti.App.ASSETS_FOLDER.nativePath + Ti.App.parsedFile.areas[randomArea].info[randomInfo].image;
			} else {
				// Adding the right button to the array
				images[i].image = Ti.App.ASSETS_FOLDER.nativePath + Ti.App.parsedFile.areas[correctChoiceArea].info[correctChoiceItem].image;

				// Add properties to correct image so endView can display contentView of correct item
				images[i].room = Ti.App.noEnglish == 1 ? Ti.App.parsedFile.areas[correctChoiceArea].miamiTitle : Ti.App.parsedFile.areas[correctChoiceArea].title;
				images[i].wordId = Ti.App.parsedFile.areas[correctChoiceArea].info[correctChoiceItem].id;
				images[i].miamiId = Ti.App.parsedFile.areas[correctChoiceArea].info[correctChoiceItem].word.miami;
			}
		}

		gameWindow.backgroundColor = '#fff';

		// Creating a sound to play
		sound = Ti.Media.createSound({
			url : Ti.App.ASSETS_FOLDER.nativePath + Ti.App.parsedFile.areas[correctChoiceArea].info[correctChoiceItem].word.mp3
		});

		sound.addEventListener('complete', function() {
			ACCEPT_INPUT = true;
		});
	}

	// Function for reacting to the user's guess
	function checkAnswer(e) {
		ACCEPT_INPUT = false;
		if (e.source.buttonIndex == correctChoiceIndex) {
			correctSound.play();

			images[e.source.buttonIndex].image = Ti.App.ASSETS_FOLDER.nativePath + '/Images/check.png';
			
			progress.animate({
				left : (progress.left + screenWidth*(1.0/(NUM_GUESSES_TO_END+1))),
				duration : 500
			});
			
			ANIMATION_COUNT = 0;
			for (var i = 0; i < IMAGES_TO_GUESS; ++i) {
				choices[i].animate(correctAnimation_1);
			}
			
			if (++CORRECT_GUESSES == NUM_GUESSES_TO_END) {
				endGame();
			}
			
		} else {
			var miss = [images[correctChoiceIndex].wordId, images[correctChoiceIndex].miamiId, images[correctChoiceIndex].image, images[correctChoiceIndex].room];
			// Check flag to allow adds to list - if true add item and set flag to false
			if (addToMissedList) {
				missedItems.push(miss);
				addToMissedList = false;
			}
			images[e.source.buttonIndex].image = Ti.App.ASSETS_FOLDER.nativePath + '/Images/wrong.png';

			wrongSound.play();
			WRONG_BLINKS = 0;
			wrongView.animate(wrongAnimation_Red);
		}
	}

	/**
	 * Occurs after User has finished the game
	 */
	function endGame() {
		
		var endImageView = new missedItemsView(missedItems, "missed");	
		endView.add(endImageView);
		
		// Display endView
		endView.touchEnabled = true;
		endView.show();

		// Hide all other views when missedItems are being displiayed to avoid
		// touch/animation interaction
		for (b in choices) {
			choices[b].touchEnabled = false;
			choices[b].hide();
			images[b].touchEnables = false;
			images[b].hide();
		}
		
		gameWindow.remove(resetButton);
		resetButton = null;
		gameWindow.remove(playButton);
		playButton = null;
		gameWindow.remove(progressBar);
		progressBar = null;

		endView.animate({
			opacity : 1.0,
			duration : 500
		});
	}

	/**
	 * Resets the game
	 */
	function resetGame() {
		// Fade Out/In Choices
		ANIMATION_COUNT = 0;
		missedItems = [];
		for (b in choices) {
			choices[b].animate(resetAnimation_1);
		}
		// Reset progress in progress bar
		progress.animate(resetAnimation_2);
	}


	gameWindow.addEventListener('focus', function() {
		ACCEPT_INPUT = false;
		sound.play();
	});

	return gameWindow;
};
