/*
 * Default window for Myaamia App
 */

Ti.App.noEnglish = 1;
Ti.App.OS_NAME = Ti.Platform.getOsname();
Ti.App.ASSETS_FOLDER = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'assets');	
Ti.App.configFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'config.json');

// Various modules needed
var homeView = require("ui/home");

// OS SPECIFIC FUNCTIONS -- programmatically set portrait only for android
if (Ti.App.OS_NAME === 'android') {
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		Ti.Android.currentActivity.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
	});
}

// Default window to display tableView
var root;
var win = Ti.UI.createWindow({
	title : JSON.parse(Ti.App.configFile.read().text).config.appName,
	exitOnclose : true
});

// Looping a silent sound in order to have control of the 
// hardware volume buttons
var volumeController = Ti.Media.createSound({
	url: Ti.App.ASSETS_FOLDER.nativePath + '/Sounds/silence.mp3'
});
volumeController.play();
volumeController.addEventListener('complete', function(){ volumeController.play(); });

var homeTable = new homeView();

win.add(homeTable);

if (Ti.App.OS_NAME === 'android') {
	win.open();
} else {
	
	root = Ti.UI.createWindow();
	var nav = Titanium.UI.iOS.createNavigationWindow({
		window : win
	});
	nav.open();
	//var nav = Ti.UI.iPhone.createNavigationGroup({
	//	window : win
	//});
	//root.add(nav);
	//root.open();
}