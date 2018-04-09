// Various Modules needed
var tableView = require("ui/tableView");

module.exports = function() {
	
	var config = JSON.parse(Ti.App.configFile.read().text);

	// ******************************** INITIALIZE UI ELEMENTS *******************************
	// Set Module constants
	var NUM_BUTTONS = config.config.numberOfAreas;
	var NUM_ROWS = Math.ceil(NUM_BUTTONS / 2.0);
	var ICON_DIRECTORY = Ti.App.ASSETS_FOLDER.nativePath + '/Images/Icons/';
	var ROW_HEIGHT = Ti.Platform.displayCaps.platformHeight * 0.28;
	var ROW_WIDTH = Ti.Platform.displayCaps.platformWidth;
	var OPENING_WINDOW = false;

	// Root Window Selects Room
	var root = null;
	
	if(NUM_BUTTONS<=6) {
		root = Ti.UI.createView({
			contentWidth : Ti.Platform.displayCaps.platformWidth,
			contentHeight : (0.5 + NUM_ROWS) * ROW_HEIGHT,
			layout : 'vertical',
			backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/cube_background_h.png'
		});
	} else {
		root = Ti.UI.createScrollView({
			contentWidth : Ti.Platform.displayCaps.platformWidth,
			contentHeight : (0.5 + NUM_ROWS) * ROW_HEIGHT,
			scrollType : 'vertical',
			showVerticalScrollIndicator : true,
			layout : 'vertical',
			backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/cube_background_h.png'
		});
	}

	// Declare Module variables
	var buttonRows = [];
	var buttons = [];
	var roomId = [];
	var miamiId = [];
	var roomWins = [];
	var tableContents = [];
	var roomIcons = [];
	var invertIcons = [];

	// Retrieve room names - format to match icon name and add to roomId array
	for (var i = 0; i < Ti.App.parsedFile.areas.length; i++) {
		roomId.push((Ti.App.parsedFile.areas[i].title).replace(" ", "_"));
		miamiId.push(Ti.App.parsedFile.areas[i].miamiTitle);
	}
	for (var i = 0; i < Ti.App.parsedFile.areas.length; i++) {
		var imgFile = Titanium.Filesystem.getFile(ICON_DIRECTORY + roomId[i] + ".png");
		var inv = Titanium.Filesystem.getFile(ICON_DIRECTORY + roomId[i] + "_invert.png");
		roomIcons.push(imgFile.read());
		invertIcons.push(inv.read());
	}

	// Create button for each room and add to buttons array
	for (var i = 0; i < NUM_ROWS; i++) {
		buttonRows.push(Ti.UI.createView({
			layout : 'horizontal',
			height : ROW_HEIGHT,
			width : ROW_WIDTH,
			top : '1%'
		}));
	}

	// Create ImageView for each button
	for (var i = 0; i < NUM_BUTTONS; i++) {
		buttons.push(Ti.UI.createImageView({
			id : roomId[i],
			selected : invertIcons[i],
			image : roomIcons[i],
			height : ROW_HEIGHT,
			width : ROW_WIDTH * 0.49,
			left : '0.5%',
			borderColor : 'black',
			borderRadius : 5,
			borderWidth : 1
		}));

		tableContents[i] = [];
		var room;

		roomWins.push(Ti.UI.createWindow({
			title : (Ti.App.noEnglish == 1 ? miamiId[i] : roomId[i].replace("_", " ")),
			backgroundColor : 'white'
		}));

		// Find selected room from this id
		for (var j = 0; j < Ti.App.parsedFile.areas.length; j++) {
			if (Ti.App.parsedFile.areas[j].title == roomId[i].replace("_", " ")) {
				room = Ti.App.parsedFile.areas[j];
			}
		}

		// Grow tableContents array with elements of room
		for (var j = 0; j < room.info.length; j++) {
			var imgFile = Titanium.Filesystem.getFile(Ti.App.ASSETS_FOLDER.nativePath + room.info[j].image);
			var imgBlob = imgFile.read();
			
			tableContents[i].push([room.info[j].word.english, room.info[j].word.miami, imgBlob]);
		}
		var roomContent = tableView(tableContents[i], roomId[i].replace("_", " "));
		roomWins[i].add(roomContent);
	}

	// ******************************** EVENT LISTENERS *******************************

	for (var i = 0; i<roomWins.length; i++) {
		roomWins[i].addEventListener('close', function() {
			OPENING_WINDOW = false;
		});
	}

	// Event Listeners for each button
	for (var i = 0; i < NUM_BUTTONS; i++) {
		
		// Decrease Opacity on touchstart
		buttons[i].addEventListener('touchstart', function(e) {
			var tmp = this.image;
			this.image = this.selected;
			this.selected = tmp;
		});

		buttons[i].addEventListener('touchend', function(e) {

			// Retrieve elemnts from dictionary.json for selected room
			var tmp = this.image;
			this.image = this.selected;
			this.selected = tmp;
			if (!OPENING_WINDOW) {
				OPENING_WINDOW = true;
				if (Ti.App.OS_NAME === 'android') {
					roomWins[buttons.indexOf(this)].open({
						modal : true
					});
				} else {
					nav.openWindow(roomWins[buttons.indexOf(this)]);
				}
			}
		});

		// Increase Opacity on touchend
		buttons[i].addEventListener('touchcancel', function(e) {
			this.fireEvent('touchstart');
		});

	}

	// ******************************** ADD BUTTONS TO ROOT *******************************

	for (var i = 0; i < NUM_BUTTONS; i++) {
		buttonRows[i % NUM_ROWS].add(buttons[i]);
	}

	for (var i = 0; i < NUM_ROWS; i++) {
		root.add(buttonRows[i]);
	}

	root.addEventListener('android:back', function() {
		var activity = Titanium.Android.currentActivity;
		activity.finish();
		self.close();
	});

	return root;
};