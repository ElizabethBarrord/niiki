/* * A basic starting point for your application showing how to
* instantiate and configure the Scandit Barcode Scanner SDK * */

//TODO: fix if scanned code not in dictionary

module.exports = function() {

	function getRoom(str) {
		var rooms = Ti.App.parsedFile.areas;
		for (var i = 0; i < rooms.length; i++) {
			var items = Ti.App.parsedFile.areas[i].info;
			for (var j = 0; j < items.length; j++) {
				if (items[j].id === str) {
					return rooms[i].title;
				}
			}
		}
		return null;
	}
	
	var window = Titanium.UI.createWindow({
		title : 'QR Scanner',
		backgroundColor : '#fff',
	});


	// Closes the window when the back button is pressed
	window.addEventListener('android:back', function() {
		if (window != null) {
			window.hide();
			picker.reset();
			window.remove(picker);
			window.close();
			window = null;
		} else {
			var activity = Titanium.Android.currentActivity;
			activity.finish();
		}
	});
	
	if (Ti.App.OS_NAME === 'android') {
		window.open();
	} else {
		nav.openWindow(window);
	}
};
