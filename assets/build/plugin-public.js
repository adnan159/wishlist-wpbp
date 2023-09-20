/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/styles/public.scss":
/*!***************************************!*\
  !*** ./assets/src/styles/public.scss ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*************************************!*\
  !*** ./assets/src/plugin-public.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_public_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/public.scss */ "./assets/src/styles/public.scss");


/**
 * @function onload The window.onload function is called when the page is loaded
 */
window.onload = () => {
  // Write in console log the PHP value passed in enqueue_js_vars in frontend/Enqueue.php
  (() => {
    /**
     * This is a function that is called when the button is clicked
     *
     * @function JQuery<HTMLElement>.on<"click">
     */
    jQuery('#example-demo-button').on('click', function () {
      /**
       * This is a function fires a jQuery AJAX request
       *
       * @function jQuery.ajax The AJAX function
       * @return {Promise} A promise
       */
      jQuery.ajax({
        method: 'POST',
        url: window.location + 'wp-json/wp/v2/demo/example',
        data: {
          nonce: window.exampleDemo.nonce
        },
        beforeSend(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', window.exampleDemo.wp_rest);
        }
      }).done(function () {
        window.location.reload();
      }).fail(function () {
        // eslint-disable-next-line no-alert,no-undef
        alert(window.exampleDemo.alert);
      });
    });
  })();
  // Place your public-facing magic js 🪄 here
};
}();
/******/ })()
;
//# sourceMappingURL=plugin-public.js.map