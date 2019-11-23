(function( $ ) {

    $.fn.countdowntimer = function( options ) {
        return this.each( function() {
            countdown( $(this), options );
        });
    };

    //Definition of private function countdown.
    function countdown( $this , options ) {
        var opts = $.extend( {}, $.fn.countdowntimer.defaults, options );
        var $this = $this;
        if(options.startDate == undefined && options.dateAndTime == undefined && options.currentTime == undefined && (options.hours != undefined || options.minutes != undefined || options.seconds != undefined)) {

           if(options.hours != undefined && options.minutes != undefined && options.seconds != undefined) {
                hours_HMS = "";
                minutes_HMS = "";
                seconds_HMS = "";
                timer_HMS = "";
                window['hours_HMS'+ $this.attr('id')] = opts.hours;
                window['minutes_HMS'+ $this.attr('id')] = opts.minutes;
                window['seconds_HMS'+ $this.attr('id')] = opts.seconds;
                hoursMinutesSeconds($this, opts);
                window['timer_HMS'+ $this.attr('id')] = setInterval(function(){
                    hoursMinutesSeconds($this, opts)
                }, opts.tickInterval * 1000);
            }

        } else if(options.startDate == undefined && options.dateAndTime != undefined && options.currentTime == undefined) {
            startTime = "";
            dateTime = "";
            timer_givenDate = "";
            var hour = opts.startDate.getHours() < 10?'0'+opts.startDate.getHours():opts.startDate.getHours();
            var minutes = opts.startDate.getMinutes() < 10?'0'+opts.startDate.getMinutes():opts.startDate.getMinutes();
            var seconds = opts.startDate.getSeconds() < 10?'0'+opts.startDate.getSeconds():opts.startDate.getSeconds();
            var month = (opts.startDate.getMonth()+1) < 10?'0'+(opts.startDate.getMonth()+1):(opts.startDate.getMonth()+1);
            var date = opts.startDate.getDate() < 10?'0'+opts.startDate.getDate():opts.startDate.getDate();
            var year = opts.startDate.getFullYear();
            window['startTime'+ $this.attr('id')] = new Date(year+'/'+month+'/'+date+' '+hour+':'+minutes+':'+seconds);
            window['dateTime'+ $this.attr('id')] = new Date(opts.dateAndTime);
            var type = "withnoStart";
            givenDate($this, opts, type);
            window['timer_givenDate'+$this.attr('id')] = setInterval(function(){
                givenDate($this, opts, type)
            }, opts.tickInterval * 1000);
        } 
		
    };

    function givenDate($this, opts, type) {
        var id = $this.attr('id');
        var endDate = (type == "withnoStart")?window['dateTime'+id]:window['endDate'+id];
        var startDate = (type == "withnoStart")?window['startTime'+ id]:window['startDate'+ id];
        var days=Math.floor((endDate-startDate)/(24*60*60*1000));
        var hours=Math.floor(((endDate-startDate)%(24*60*60*1000))/(60*60*1000));
        var minutes=Math.floor(((endDate-startDate)%(24*60*60*1000))/(60*1000))%60;
        var seconds=Math.floor(((endDate-startDate)%(24*60*60*1000))/1000)%60%60;

        if((endDate - startDate) > 0) {
            if(days.toString().length < 2) {
                days = "0" + days; 
            }
            if(hours.toString().length < 2) {
                hours = "0" + hours;
            }
            if(minutes.toString().length < 2) {
                minutes = "0" + minutes ;
            }
            if(seconds.toString().length < 2) {
                seconds = "0" + seconds ;
            }
            $this.html("<span>"+days+"</span> <div class='title'> Days </div> <span>"+hours+"</span> <div class='title'> Hours </div> <span>"+minutes+"</span> <div class='title'> Minutes </div> <span>"+seconds+"</span> <div class='title'> Secounds </div>");
            (type == "withnoStart")?(window['startTime'+ id].setSeconds(window['startTime'+ id].getSeconds()+opts.tickInterval)):(window['startDate'+ id].setSeconds(window['startDate'+ id].getSeconds()+opts.tickInterval));
        } else {
            $this.html("<span>00</span> Days "+"<span>00</span> Hours "+"<span>00</span> Minutes "+"<span>00</span> Secounds");
            if(type == "withnoStart") {
                delete window['dateTime'+ id];
                delete window['startTime'+ id];
                clearInterval(window['timer_givenDate'+id]);
            } else if(type == "withStart") {
                delete window['startDate'+ id];
                delete window['endDate'+ id];
                clearInterval(window['timer_startDate'+id]);
            }
            timeUp($this, opts);
        }
        id = null;
    }

    function currentDate($this, opts) {
        if(window['currentTime' + $this.attr('id')] == true) {
            var today=new Date();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            var seconds = today.getSeconds()

            if(hours.toString().length < 2) {
                hours = "0" + hours;
            }
            if(minutes.toString().length < 2) {
                minutes = "0" + minutes;
            }
            if(seconds.toString().length < 2) {
                seconds = "0" + seconds;
            }
            $this.html("<span>"+days+"</span> <div class='title'> Days </div> <span>"+hours+"</span> <div class='title'> Hours </div> <span>"+minutes+"</span> <div class='title'> Minutes </div> <span>"+seconds+"</span> <div class='title'> Secounds </div>");
        } else {
            alert('Set Current Time option.');
        }
    }

    $.fn.countdowntimer.defaults = {
        hours   : 0,
        minutes : 0,
        seconds : 60,
        startDate : new Date(),
        dateAndTime : new Date("0000/00/00 00:00:00"),
        currentTime : false,
        tickInterval : 1,
        timeUp : null
    };

}(jQuery));
