var player = player || {
    container       : document.getElementById('bloc_player'),
    media           : document.getElementById('media'),
    toolbar         : document.getElementById('player_tool'),
    btn_toggle      : document.getElementById('player_btn_toggle'),
    btn_forward     : document.getElementById('player_btn_forward'),
    btn_rewind      : document.getElementById('player_btn_rewind'),
    btn_stop        : document.getElementById('btn_video_stop'),
    progress_bar    : document.getElementById('player_progress_bar'),
    buffered_bar    : document.getElementById('player_buffered_bar'),
    display_current : document.getElementById('player_current_time'),
    display_total   : document.getElementById('player_total_time'),
    timeout         : null,
    playing         : false,
    close_callback  : null,
    timing_pause    : null,

    /*
    Initialize the video player with an url and play it
    */
    init : function(url, close_callback) {
        if(url != undefined) {
            this.open();

            this.playing = true;
            this.media.src = url;

            if(typeof close_callback === 'function') {
                this.close_callback = close_callback;
            }

            this.play();
        }

        this.media.addEventListener('timeupdate', function() {
            player.actualiseInfo();
        });
        this.media.addEventListener('loadedmetadata', function() {
            player.display_total.innerHTML = secondsToTime(player.media.duration);
        });
        this.media.addEventListener('ended', function() {
            player.close();
        });
    },

    /*
    Reset then open the player
    */
    open : function() {
        this.reset();
        this.container.style.display = 'block';
    },

    /*
    Reset then close the player
    */
    close : function() {
        this.container.style.display = 'none';
        if(this.close_callback) {
            this.close_callback();
        }
        this.reset();
    },

    /*
    Reset of the video player :
        - set time display on '00:00:00'
        - delete the current playing video
        - set progress bar to 0%
    */
    reset : function() {
        this.display_current.innerHTML = this.display_total.innerHTML = '00:00:00';
        this.media.src = '';
        this.setProgress(0);
        this.playing = false;
        this.callback = null;
    },

    /*
    Launch the video playing
    */
    play : function() {
        this.media.play();
        this.btn_toggle.className = 'btn_control toggle player_navigable pause focused';
        this.showToolBar(true);
    },

    /*
    Pause the video playing
    */
    pause : function(stop) {
        this.media.pause();

        var className = 'btn_control toggle player_navigable';
        if(!stop) {
            className+= ' focused';
        }
        this.btn_toggle.className = className;

        this.showToolBar(false);
    },

    /*
    Switch the play / pause functions according to the actual video state
    */
    toggle : function() {
        if(this.media.paused) {
            this.play();
        } else {
            this.pause();
        }
    },

    /*
    Stop the video playing and set time to 0s
    */
    stop : function() {
        this.media.pause(true);
        this.setTime(0);
    },

    /*
    Update the current playing time
    */
    setTime : function(second) {
        var exp         = '([-+])?([0-9]+)';
        var time        = RegExp(exp).exec(second);
        var second      = parseInt(time[2]);

        switch(time[1]) {
            case '-':
                // substract n seconds to the current time
                if(this.media.currentTime-second >= 0) {
                    this.media.currentTime-= second;
                } else {
                    this.media.currentTime = 0;
                }
                break;

            case '+':
                // add n seconds to the current time
                if(this.media.currentTime+second < this.media.duration) {
                    this.media.currentTime+= second;
                } else {
                    this.media.currentTime = this.media.duration-1;
                }
                break;

            default:
                // set current time at the specified seconds
                if(second >= 0 && second < this.media.duration) {
                    this.media.currentTime = second
                }
                break;
        }
    },

    /*
    Set the percentage of the playing to the progress bar
    */
    setProgress : function(percent) {
        if(percent < 0) {
            percent = 0;
        }
        if(percent > 100) {
            percent = 100;
        }

        this.progress_bar.style.width = percent+'%';
    },

    /*
    Set the percentage of the buffering to the buffured bar
    */
    setBuffered : function(percent) {
        if(percent < 0) {
            percent = 0;
        }
        if(percent > 100) {
            percent = 100;
        }

        this.buffered_bar.style.width = percent+'%';
    },

    /*
    Actualise the player infomations according playing state
    */
    actualiseInfo : function() {
        var total = player.media.duration;
        var current = player.media.currentTime;
        var percent_played = Math.round((current / total) * 100);

        this.setProgress(percent_played);

        this.display_current.innerHTML = secondsToTime(this.media.currentTime);
    },

    showToolBar : function(auto_hide) {
        clearTimeout(this.timeout);

        this.toolbar.className = '';

        if(auto_hide) {
            this.timeout = setTimeout('player.hideToolBar();', 5000);
        }
    },

    hideToolBar : function() {
        this.toolbar.className = 'hide';
    }
};

/*
Convert seconds to 'hh:mm:ss' string
*/
function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.floor(divisor_for_seconds);

    var obj = {
        "h": strpad(hours),
        "m": strpad(minutes),
        "s": strpad(seconds)
    };

    return obj['h']+':'+obj['m']+':'+obj['s'];
}

function strpad(val){
    return (!isNaN(val) && val.toString().length==1)?"0"+val:val;
}