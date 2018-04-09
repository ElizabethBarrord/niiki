module.exports = function() {

	var view = Ti.UI.createScrollView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		scrollType : 'vertical',
		showVerticalScrollIndicator : true,
		layout : 'vertical',
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/contentBackground.png',
		scale : 0
	});

	// var p0 = Ti.UI.createImageView({
		// height : '100%',
		// width : '100%',
		// image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/pro_0.png'
	// });

	var p1 = Ti.UI.createImageView({
		height : '100%',
		width : '100%',
		image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/pro_1.png'
	});
	var p2 = Ti.UI.createImageView({
		height : '100%',
		width : '100%',
		image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/pro_2.png',
	});
	var p3 = Ti.UI.createImageView({
		height : '100%',
		width : '100%',
		image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/pro_3.png',
	});
	// view.add(p0);
	view.add(p1);
	view.add(p2);
	view.add(p3);
	view.addEventListener('android:back', function() {
		var activity = Titanium.Android.currentActivity;
		activity.finish();
		self.close();
	});

	return view;
};
