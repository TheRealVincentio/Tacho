title = "Tacho";

description = `
Shift and Stop!
`;

characters = [
`
 l l l 
lllllll
ll l ll
ll l ll
lllllll
ll   ll
ll   ll
`,`
lllll
lllll
lllll
`
];

const G = {
	WIDTH: 100,
	HEIGHT: 100,

}

const COLORS = ["red", "blue", "yellow", "purple"];

let index = 0;

// JSDocs



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
        
	}

    let tacX = G.WIDTH/2;
    let tacY = G.HEIGHT/1.2;
    let radius = 50;
    // color("red");
    // arc(tacX, tacY, 45, 2);

    color("blue");
    rect(0, G.HEIGHT/1.2, radius*2, 20);

    // 270 - 90 = 180

    let points = [];

    for (let angle = 180; angle <= 360; angle += 1) {
        
        let rad = (angle * Math.PI)/180;
        let x = tacX + (radius * cos(rad));
        let y = tacY + (radius * sin(rad));

        points.push({
            x: x,
            y: y
        });

        // console.log("x: ", x, " y: ", y, " a: ", angle, " rad: ", rad);
        // console.log(points[50]);

        color("cyan");
        rect(x, y, 2, 2);
    }

    for (let angle = 310; angle <= 360; angle += 1) {
        let rad = (angle * Math.PI)/180;
        let x = tacX + (radius * cos(rad));
        let y = tacY + (radius * sin(rad));
        color("red");
        rect(x, y, 2, 2);
    }

    // for (let i=0; i < points.length; i += 15) {

    // }
    
    if (ticks % 30 == 0) {
        console.log("Now");
        console.log(points[index]);
        index += 3;

        if (index >= points.length) {
            index = 0; // loop back to start
        }
    }
    color("green");
    line(tacX, tacY, points[index].x, points[index].y, 3);

    // color("green");
    // line(tacX, tacY, points[50].x, points[50].y, 3);

}