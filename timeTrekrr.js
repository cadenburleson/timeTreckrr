var itemURL;
var timeLimitHrs;
var timeLimitMins;

$('#btnCreateNewTimer').click(function() {
	// turns off the timer list view
	$('#mainView').css('display','none');
	// tuens on the create timer view
	$('#newTimerView').css('display','block');
});

$('#btnDeleteTimerData').click(function() {
	window.deleteTimerDatabase();
});


$('#btnGetTimerData').click(function() {
	window.getTimerData(1);
});

$('#app_description_close_button').click(function() {
	$('#app_description').css('display', 'none');
});

$('#btnAdd').click( function() {

	console.log("btn Add pressed");

	addTimerData();

	$('#timerContainerBitches').append(timerProgressBar);
	$('#mainView').css('display','block');
	$('#newTimerView').css('display','none');

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

// function updateTimerView () {
// 	function 
// }





