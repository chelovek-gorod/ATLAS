const fs = require("fs");

// OPTIONS -> set data, then write in terminal "node start"
const FILE_NAME = 'tesla_tower_214x476px_9x7_61frames.png'
const FULL_IMAGE_WIDTH = 1926
const FULL_IMAGE_HEIGHT = 1708
const SPRITE_WIDTH = 214
const SPRITE_HEIGHT = 476
const FRAME_WIDTH = 214
const FRAME_HEIGHT = 244
const FRAMES = 61
const ANCHOR = {x: 0.5,y: 1}
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
        sourceSize: {w: SPRITE_WIDTH, h: SPRITE_HEIGHT},
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