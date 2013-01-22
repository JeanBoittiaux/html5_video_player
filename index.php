<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="style.css?rand=<?php echo rand(0, 1000); ?>" />
    </head>
    <body>
        <div id="bloc_player">
            <video src="" id="media"></video>
            <div id="player_tool">
                <div id="player_progress_total">
                    <span id="player_progress_bar"></span>
                    <span id="player_buffered_bar"></span>
                </div>

                <div id="player_timer">
                    <span id="player_current_time">00:00:00</span> / <span id="player_total_time">00:00:00</span>
                </div>

                <div id="player_button">
                    <span onclick="player.setTime('-300');" id="player_btn_rewind" class="btn_control rewind player_navigable"></span>
                    <span onclick="player.toggle();" id="player_btn_toggle" class="btn_control toggle player_navigable"></span>
                    <span onclick="player.setTime('+300');" id="player_btn_forward" class="btn_control forward player_navigable"></span>
                    <span onclick="player.close();" id="player_btn_stop" class="btn_control stop player_navigable"></span>
                </div>
            </div>

            <div id="player_info"></div>
        </div>
    </body>

    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="keynav/keys.js"></script>
    <script src="keynav/keynav.js?rand=<?php echo rand(0, 1000); ?>"></script>
    <script src="video_player.js?rand=<?php echo rand(0, 1000); ?>"></script>

    <script>
    // player.init('http://ftp.nluug.nl/ftp/graphics/blender/apricot/trailer/sintel_trailer-720p.mp4');
    player.init('http://mirrorblender.top-ix.org/movies/sintel-1280-surround.mp4');
    resetKeynav('player_btn_toggle', 'player_navigable');
    </script>
</html>
C:\Users\hubee\Documents\GitHub\html5_video_player