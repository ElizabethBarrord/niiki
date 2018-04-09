/*
 * Creates a View to display the contents of a selected word within specified room
 *
 */
var contentView = function(room, word) {

	// Show English
	var e_m = (Ti.App.noEnglish == 1);

	/*
	 * Contents of element:
	 * theWord = {enlgish, miami, mp3}
	 * phrase1 = {english, miami, mp3}
	 * phrase2 = {english, miami, mp3}
	 * imagePath = image
	 */
	var theWord = [];
	var phrase1 = [];
	var phrase2 = [];
	var imagePath;

	var content;

	for (var i = 0; i < Ti.App.parsedFile.areas.length; i++) {
		if (Ti.App.parsedFile.areas[i].title == room || Ti.App.parsedFile.areas[i].miamiTitle == room) {
			for (var j = 0; j < Ti.App.parsedFile.areas[i].info.length; j++) {
				if (Ti.App.parsedFile.areas[i].info[j].word.english === word || Ti.App.parsedFile.areas[i].info[j].word.miami === word || Ti.App.parsedFile.areas[i].info[j].id === word) {
					content = Ti.App.parsedFile.areas[i].info[j];
				}
			}
		}
	}

	theWord.push(content.word.english);
	theWord.push(content.word.miami);
	theWord.push(Ti.App.ASSETS_FOLDER.nativePath + content.word.mp3);
	phrase1.push(content.phrase1.english);
	phrase1.push(content.phrase1.miami);
	phrase1.push(Ti.App.ASSETS_FOLDER.nativePath + content.phrase1.mp3);
	phrase2.push(content.phrase2.english);
	phrase2.push(content.phrase2.miami);
	phrase2.push(Ti.App.ASSETS_FOLDER.nativePath + content.phrase2.mp3);
	imagePath = Titanium.Filesystem.getFile(Ti.App.ASSETS_FOLDER.nativePath + content.image);
	imagePath = imagePath.read();

	// SET UI LAYOUT BELOW

	// Labels for contentView
	var wordEngLabel,
	    wordMiamiLabel,
	    phr1EngLabel,
	    phr1MiamiLabel,
	    phr2EngLabel,
	    phr2MiamiLabel,
	    theImage;

	// Initialize Labels
	wordEngLabel = Ti.UI.createLabel({
		text : theWord[0],
		color : 'black',
		top : '5dp',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : '12dp'
		}
	});

	wordMiamiLabel = Ti.UI.createLabel({
		text : theWord[1],
		color : 'blue',
		top : '20dp',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : '16dp',
			fontWeight : 'bold'
		}
	});

	phr1EngLabel = Ti.UI.createLabel({
		text : phrase1[0],
		color : 'black',
		top : '5dp',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : '12dp'
		}
	});

	phr1MiamiLabel = Ti.UI.createLabel({
		text : phrase1[1],
		color : 'blue',
		top : '10dp',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : '16dp',
			fontWeight : 'bold'
		}
	});

	phr2EngLabel = Ti.UI.createLabel({
		text : phrase2[0],
		color : 'black',
		top : '5dp',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : '12dp'
		}
	});

	phr2MiamiLabel = Ti.UI.createLabel({
		text : phrase2[1],
		color : 'blue',
		top : '10dp',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		font : {
			fontSize : '16dp',
			fontWeight : 'bold'
		}
	});

	theImage = Ti.UI.createImageView({
		image : imagePath,
		top : '5%',
		width : Ti.Platform.displayCaps.platformWidth * 0.75
	});

	// UI Setup
	var self = Ti.UI.createScrollView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		scrollType : 'vertical',
		showVerticalScrollIndicator : true,
		layout : 'vertical',
		backgroundImage : Ti.App.ASSETS_FOLDER.nativePath + '/Images/contentBackground.png',
		scale : 0
	});

	self.add(theImage);

	var wordView = Ti.UI.createView({
		layout : 'vertical',
		height : Ti.UI.SIZE,
		top : '10dp'
	});
	wordView.add(wordMiamiLabel);
	wordView.add( e_m ? Ti.UI.createLabel() : wordEngLabel);
	self.add(wordView);

	var p1View = Ti.UI.createView({
		layout : 'vertical',
		height : Ti.UI.SIZE,
		top : '10dp'
	});

	if (phr1MiamiLabel.text != "NA") {
		p1View.add(phr1MiamiLabel);
		p1View.add( e_m ? Ti.UI.createLabel() : phr1EngLabel);
		self.add(p1View);
	}

	var p2View = Ti.UI.createView({
		layout : 'vertical',
		height : Ti.UI.SIZE,
		top : '10dp',
		bottom : '20dp'
	});
	if (phr2MiamiLabel.text != "NA") {
		p2View.add(phr2MiamiLabel);
		p2View.add( e_m ? Ti.UI.createLabel() : phr2EngLabel);
		self.add(p2View);
	}

	// PLAYING SOUNDS

	var donePlaying = true;
	wordView.addEventListener('click', function() {
		// var word = Ti.Media.createSound({
		// url : theWord[2]
		// });
		// word.addEventListener('complete', function() {
		// donePlaying = true;
		// });
		// if (donePlaying) {
		// word.play();
		// donePlaying = false;
		// }
		var word1;
		try {
			word1 = Ti.Media.createSound({
				url : theWord[2]
			});
		} catch (e) {
			word1 = Ti.Media.createAudioPlayer({
				url : theWord[2],
				allowBackground : true
			});
		}
		word1.play();
	});

	p1View.addEventListener('click', function() {
		var phrase_1;
		try {
			phrase_1 = Ti.Media.createSound({
				url : phrase1[2],
				preload : false
			});
		} catch (e) {
			phrase_1 = Ti.Media.createAudioPlayer({
				url : phrase1[2],
				allowBackground : true
			});
		}
		phrase_1.play();
	});

	p2View.addEventListener('click', function() {
		var phrase_2;
		try {
			phrase_2 = Ti.Media.createSound({
				url : phrase2[2],
				preload : false
			});
		} catch (e) {
			phrase_2 = Ti.Media.createAudioPlayer({
				url : phrase2[2],
				allowBackground : true
			});
		}
		phrase_2.play();
	});

	self.addEventListener('load', function() {
		wordView.fireEvent('click');
	});

	self.addEventListener('android:back', function() {
		var activity = Titanium.Android.currentActivity;
		activity.finish();
		self.close();
	});

	return self;
};

module.exports = contentView;
