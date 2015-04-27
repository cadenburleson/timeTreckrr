var itemURL;
var timeLimitHrs;
var timeLimitMins;

$('#btnCreateNewTimer').click(function() {
	$('#mainView').css('display','none');
	$('#newTimerView').css('display','block');
});

$('#app_description_close_button').click(function() {
	$('#app_description').css('display', 'none');
});

$('#btnAdd').click( function() {
// Assigns your input into the html fields to the variables
	itemURL = $('#itemURL').val();
	timeLimitHrs = $('#timeLimitHrs').val();
	timeLimitMins = $('#timeLimitMins').val();

	var outputTimeString = $('#outputTimeString');

	$('#timerContainerBitches').append(timerProgressBar);

	$('#mainView').css('display','block');
	$('#newTimerView').css('display','none');

		console.log('URL: ' + itemURL);
		console.log('HRS:' + timeLimitHrs);
		console.log('MINS: ' + timeLimitMins);

		addData();

} );

var timerProgressBar = '<div class="progress progress-striped"><div class="progress-bar progress-bar-custom" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"><span class="sr-only">60% Complete</span><H3>Facebook</H3></div></div>';

// $('#timerContainerBitches').html(progressBarBitches);

$('#newTimerCreatorLink').click(function(){
	$('#timerContainerBitches').append(timerProgressBar);
});

function getMonth() {
	var now = new Date(); 
	var month = now.getMonth()+1; 
	if(month.toString().length == 1) {
		var month = '0'+month;
	}

	return month;
}





