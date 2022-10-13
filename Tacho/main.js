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
}

const tacX = G.WIDTH/2;
const tacY = G.HEIGHT/1.5;
const r_blue_red = 50;
const r_num = 40;
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
// const numbers_9 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// const numbers_15 = ["11", "12", "13", "14", "15"];
let points_blue = [];
let points_red = [];
let points_num = [];
// let points_num_9 = [];
// let points_num_15 = [];
let needle_index = 0;
let redline_time = 0;
let points_bckrnd = [];
let r_bckrnd = 55;
let over;

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

        over = false;

        // points for numbers
        for (let angle = 160; angle <= 380; angle += 14.66) {

            let rad = (angle * Math.PI)/180;
            let x = (tacX - 3) + (r_num * cos(rad));
            let y = tacY -1 + (r_num * sin(rad));
            points_num.push({
                x: x,
                y: y
            })
        }

        // // points for #s 0-9
        // for (let angle = 160; angle <= 297.5; angle += 13.75) {

        //     let rad = (angle * Math.PI)/180;
        //     let x = (tacX - 3) + (r_num * cos(rad));
        //     let y = (tacY - 2) + (r_num * sin(rad));
        //     points_num_9.push({
        //         x: x,
        //         y: y
        //     })
        // }
        // // points for #s 10-15
        // for (let angle = 311.25; angle <= 366.25; angle += 13.75) {

        //     let rad = (angle * Math.PI)/180;
        //     let x = tacX + (r_num * cos(rad));
        //     let y = tacY + (r_num * sin(rad));
        //     points_num_15.push({
        //         x: x,
        //         y: y
        //     })
        // }

        // points for blue arc
        for (let angle = 160; angle <= 380; angle += 1) {
            
            let rad = (angle * Math.PI)/180;
            let x = tacX + (r_blue_red * cos(rad));
            let y = tacY + (r_blue_red * sin(rad));

            points_blue.push({
                x: x,
                y: y
            });            
        }
        // Draw Red arc
        for (let angle = 320; angle <= 380; angle += 1) {
            let rad = (angle * Math.PI)/180;
            let x = tacX + (r_blue_red * cos(rad));
            let y = tacY + (r_blue_red * sin(rad));
            
            points_red.push({
                x: x,
                y: y
            })
        }
        // Draw background arc
        for (let angle = 160; angle <= 380; angle += 1) {
            let rad = (angle * Math.PI)/180;
            let x = tacX + (r_bckrnd * cos(rad));
            let y = tacY + (r_bckrnd * sin(rad));
            
            points_bckrnd.push({
                x: x,
                y: y
            })
        }
	}   

    // Redline gameover
    if (redline_time >= 3) {
        console.log("END");
        redline_time = 0;
        over = true;
        play("explosion");
        end();
    }

    if (over) {
        console.log("HERE");
    }

    // draw numbers
    for (let i = 0; i < points_num.length; i++) {        
        color("blue");
        if (i >= 11) {
            color("red");
        }
        // char(characts[i], points_num[i].x, points_num[i].y);
        text(numbers[i], points_num[i].x, points_num[i].y);
    }

    // // draw numbers 0-9
    // for (let i = 0; i < points_num_9.length; i++) {        
    //     color("blue");
    //     // if (i >= 11) {
    //     //     color("red");
    //     // }
    //     // char(characts[i], points_num[i].x, points_num[i].y);
    //     text(numbers_9[i], points_num_9[i].x, points_num_9[i].y);
    // }
    // // draw numbers 10-15
    // for (let i = 0; i < points_num_15.length; i++) {        
    //     color("blue");
    //     if (i >= 11) {
    //         color("red");
    //     }
    //     // char(characts[i], points_num[i].x, points_num[i].y);
    //     text(numbers_15[i], points_num_15[i].x, points_num_15[i].y);
    // }



    // draw blue arc
    for (let i = 0; i < points_blue.length; i++) {
        color("cyan");
        rect(points_blue[i].x, points_blue[i].y, 2, 2);
    }

    // draw red arc
    for (let i = 0; i < points_red.length; i++) {
        color("red");
        rect(points_red[i].x, points_red[i].y, 2, 2);
    }
    // draw bckrnd arc
    for (let i = 0; i < points_bckrnd.length; i++) {
        color("blue");
        rect(points_bckrnd[i].x, points_bckrnd[i].y, 2, 2);
    }
   
    // Move needle
    if (ticks % 5 == 0) { 
        if (needle_index <= 90) {
            needle_index += 7;
        } 
        else if (needle_index <= 130) {
            needle_index += 4;
        }
        else {
            needle_index += 2;
        }
        
        // if (needle_index >= points_blue.length) {
        //     needle_index = 0; // loop back to start
        // }
        if (needle_index >= points_blue.length) {
            needle_index = Math.floor(Math.random() * (points_blue.length - points_blue.length - 5) + points_blue.length-10);
        }
    }
    // draw needle
    color("green");
    line(tacX, tacY, points_blue[needle_index].x, points_blue[needle_index].y, 3);

    // Box
    // color("blue");
    // rect(0, G.HEIGHT/1.2, radius*2, 20);

    // Shift
    if (input.isJustPressed) {
        play("powerUp");
        if (needle_index <= 40) { // 3:42,  6:90, 9:130, 12:170, RED:165+
            needle_index = Math.floor(Math.random() * (20 - 1) + 1);
            addScore(3);          
        }
        else if (needle_index <= 90) {
            needle_index = Math.floor(Math.random() * (40 - 20) + 20);
            addScore(3);
        }
        else if (needle_index <= 130) {
            needle_index = Math.floor(Math.random() * (65 - 40) + 40);
            addScore(3);
        }
        else if (needle_index <= 160) {
            needle_index = Math.floor(Math.random() * (80 - 65) + 65);
            addScore(3);
        }
        else {
            needle_index = Math.floor(Math.random() * (100 - 65) + 65);
            addScore(1);
        }
    }

    // Redline
    if (needle_index >= 160) {
        if (ticks % 60 == 0) { // add one sec
            redline_time++;
            play("explosion");
            console.log("redline_time: ", redline_time);
        }
    } else {
        redline_time = 0;
        console.log("redline_time zeroed");
    }    

}