const fs = require("fs");

// OPTIONS -> set data, then write in terminal "node start"
const FILE_NAME = 'time_machine_200x562px_10x3_28frames.png'
const FRAME_WIDTH = 200
const FRAME_HEIGHT = 562
const FRAMES_IN_WIDTH = 10
const FRAMES_IN_HEIGHT = 3
const FRAMES = 28

const FULL_IMAGE_WIDTH = FRAME_WIDTH * FRAMES_IN_WIDTH
const FULL_IMAGE_HEIGHT = FRAME_HEIGHT * FRAMES_IN_HEIGHT

const ANCHOR = {x: 0.5, y: 1}
const SCALE = 1
const BASE_ANIMATION_NAME = 'go'

// BUILD TERMINAL COMMAND -> node start
// JSON build in current folder

// PROGRAM
const DATA = {
    frames: {},
    animations: { [BASE_ANIMATION_NAME] : [] },
    meta: {
        image: FILE_NAME,
        format: "RGBA8888",
        size: {w: FULL_IMAGE_WIDTH, h: FULL_IMAGE_HEIGHT},
        scale: "" + SCALE
    }
}

function getFrame(px, py) {
    return {
        frame: {x: px, y: py, w: FRAME_WIDTH, h: FRAME_HEIGHT},
        rotated: false,
        trimmed: false,
        spriteSourceSize: {x: 0, y: 0, w: FRAME_WIDTH, h: FRAME_HEIGHT},
        sourceSize: {w: FRAME_WIDTH, h: FRAME_HEIGHT},
        anchor: {x: ANCHOR.x, y: ANCHOR.y}
    }
}

function fillData() {
    let counter = 0
    for (let y = 0; y < FULL_IMAGE_HEIGHT; y += FRAME_HEIGHT) {
        for (let x = 0; x < FULL_IMAGE_WIDTH; x += FRAME_WIDTH) {
            DATA.frames[counter] = getFrame(x, y)
            DATA.animations[BASE_ANIMATION_NAME].push("" + counter)
            counter++
            if (counter === FRAMES) return
        }
    }
}

function getJSONFileName() {
    const dotPosition = FILE_NAME.lastIndexOf('.')
    return FILE_NAME.slice(0, dotPosition) + '.json'
}

fillData()

fs.writeFile(getJSONFileName(), JSON.stringify(DATA, null, "\t"), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});