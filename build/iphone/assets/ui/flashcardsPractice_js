module.exports = function() {

	var IOS_BORDER_RADIUS = '25%';
	var IOS_BORDER_WIDTH = '4%';
	var ANDROID_BORDER_RADIUS = 40;
	var ANDROID_BORDER_WIDTH = 5;
	
	var view = Ti.UI.createView();

	var card = Ti.UI.createView({
		layout : 'vertical',
		height : '30%',
		width : '85%',
		top : '20%',
		borderColor : '#008',
		borderWidth : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_WIDTH : IOS_BORDER_WIDTH),
		borderRadius : (Ti.App.OS_NAME === 'android' ? ANDROID_BORDER_RADIUS : IOS_BORDER_RADIUS),
		backgroundColor : '#FFFFFF',
		zindex : 20
	});
	
	var cardLabel = Ti.UI.createLabel({
		text : 'Flashcards',
		top : '40%',
		font : {fontSize : '24dp', fontWeight : 'bold'},
		color: '#000',
	});
	var count = 0;
	var answer;

	card.addEventListener("click", function() {
		var area = Math.floor(Math.random() * (Ti.App.parsedFile.areas.length - 1));
		var index = Math.floor((Ti.App.parsedFile.areas[area].info.length - 1) * Math.random());

		count++;
		if (count % 2 == 1) {
			var data = Ti.App.parsedFile.areas[area].info[index];
			cardLabel.text = data.word.miami;
			answer = data.word.english;
			card.backgroundColor = "#FFF";
			cardLabel.color = '#000000';

		} else {
			cardLabel.text = answer;
			card.backgroundColor = '#000000';
			cardLabel.color = '#FFFF';
		}
	});

	view.addEventListener('android:back', function() {
		var activity = Titanium.Android.currentActivity;
		activity.finish();
		self.close();
	});

	card.add(cardLabel);
	view.add(card);
	return view;

};
