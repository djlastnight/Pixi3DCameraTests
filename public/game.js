/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "pixi.js":
/*!***********************!*\
  !*** external "PIXI" ***!
  \***********************/
/***/ ((module) => {

module.exports = PIXI;

/***/ }),

/***/ "pixi3d":
/*!*************************!*\
  !*** external "PIXI3D" ***!
  \*************************/
/***/ ((module) => {

module.exports = PIXI3D;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "pixi.js");
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pixi_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pixi3d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pixi3d */ "pixi3d");
/* harmony import */ var pixi3d__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pixi3d__WEBPACK_IMPORTED_MODULE_1__);


// -----------------SETTINGS -----------------
var _resolution = 1; // 1.0 always works
var _updatePPS = false; // Both true and false works now
var _useCameraLastArg = true; // true always works
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
var app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Application({
    antialias: true,
    transparent: false,
    resizeTo: window,
    resolution: _resolution,
    backgroundColor: 0x2255ff
});
document.body.appendChild(app.view);
var graphics = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
graphics.beginFill(0xffffff, 1.0);
graphics.drawRect(0, 0, 300, 300);
graphics.zIndex = 1;
app.stage.sortableChildren = true;
app.stage.addChild(graphics);
var light = Object.assign(new pixi3d__WEBPACK_IMPORTED_MODULE_1__.Light(), {
    type: "ambient",
    intensity: 1,
});
pixi3d__WEBPACK_IMPORTED_MODULE_1__.LightingEnvironment.main.lights.push(light);
var model = undefined;
var ppsModel = undefined;
var pps = undefined;
pixi_js__WEBPACK_IMPORTED_MODULE_0__.Loader.shared.add("models/cube.gltf").load(function (loader, resources) {
    var asset = resources["models/cube.gltf"].gltf;
    model = pixi3d__WEBPACK_IMPORTED_MODULE_1__.Model.from(asset);
    model.scale.set(0.66);
    model.alpha = 0.33;
    model.zIndex = 3;
    model.z = 1;
    ppsModel = pixi3d__WEBPACK_IMPORTED_MODULE_1__.Model.from(asset);
    ppsModel.rotationQuaternion.setEulerAngles(0, -90, 0);
    // Important. Omit the pps width and height args, otherwise the scale will be weird.
    pps = new pixi3d__WEBPACK_IMPORTED_MODULE_1__.PostProcessingSprite(pixi3d__WEBPACK_IMPORTED_MODULE_1__.Camera.main.renderer, {
        objectToRender: ppsModel,
    });
    if (_updatePPS) {
        // If we don't want to update the position of the pps, we can just let it be anchor 0,0 and position 0,0
        pps.anchor.set(0.5, 0.5);
    }
    pps.scale.set(1.0);
    pps.alpha = 0.33;
    pps.zIndex = 2;
    if (_updatePPS) {
        pps.position.set(getScreen().width / 2, getScreen().height / 2);
    }
    app.stage.addChild(pps);
    app.stage.addChild(model);
    updatePositions();
});
function updatePositions() {
    if (model) {
        var screen_1 = getScreen();
        var cx = screen_1.width / 2;
        var cy = screen_1.height / 2;
        var pos = pixi3d__WEBPACK_IMPORTED_MODULE_1__.Camera.main.screenToWorld(cx, cy, model.z - pixi3d__WEBPACK_IMPORTED_MODULE_1__.Camera.main.z, undefined, _useCameraLastArg ? getScreen() : undefined);
        if (_updatePPS) {
            pps.position.set(cx, cy);
        }
        model.position.set(pos.x, pos.y, pos.z);
        graphics.width = Math.min(screen_1.width, screen_1.height) / 2;
        graphics.height = graphics.width;
        graphics.position.set(cx - graphics.width / 2, cy - graphics.height / 2);
        app.stage.sortChildren();
    }
}
function getScreen() {
    return pixi3d__WEBPACK_IMPORTED_MODULE_1__.Camera.main.renderer.screen;
}
window.addEventListener("resize", function () {
    updatePositions();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO1FBRUYsSUFBSSxVQUFVLEVBQUU7WUFDWixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUI7UUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFNLENBQUMsS0FBSyxFQUFFLFFBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNuQixFQUFFLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQ3ZCLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDekIsQ0FBQztRQUVGLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDMUI7QUFDSCxDQUFDO0FBRUQsU0FBUyxTQUFTO0lBQ2hCLE9BQU8sK0RBQTJCLENBQUM7QUFDckMsQ0FBQztBQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7SUFDaEMsZUFBZSxFQUFFLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QaXhpM0RDYW1lcmFUZXN0cy9leHRlcm5hbCB2YXIgXCJQSVhJXCIiLCJ3ZWJwYWNrOi8vUGl4aTNEQ2FtZXJhVGVzdHMvZXh0ZXJuYWwgdmFyIFwiUElYSTNEXCIiLCJ3ZWJwYWNrOi8vUGl4aTNEQ2FtZXJhVGVzdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vUGl4aTNEQ2FtZXJhVGVzdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vUGl4aTNEQ2FtZXJhVGVzdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1BpeGkzRENhbWVyYVRlc3RzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vUGl4aTNEQ2FtZXJhVGVzdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9QaXhpM0RDYW1lcmFUZXN0cy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFBJWEk7IiwibW9kdWxlLmV4cG9ydHMgPSBQSVhJM0Q7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHtcbiAgQ2FtZXJhLFxuICBnbFRGQXNzZXQsXG4gIExpZ2h0LFxuICBMaWdodGluZ0Vudmlyb25tZW50LFxuICBNb2RlbCxcbiAgUG9zdFByb2Nlc3NpbmdTcHJpdGUsXG59IGZyb20gXCJwaXhpM2RcIjtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS1TRVRUSU5HUyAtLS0tLS0tLS0tLS0tLS0tLVxuY29uc3QgX3Jlc29sdXRpb246IG51bWJlciA9IDE7IC8vIDEuMCBhbHdheXMgd29ya3NcbmNvbnN0IF91cGRhdGVQUFMgPSBmYWxzZTsgLy8gQm90aCB0cnVlIGFuZCBmYWxzZSB3b3JrcyBub3dcbmNvbnN0IF91c2VDYW1lcmFMYXN0QXJnOiBib29sZWFuID0gdHJ1ZTsgLy8gdHJ1ZSBhbHdheXMgd29ya3Ncbi8vIC0tLS0tLS0tLS0tLS0gRU5EIE9GIFNFVFRJTkdTIC0tLS0tLS0tLS0tLS1cblxuLyogSE9XIFRPIFRFU1RcbiogV2hlbiB5b3UgcmVzaXplIHRoZSB3aW5kb3cgYW5kL29yIHpvb20gaW4vb3V0IC0gYWxsIG9iamVjdHMgbXVzdCBiZSBhdCB0aGUgY2FudmFzIGNlbnRlclxuKiBXZSBoYXZlIDMgb2JqZWN0c1xuKiAjMSBXaGl0ZSBzcXVhcmUgLSB0aGlzIGlzIHBpeGkgZ3JhcGhpY3MgLSBpdCB3aWxsIGJlIGFsd2F5cyBhdCB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW4gLSB1c2UgaXQgYXMgcGl2b3QvaGludFxuKiAjMiBCbHVlIHNxdWFyZSAtIHRoaXMgaXMgM2QgY3ViZSwgcmVuZGVyZWQgdXNpbmcgYSBQb3N0UHJvY2Vzc2luZ1Nwcml0ZSBjbGFzc1xuKiAjMyBSZWQgc3F1YXJlIC0gdGhpcyBpcyBhIDNkIGN1YmUsIGRpcmVjdGx5IHJlbmRlcmVkIGFzIHBpeGkzZCBtb2RlbC5cbiogTUFJTiBHT0FMOiByZWdhcmRsZXNzIG9mIHRoZSBzZXR0aW5ncyBhYm92ZSwgcmVnYXJkbGVzcyBvZiB0aGUgYnJvd3NlcidzIHdpbmRvdyBzaXplLCByZWdhcmRsZXNzIG9mIHRoZSBicm93c2VyIHpvb20sXG4qIHRoZSAzIG9iamVjdHMgbXVzdCBiZSBhdCB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW4uXG4qL1xuXG5sZXQgYXBwID0gbmV3IFBJWEkuQXBwbGljYXRpb24oe1xuICBhbnRpYWxpYXM6IHRydWUsXG4gIHRyYW5zcGFyZW50OiBmYWxzZSxcbiAgcmVzaXplVG86IHdpbmRvdyxcbiAgcmVzb2x1dGlvbjogX3Jlc29sdXRpb24sXG4gIGJhY2tncm91bmRDb2xvcjogMHgyMjU1ZmZcbn0pO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcC52aWV3KTtcbmxldCBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5ncmFwaGljcy5iZWdpbkZpbGwoMHhmZmZmZmYsIDEuMCk7XG5ncmFwaGljcy5kcmF3UmVjdCgwLCAwLCAzMDAsIDMwMCk7XG5ncmFwaGljcy56SW5kZXggPSAxO1xuXG5hcHAuc3RhZ2Uuc29ydGFibGVDaGlsZHJlbiA9IHRydWU7XG5hcHAuc3RhZ2UuYWRkQ2hpbGQoZ3JhcGhpY3MpO1xuXG5sZXQgbGlnaHQgPSBPYmplY3QuYXNzaWduKG5ldyBMaWdodCgpLCB7XG4gIHR5cGU6IFwiYW1iaWVudFwiLFxuICBpbnRlbnNpdHk6IDEsXG59KTtcblxuTGlnaHRpbmdFbnZpcm9ubWVudC5tYWluLmxpZ2h0cy5wdXNoKGxpZ2h0KTtcblxubGV0IG1vZGVsOiBNb2RlbCA9IHVuZGVmaW5lZDtcbmxldCBwcHNNb2RlbDogTW9kZWwgPSB1bmRlZmluZWQ7XG5sZXQgcHBzOiBQb3N0UHJvY2Vzc2luZ1Nwcml0ZSA9IHVuZGVmaW5lZDtcblxuUElYSS5Mb2FkZXIuc2hhcmVkLmFkZChcIm1vZGVscy9jdWJlLmdsdGZcIikubG9hZCgobG9hZGVyLCByZXNvdXJjZXMpID0+IHtcbiAgbGV0IGFzc2V0ID0gKDxhbnk+cmVzb3VyY2VzW1wibW9kZWxzL2N1YmUuZ2x0ZlwiXSkuZ2x0ZiBhcyBnbFRGQXNzZXQ7XG4gIG1vZGVsID0gTW9kZWwuZnJvbShhc3NldCk7XG4gIG1vZGVsLnNjYWxlLnNldCgwLjY2KTtcbiAgbW9kZWwuYWxwaGEgPSAwLjMzO1xuICBtb2RlbC56SW5kZXggPSAzO1xuICBtb2RlbC56ID0gMTtcblxuICBwcHNNb2RlbCA9IE1vZGVsLmZyb20oYXNzZXQpO1xuICBwcHNNb2RlbC5yb3RhdGlvblF1YXRlcm5pb24uc2V0RXVsZXJBbmdsZXMoMCwgLTkwLCAwKTtcblxuICAvLyBJbXBvcnRhbnQuIE9taXQgdGhlIHBwcyB3aWR0aCBhbmQgaGVpZ2h0IGFyZ3MsIG90aGVyd2lzZSB0aGUgc2NhbGUgd2lsbCBiZSB3ZWlyZC5cbiAgcHBzID0gbmV3IFBvc3RQcm9jZXNzaW5nU3ByaXRlKENhbWVyYS5tYWluLnJlbmRlcmVyLCB7XG4gICAgb2JqZWN0VG9SZW5kZXI6IDxhbnk+cHBzTW9kZWwsXG4gIH0pO1xuXG4gIGlmIChfdXBkYXRlUFBTKSB7XG4gICAgLy8gSWYgd2UgZG9uJ3Qgd2FudCB0byB1cGRhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBwcHMsIHdlIGNhbiBqdXN0IGxldCBpdCBiZSBhbmNob3IgMCwwIGFuZCBwb3NpdGlvbiAwLDBcbiAgICBwcHMuYW5jaG9yLnNldCgwLjUsIDAuNSk7XG4gIH1cbiAgcHBzLnNjYWxlLnNldCgxLjApO1xuICBwcHMuYWxwaGEgPSAwLjMzO1xuICBwcHMuekluZGV4ID0gMjtcbiAgaWYgKF91cGRhdGVQUFMpIHtcbiAgICBwcHMucG9zaXRpb24uc2V0KGdldFNjcmVlbigpLndpZHRoIC8gMiwgZ2V0U2NyZWVuKCkuaGVpZ2h0IC8gMik7XG4gIH1cblxuICBhcHAuc3RhZ2UuYWRkQ2hpbGQocHBzKTtcbiAgYXBwLnN0YWdlLmFkZENoaWxkKDxhbnk+bW9kZWwpO1xuXG4gIHVwZGF0ZVBvc2l0aW9ucygpO1xufSk7XG5cbmZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9ucygpIHtcbiAgaWYgKG1vZGVsKSB7XG4gICAgbGV0IHNjcmVlbiA9IGdldFNjcmVlbigpO1xuICAgIGxldCBjeCA9IHNjcmVlbi53aWR0aCAvIDI7XG4gICAgbGV0IGN5ID0gc2NyZWVuLmhlaWdodCAvIDI7XG4gICAgbGV0IHBvcyA9IENhbWVyYS5tYWluLnNjcmVlblRvV29ybGQoXG4gICAgICBjeCxcbiAgICAgIGN5LFxuICAgICAgbW9kZWwueiAtIENhbWVyYS5tYWluLnosXG4gICAgICB1bmRlZmluZWQsXG4gICAgICBfdXNlQ2FtZXJhTGFzdEFyZyA/IGdldFNjcmVlbigpIDogdW5kZWZpbmVkXG4gICAgKTtcblxuICAgIGlmIChfdXBkYXRlUFBTKSB7XG4gICAgICAgIHBwcy5wb3NpdGlvbi5zZXQoY3gsIGN5KTtcbiAgICB9ICAgIFxuXG4gICAgbW9kZWwucG9zaXRpb24uc2V0KHBvcy54LCBwb3MueSwgcG9zLnopO1xuXG4gICAgZ3JhcGhpY3Mud2lkdGggPSBNYXRoLm1pbihzY3JlZW4ud2lkdGgsIHNjcmVlbi5oZWlnaHQpIC8gMjtcbiAgICBncmFwaGljcy5oZWlnaHQgPSBncmFwaGljcy53aWR0aDtcblxuICAgIGdyYXBoaWNzLnBvc2l0aW9uLnNldChcbiAgICAgIGN4IC0gZ3JhcGhpY3Mud2lkdGggLyAyLFxuICAgICAgY3kgLSBncmFwaGljcy5oZWlnaHQgLyAyXG4gICAgKTtcblxuICAgIGFwcC5zdGFnZS5zb3J0Q2hpbGRyZW4oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTY3JlZW4oKSB7XG4gIHJldHVybiBDYW1lcmEubWFpbi5yZW5kZXJlci5zY3JlZW47XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgdXBkYXRlUG9zaXRpb25zKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==