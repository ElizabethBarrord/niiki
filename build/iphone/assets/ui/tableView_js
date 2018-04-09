/*
* Display the different rooms available as table sections
*/

// Various Modules needed
var contentView = require("ui/contentView");

// Window to be exported:
//		rowList = (String Array) = [english, miami, imagepath]
//		header  = (String) title of table
var tableView = function(rowList, header) {

	// ******************************** INITIALIZE UI ELEMENTS *******************************

	// Set Module constants
	var NUM_BUTTONS = rowList.length;
	var NUM_ROWS = Math.ceil(NUM_BUTTONS / 2);
	var ROW_HEIGHT = Ti.Platform.displayCaps.platformHeight / 4;
	var ROW_WIDTH = Ti.Platform.displayCaps.platformWidth;
	var OPENING_WINDOW = false;

	// Declare Module variables
	var tmpFiles = [];
	var buttonRows = [];
	var buttons = [];
	var roomId = [];

	// Root Window Selects Room
	var root = Ti.UI.createScrollView({
		contentWidth : Ti.Platform.displayCaps.platformWidth,
		contentHeight : (0.5 + NUM_ROWS) * ROW_HEIGHT,
		scrollType : 'vertical',
		showVerticalScrollIndicator : true,
		layout : 'vertical',
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/cube_background_h.png'
	});

	// Create button for each item and add to buttons array
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
			id : "" + rowList[i][1],
			engId : rowList[i][0],
			image : rowList[i][2],
			room : rowList[i][3],
			height : ROW_HEIGHT,
			width : ROW_WIDTH * 0.49,
			left : '0.5%',
			borderColor : 'black',
			borderRadius : 5,
			borderWidth : 1
		}));
	}

	// ******************************** EVENT LISTENERS *******************************

	root.addEventListener('android:back', function() {
		var activity = Titanium.Android.currentActivity;
		activity.finish();
		self.close();
	});

	// Event Listeners for each button
	for (var i = 0; i < NUM_BUTTONS; i++) {

		// Retrieve elements from dictionary.json for selected room
		buttons[i].addEventListener('click', function(e) {

			if (!OPENING_WINDOW) {
				OPENING_WINDOW = true;
				var win = Ti.UI.createWindow({
					title : Ti.App.noEnglish == 1 ? this.id : this.engId,
					backgroundColor : 'white',
					layout : "vertical"
				});
				win.addEventListener('close', function() {
					OPENING_WINDOW = false;
				});
				var content = new contentView((header != "missed" ? header : this.room), this.id);
				win.add(content);
				if (Ti.App.OS_NAME === 'android') {
					win.open({
						modal : true
					});
				} else {
					//nav.open(win);
					nav.openWindow(win);
				}
			}
		});
	}

	// ******************************** ADD BUTTONS TO ROOT *******************************

	for (var i = 0; i < NUM_BUTTONS; i++) {
		buttonRows[i % NUM_ROWS].add(buttons[i]);
	}

	for (var i = 0; i < NUM_ROWS; i++) {
		root.add(buttonRows[i]);
	}

	return root;
};

module.exports = tableView;
