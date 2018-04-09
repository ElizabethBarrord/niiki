// Various Modules needed
var roomsTableView = require("ui/tableView");
var qrScanner = require("ui/scanditView");
var game = require("ui/selectionGame");
var roomSelectionView = require("ui/roomSelection");
var practiceView = require("ui/practiceView.js");
/*
 * Module containing View for the home screen.
 * Contains main navigation buttons for the App.
 */
var homeView = function() {

	// Formatting Variables
	var IOS_BORDER_RADIUS = '25%';
	var IOS_BORDER_WIDTH = '4%';
	var ANDROID_BORDER_RADIUS = 40;
	var ANDROID_BORDER_WIDTH = 5;
	var IS_HELP_ACTIVE = false;

	var TEXT = {
		LANG : 'Press button to enable or disable english text in the application.\n',
		PRAC : 'Press button to learn with flash cards, a pronunciation guide, and a story.\n',
		GLOS : 'Press button to browse and learn Myaamian terms sorted by rooms.\n',
		GAME : 'Press button and select the image that matches the sound being played. Guess 10 words correctly and YOU WIN! Words missed will be displayed at the end.\n'
	};

	// Locally Store dictionary.json reference
	var file = Titanium.Filesystem.getFile(Ti.App.ASSETS_FOLDER.nativePath, 'dictionary.json');
	Ti.App.parsedFile = JSON.parse(file.read().text);

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
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/house_background.png',
		zindex : 10
	});

	// Help Display
	var helpDisplay = Ti.UI.createView({
		layout : 'vertical',
		height : '23%',
		width : '68%',
		top : '0%',
		borderColor : 'red',
		borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_WIDTH : IOS_BORDER_WIDTH),
		borderRadius : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_RADIUS : IOS_BORDER_RADIUS),
		backgroundColor : '#FFFFFF',
		visible : false,
		zindex : 20
	});

	var helpTitle = Ti.UI.createLabel({
		text : 'Help',
		top : '5%',
		font : {
			fontSize : '14dp',
			fontWeight : 'bold'
		}
	});

	var helpScroll = Ti.UI.createScrollView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		scrollType : 'vertical',
		showVerticalScrollIndicator : true,
		layout : 'vertical',
		scale : 0
	});

	var helpText = Ti.UI.createLabel({
		text : 'Click on a Button for help',
		top : '5%',
		left : '5%',
		right : '5%',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : '12dp'
		}
	});

	var practice = Ti.UI.createView({
		height : '50%',
		width : '40.5%',
		bottom : '4%',
		left : '6%',
		borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_WIDTH : IOS_BORDER_WIDTH),
		borderRadius : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_RADIUS : IOS_BORDER_RADIUS),
	});

	var gameBtn = Ti.UI.createView({
		height : '50%',
		width : '40.5%',
		bottom : '4%',
		right : '6%',
		borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_WIDTH : IOS_BORDER_WIDTH),
		borderRadius : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_RADIUS : IOS_BORDER_RADIUS),
	});

	var glossary = Ti.UI.createView({
		height : '35%',
		width : '70%',
		top : '6%',
		borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_WIDTH : IOS_BORDER_WIDTH),
		borderRadius : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_RADIUS : IOS_BORDER_RADIUS),
	});
	// ************************** NAVIGATION BUTTONS *****************************
	// English Button - Turn English On/Off
	// var english = Ti.UI.createImageView({
	// height : '9%',
	// width : 'auto',
	// image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/arrow_flag.png',
	// top : '0%',
	// right : '80%'
	// });
	var cardLabel = Ti.UI.createLabel({
		text : 'English ON',
		top : '8%',
		right : '75%',
		font : {fontSize : '12dp', fontWeight : 'bold'},
		color: '#000',
	});
	
	var english = Ti.UI.createSwitch({
		value : false,
		height : '9%',
		top : '2%',
		right : '80%',
		width : 200,
		height : 120
	});

	english.addEventListener('change', function(e) {
		Ti.API.info('Switch value: ' + english.value);
		if (english.value == true) {
			cardLabel.text = "English ON";
			Ti.App.noEnglish = 0;
		} else {
			cardLabel.text = "English OFF";
			Ti.App.noEnglish = 1;
		}
	});

	// Help Button
	var helpBtn = Ti.UI.createImageView({
		height : '8%',
		width : 'auto',
		image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/help_grey.png',
		top : '1%',
		left : '80%'
	});

	// *****************************************************************************
	// *****************************************************************************
	// **************************   EVENT LISTENERS   ******************************
	// *****************************************************************************
	// *****************************************************************************

	// Action performed rooms button/box is clicked
	glossary.addEventListener('click', function() {
		if (IS_HELP_ACTIVE) {
			helpTitle.text = "Rooms", helpText.text = TEXT.GLOS;
			helpText.color = 'black';
			helpTitle.color = 'black';
		} else {
			// window to be opened upon clicking the 'glossary' image
			var win = Ti.UI.createWindow({
				title : 'Rooms',
				backgroundColor : 'white'
			});
			// Add View from roomSelection.js
			win.add(new roomSelectionView());

			if (Ti.App.OS_NAME === 'android') {
				win.open({
					modal : true
				});
			} else {
				nav.openWindow(win);
			}
		}
	});

	//Action performed when practice button is clicked
	practice.addEventListener('click', function() {
		if (IS_HELP_ACTIVE) {
			helpTitle.text = "Practice", helpText.text = TEXT.PRAC;
			helpText.color = 'black';
			helpTitle.color = 'black';
		} else {
			// window to be opened upon clicking the 'practice' image
			var win = Ti.UI.createWindow({
				title : 'Practice',
				backgroundColor : 'white'
			});
			// Add View from practiceView.js
			win.add(new practiceView());

			if (Ti.App.OS_NAME === 'android') {
				win.open({
					modal : true
				});
			} else {
				nav.openWindow(win);
			}
		}
	});

	// Action performed when selectionGame button/box is clicked
	gameBtn.addEventListener('click', function() {
		if (IS_HELP_ACTIVE) {
			helpTitle.text = "Game", helpText.text = TEXT.GAME;
			helpText.color = 'black';
			helpTitle.color = 'black';
		} else {
			var win = Ti.UI.createWindow({
				title : 'Game Time!',
				backgroundColor : 'white'
			});
			win.add(new game());
			if (Ti.App.OS_NAME === 'android') {
				win.open({
					modal : true
				});
			} else {
				nav.openWindow(win);
			}
		}
	});

	// Action performed when english button/box is clicked
	// english.addEventListener('click', function() {
		// if (IS_HELP_ACTIVE) {
			// helpTitle.text = "Language", helpText.text = TEXT.LANG;
			// helpText.color = 'black';
			// helpTitle.color = 'black';
		// } else {
			// english.image = (Ti.App.noEnglish == 0 ? Ti.App.ASSETS_FOLDER.nativePath + '/Images/arrow_flag.png' : Ti.App.ASSETS_FOLDER.nativePath + '/Images/arrow_crane.png' );
			// Ti.App.noEnglish = (Ti.App.noEnglish == 1 ? 0 : 1);
		// }
	// });

	var elements = [game, practice, glossary];

	// Action performed when help button is clicked
	helpBtn.addEventListener('click', function() {
		helpDisplay.visible = !helpDisplay.getVisible();
		IS_HELP_ACTIVE = !IS_HELP_ACTIVE;
		helpTitle.text = 'Help';
		helpText.text = 'Click on a Button Below for help\n\n';
		helpText.color = 'red';
		helpTitle.color = 'red';
		helpBtn.image = IS_HELP_ACTIVE ? Ti.App.ASSETS_FOLDER.nativePath + '/Images/graphics/button-exit-red.png' : Ti.App.ASSETS_FOLDER.nativePath + '/Images/help_grey.png';
		for (var i = 0; i < elements.length; i++) {
			elements.borderColor = IS_HELP_ACTIVE ? 'red' : 'transparent';
			;
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

	screen.add(gameBtn);
	screen.add(practice);
	screen.add(glossary);
	screen.add(cardLabel);

	// Help display
	helpScroll.add(helpText);

	helpDisplay.add(helpTitle);
	helpDisplay.add(helpScroll);

	// Add help to topHalf
	screen.add(helpBtn);
	screen.add(english);
	// Add sections to main view
	self.add(screen);
	self.add(helpDisplay);

	// return main view
	return self;
};

module.exports = homeView;
