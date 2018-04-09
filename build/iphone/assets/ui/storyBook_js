module.exports = function() {
	if (Ti.App.OS_NAME === 'android') {

		var buttonArea = Ti.UI.createView({
			width : 'auto',
			height : Ti.Platform.displayCaps.platformHeight * 0.04,
			layout : 'horizontal',
			top : '0',
			backgroundColor : 'white'
		});

		var label = Ti.UI.createLabel({
			color : 'black',
			text : 'Eehonci Kiintoohki Pyaawaaci Myaamiaki',
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			top : 0,
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			backgroundColor : 'white'
		});

		var self = Ti.UI.createScrollView({
			contentWidth : 'auto',
			contentHeight : 'auto',
			scrollType : 'vertical',
			top : '0%',
			showVerticalScrollIndicator : true,
			layout : 'vertical',
			backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/contentBackground.png',
			scale : 0,
		});

		var p1 = Ti.UI.createImageView({
			height : '100%',
			width : '100%',
			image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/Storybook/story_myammian.png'
		});

		var p2 = Ti.UI.createImageView({
			height : '100%',
			width : '100%',
			image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/Storybook/story_english.png'
		});

		/**************/
		var startStopButton = Ti.UI.createButton({
			title : 'Start',
			color : 'blue',
			top : Ti.Platform.displayCaps.platformHeight * 0.01,
			button : Ti.Platform.displayCaps.platformHeight * 0.01,
			left : '15',
			right : '15',
			width : 'auto',
			height : Ti.Platform.displayCaps.platformHeight * 0.022,
			backgroundColor : 'white',
			font : {
				fontSize : '14',
			}
		});

		buttonArea.add(startStopButton);

		var playing = false;
		startStopButton.addEventListener('click', function() {
			var phrase_1;
			try {
				phrase_1 = Ti.Media.createSound({
					url : Ti.App.ASSETS_FOLDER.nativePath + '/Images/Storybook/Myaamia_Coming_Out_Story.mp3',
					preload : false
				});
			} catch (e) {
				phrase_1 = Ti.Media.createAudioPlayer({
					url : Ti.App.ASSETS_FOLDER.nativePath + '/Images/Storybook/Myaamia_Coming_Out_Story.mp3',
					allowBackground : true
				});
			}
			if (!playing) {
				phrase_1.play();
				self.addEventListener('close', function() {
					phrase_1.stop();
				});

				playing = true;
			}
		});

		//*************************************************/
		self.add(label);
		self.add(buttonArea);
		self.add(p1);
		self.add(p2);

		var donePlaying = true;
		var count = 0;

		self.addEventListener('android:back', function() {
			var activity = Titanium.Android.currentActivity;
			activity.finish();
			self.close();
		});

		return self;

	} else {
		var buttonArea = Ti.UI.createView({
			width : 'auto',
			height : Ti.Platform.displayCaps.platformHeight * 0.04,
			layout : 'horizontal',
			top : '0',
			backgroundColor : 'white'
		});

		var label = Ti.UI.createLabel({
			color : 'black',
			text : 'Eehonci Kiintoohki Pyaawaaci Myaamiaki',
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			top : 0,
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			backgroundColor : 'white'
		});

		var view = Ti.UI.createScrollView({
			contentWidth : 'auto',
			contentHeight : 'auto',
			scrollType : 'vertical',
			top : '0%',
			showVerticalScrollIndicator : true,
			layout : 'vertical',
			backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/contentBackground.png',
			scale : 0,
		});

		var p1 = Ti.UI.createImageView({
			height : '100%',
			width : '100%',
			image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/Storybook/story_myammian.png'
		});

		var p2 = Ti.UI.createImageView({
			height : '100%',
			width : '100%',
			image : Ti.App.ASSETS_FOLDER.nativePath + '/Images/Storybook/story_english.png'
		});

		var p1Sound = [];
		p1Sound.push(Ti.App.ASSETS_FOLDER.nativePath + '/Images/Storybook/Myaamia_Coming_Out_Story.mp3');

		var p1S = Ti.Media.createAudioPlayer({
			url : p1Sound[0],
			allowBackground : false
		});

		/**************/
		var startStopButton = Ti.UI.createButton({
			title : 'Start/Stop',
			color : 'blue',
			top : Ti.Platform.displayCaps.platformHeight * 0.01,
			button : Ti.Platform.displayCaps.platformHeight * 0.01,
			left : '15',
			right : '15',
			width : 'auto',
			height : Ti.Platform.displayCaps.platformHeight * 0.022,
			backgroundColor : 'white',
			font : {
				fontSize : '14',
			}
		});


		buttonArea.add(startStopButton);

		startStopButton.addEventListener('click', function() {
			// When paused, playing returns false.
			// If both are false, playback is stopped.
			if (p1S.playing || p1S.paused) {
				p1S.stop();

				if (Ti.Platform.name === 'android') {
					p1S.release();
				}
			} else {
				p1S.play();
			}
		});

		buttonArea.addEventListener('close', function() {
			p1S.stop();
			if (Ti.Platform.osname === 'android') {
				p1S.release();
			}
		});


		startStopButton.addEventListener('load', function() {
			p1S.fireEvent('click');
		});

		//*************************************************/
		view.add(label);
		view.add(buttonArea);
		view.add(p1);
		view.add(p2);

		var donePlaying = true;
		var count = 0;

		view.addEventListener('android:back', function() {
			p1S.stop();
			var activity = Titanium.Android.currentActivity;
			activity.finish();
			self.close();
		});
		return view;
	}
};
