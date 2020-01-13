

//const date = new Date("Jan 1, 2020 12:00:00").getTime();

const date = new Date(new Date().getTime() + 1*12*60*1000);

const dateTime = setInterval(() =>{
	let now = new Date().getTime();

	let distance = date-now;

	let days = Math.floor(distance / (1000 * 60 * 60 * 24));
	let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	let secs = Math.floor((distance % (1000 * 60)) / 1000);



	let divs = document.getElementsByClassName('timeleft');
	for (let i = 0; i < divs.length; i++) {
	    divs[i].innerHTML = hours + ": "
	  + mins + ": " + secs;
	}
	
	if (distance < 0) {
    	clearInterval(dateTime);
  	}
}, 1000);


$(function(){

 $('.btn').on('click', function(){
		var scope = this;

		var i = $(scope).find('i').addClass('fa-hourglass');
		var text ='processing';
		$(scope).html(i).append(text);
	});

 	$('.collapse').on('show.bs.collapse', function () {
  		$(this).prev('.card-header').find('i').addClass('rotate-180');
	})
	$('.collapse').on('hidden.bs.collapse', function () {
  		$(this).prev('.card-header').find('i').removeClass('rotate-180');
	})

});