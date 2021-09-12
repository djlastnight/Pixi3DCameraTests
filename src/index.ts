import * as _ from "lodash";
import * as PIXI from "pixi.js";
import {
  Camera,
  glTFAsset,
  Light,
  LightingEnvironment,
  Model,
  PostProcessingSprite,
} from "pixi3d";

// -----------------SETTINGS -----------------
const _resolution: number = 0.5; // 1.0 always works
const _updatePPS = false; // Both true and false works now
const _useCameraLastArg: boolean = false; // true always works
// ------------- END OF SETTINGS -------------

/* HOW TO TEST
* When you resize the window and/or zoom in/out - all objects must be at the canvas center
* We have 3 objects
* #1 White square - this is pixi graphics - it will be always at the center of the screen - use it as pivot/hint
* #2 Blue square - this is 3d cube, rendered using a PostProcessingSprite class
* #3 Red square - this is a 3d cube, directly rendered as pixi3d model.
* MAIN GOAL: regardless of the settings above, regardless of the browser's window size, regardless of the browser zoom,
* the 3 objects must be at the center of the screen.
*/

let app = new PIXI.Application({
  antialias: true,
  transparent: false,
  resizeTo: window,
  resolution: _resolution,
});

document.body.appendChild(app.view);
let graphics = new PIXI.Graphics();
graphics.beginFill(0xffffff, 1.0);
graphics.drawRect(0, 0, 300, 300);
graphics.zIndex = 1;

app.stage.sortableChildren = true;
app.stage.addChild(graphics);

let light = Object.assign(new Light(), {
  type: "ambient",
  intensity: 1,
});

LightingEnvironment.main.lights.push(light);

let model: Model = undefined;
let ppsModel: Model = undefined;
let pps: PostProcessingSprite = undefined;

PIXI.Loader.shared.add("models/cube.gltf").load((loader, resources) => {
  let asset = (<any>resources["models/cube.gltf"]).gltf as glTFAsset;
  model = Model.from(asset);
  model.scale.set(0.66);
  model.alpha = 0.33;
  model.zIndex = 3;
  model.z = 1;

  ppsModel = Model.from(asset);
  ppsModel.rotationQuaternion.setEulerAngles(0, -90, 0);

  // Important. Omit the pps width and height args, otherwise the scale will be weird.
  pps = new PostProcessingSprite(Camera.main.renderer, {
    objectToRender: <any>ppsModel,
  });

  if (_updatePPS) {
    // If we don't want to update the position of the pps, we can just let it be anchor 0,0 and position 0,0
    pps.anchor.set(0.5, 0.5);
  }
  pps.scale.set(1.0);
  pps.alpha = 0.33;
  pps.zIndex = 2;
  if (_updatePPS) {
    // If we don't want to update the position of the pps, we can just let it be anchor 0,0 and position 0,0
    pps.position.set(getScreen().width / 2, getScreen().height / 2);
  }

  app.stage.addChild(pps);
  app.stage.addChild(<any>model);

  updatePositions();
});

function updatePositions() {
  if (model) {
    let screen = getScreen();
    let cx = screen.width / 2;
    let cy = screen.height / 2;
    let pos = Camera.main.screenToWorld(
      cx,
      cy,
      model.z - Camera.main.z,
      undefined,
      _useCameraLastArg ? getScreen() : undefined
    );

    if (_updatePPS) {
        pps.position.set(cx, cy);
    }    

    model.position.set(pos.x, pos.y, pos.z);

    graphics.width = Math.min(screen.width, screen.height) / 2;
    graphics.height = graphics.width;

    graphics.position.set(
      cx - graphics.width / 2,
      cy - graphics.height / 2
    );

    app.stage.sortChildren();
  }
}

function getScreen() {
  return Camera.main.renderer.screen;
}

window.addEventListener("resize", () => {
  updatePositions();
});
