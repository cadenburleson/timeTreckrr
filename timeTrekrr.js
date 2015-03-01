(function () {

	$('#btnCreateNewTimer').click( function(){

		$('#mainView').css('display','none');
		$('#newTimerView').css('display','block');

	} );

	$('#btnAdd').click( function(){

		var itemURL = $('#itemURL').val();
		var timeLimitHrs = $('#timeLimitHrs').val();
		var timeLimitMins = $('#timeLimitMins').val();

		console.log('URL: ' + itemURL);
		console.log('HRS:' + timeLimitHrs);
		console.log('MINS: ' + timeLimitMins);

	} );

	$(window).on("blur focus", function(e) {

	    var prevType = $(this).data("prevType");

	    if (prevType != e.type) {   //  reduce double fire issues
	        switch (e.type) {
	            case "blur":
	                console.log('BLUR');
	                break;
	            case "focus":
	                console.log('FOCUS');
	                break;
	        }
	    }

	    $(this).data("prevType", e.type);
	})

}());