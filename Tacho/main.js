title = "Tacho";

description = `
Shift and Stop!
`;

characters = [
`
`
];

const G = {
	WIDTH: 110,
	HEIGHT: 100,
    TACX: 110/2,
    TACY: 100/1.5,
    RADIUS_B_R: 50,
    RADIUS_NUM: 40,
    RADIUS_BACK: 55,
    NUMBERS:["0", "1", "2", "3", "4",
    "5", "6", "7", "8", "9", "10", "11", 
    "12", "13", "14", "15"]
}

/**
 * @typedef {{
 * pos: Vector,
 * colo: String,
 * str: String
 * }} nums
 */

/**
 * @type { nums [] }
 */
let rpms, red, blue, back;

let needle_index = 0;
let redline_time = 0;

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2,
    seed: 1,
    isPlayingBgm: true,
    isReplayEnabled: true,
    theme: "dark"
};

function update() {
	if (!ticks) {
        // points for numbers
        rpms = times(16,(i) =>{
            let rad = ((160 + 14.66 * i) * Math.PI)/180;
            let x = (G.TACX - 3) + (G.RADIUS_NUM * cos(rad));
            let y = G.TACY -1 + (G.RADIUS_NUM * sin(rad));
            let c = "blue";
            if(i > 9){ c = "red"}
            return{
                pos:vec(x,y),
                colo: c,
                str: G.NUMBERS[i]
            }
        });

        // points for blue arc
        blue = times(220,(i) =>{
            let rad = ((160 +  i) * Math.PI)/180;
            let x = G.TACX + (G.RADIUS_B_R * cos(rad));
            let y = G.TACY + (G.RADIUS_B_R * sin(rad));
            return{
                pos:vec(x,y),
                colo:"cyan"
            }
        });

        // Draw Red arc

        red = times(80,(i) =>{
            let rad = ((300 +  i) * Math.PI)/180;
            let x = G.TACX + (G.RADIUS_B_R * cos(rad));
            let y = G.TACY + (G.RADIUS_B_R * sin(rad));
            return{
                pos:vec(x,y),
                colo:"red"
            }
        });

        // Draw background arc
        back = times(220,(i) =>{
            let rad = ((160 +  i) * Math.PI)/180;
            let x = G.TACX + (G.RADIUS_BACK * cos(rad));
            let y = G.TACY + (G.RADIUS_BACK * sin(rad));
            return{
                pos:vec(x,y),
                colo:"blue"
            }
        });
        this.needle_index = 0;
        this.redline_time = 0;
        
	}   

    // Redline gameover
    if (this.redline_time >= 3) {
        console.log("END");
        this.redline_time = 0;
        play("explosion");
        end();
    }

    // draw numbers
    rpms.forEach(elem =>{
        color(elem.colo);
        text(elem.str,elem.pos);
    });

    blue.forEach(elem =>{
        color(elem.colo);
        rect(elem.pos,2,2);
    });

    red.forEach(elem =>{
        color(elem.colo);
        rect(elem.pos,2,2);
    });

    back.forEach(elem =>{
        color(elem.colo);
        rect(elem.pos,2,2);
    });
    
    // Move needle
    if (ticks % 5 == 0) { 
        if (this.needle_index <= 90) {
            this.needle_index += 7;
        } 
        else if (this.needle_index <= 130) {
            this.needle_index += 4;
        }
        else {
            this.needle_index += 2;
        }
        
        if (this.needle_index >= blue.length) {
            this.needle_index = Math.floor(Math.random() * (blue.length - blue.length - 5) + blue.length-10);
        }
    }
    // draw needle
    color("green");
    line(G.TACX, G.TACY, blue[this.needle_index].pos, 3);

    // Shift
    if (input.isJustPressed) {
        play("powerUp");
        if (this.needle_index <= 40) { // 3:42,  6:90, 9:130, 12:170, RED:165+
            this.needle_index = Math.floor(Math.random() * (20 - 1) + 1);
            addScore(3);          
        }
        else if (this.needle_index <= 90) {
            this.needle_index = Math.floor(Math.random() * (40 - 20) + 20);
            addScore(3);
        }
        else if (this.needle_index <= 130) {
            this.needle_index = Math.floor(Math.random() * (65 - 40) + 40);
            addScore(3);
        }
        else if (this.needle_index <= 160) {
            this.needle_index = Math.floor(Math.random() * (80 - 65) + 65);
            addScore(3);
        }
        else {
            this.needle_index = Math.floor(Math.random() * (100 - 65) + 65);
            addScore(1);
        }
    }

    // Redline
    if (this.needle_index >= 160) {
        if (ticks % 60 == 0) { // add one sec
            this.redline_time++;
            play("explosion");
        }
    } else {
        this.redline_time = 0;
    }    

}