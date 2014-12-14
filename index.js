var
j5 = require( 'johnny-five' ),
board = new j5.Board()

board.on( 'ready', function( ){
    var current = 0;
    var rightWheel = new j5.Servo({
        pin: 9,
        type: 'continuous',
        isInverted: true
    });
    var leftWheel = new j5.Servo({
        pin: 10,
        type: 'continuous'
    });
    var mic = new j5.Sensor({
        pin: 'A1',
        freq: 250
    });
    var patterns = [ forward, backward, forward, spinLeft, spinRight, spinLeft, spinLeft, spinLeft, spinRight, spinRight, spinLeft, spinLeft ]; 
    var patternMeta = {
        index: 0
    };

    function forward( speed ) {
        stop()
        speed = speed || 0.5
        leftWheel.ccw( speed )
        rightWheel.ccw( speed )
    }

    function backward( speed ) {
        stop()
        speed = speed || 0.5
        leftWheel.cw( speed )
        rightWheel.cw( speed )
    }

    function stop( ) {
        leftWheel.stop()
        rightWheel.stop()
    }

    function spinLeft( speed ) {
        stop()
        speed = speed || 0.5
        leftWheel.cw( speed )
        rightWheel.ccw( 0 )
    }

    function spinRight( speed ) {
        stop()
        speed = speed || 0.5
        leftWheel.cw( 0 )
        rightWheel.ccw( speed )
    }

    // mic.on( 'data', function( data ){
    //     console.log( 'data', arguments )
    // })

    board.repl.inject({
        forward: forward,
        backward: backward,
        stop: stop,
        spinLeft: spinLeft,
        spinRight: spinRight,
        leftWheel: leftWheel,
        rightWheel: rightWheel,
        patternIndex: patternMeta.index,
        dance: dance
    });

    leftWheel.cw(0);
    rightWheel.cw(0);

    function dance() {

        patterns[ current ]();
        current ++;
        if ( current === patterns.length ) {
            current = 0;
        }

        setTimeout( dance, 500 );
    }


} )