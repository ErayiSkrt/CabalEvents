/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar MainView_1 = __webpack_require__(/*! ./src/MainView */ \"./src/MainView.ts\");\nwindow.onload = function () {\n    var mainView = new MainView_1.MainView(document);\n};\n\n\n//# sourceURL=webpack:///./main.ts?");

/***/ }),

/***/ "./src/MainView.ts":
/*!*************************!*\
  !*** ./src/MainView.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.MainView = void 0;\nvar CharSelectionView_1 = __webpack_require__(/*! ./gui/charSelection/CharSelectionView */ \"./src/gui/charSelection/CharSelectionView.ts\");\nvar MainView = /** @class */ (function () {\n    function MainView(document) {\n        this.selectedOption = \"\";\n        this.selectionUrl = \"https://firstservice-emyq.onrender.com/loadEvents\";\n        this.doc = document;\n        this.background = this.doc.createElement(\"div\");\n        this.background.id = \"background\";\n        this.doc.body.appendChild(this.background);\n        this.background.style.background = \"url('images/background.png')\";\n        this.mainDiv = this.doc.createElement(\"div\");\n        this.background.appendChild(this.mainDiv);\n        this.addMainDivElements();\n        this.charSelectView = this.addCharSelection();\n    }\n    MainView.prototype.addCharSelection = function () {\n        return new CharSelectionView_1.CharSelection(this.background, this.doc);\n    };\n    MainView.prototype.addMainDivElements = function () {\n        fetch(this.selectionUrl).then(function (response) { return response.json(); }).then(function (data) {\n            console.log(data);\n        });\n        this.addTitle();\n        this.horizontalLine();\n        this.initSelection();\n        this.horizontalLine();\n        this.confirmButton();\n    };\n    MainView.prototype.addTitle = function () {\n        var titleDiv = this.doc.createElement(\"div\");\n        this.mainDiv.appendChild(titleDiv);\n        var title = this.doc.createElement(\"h1\");\n        title.id = \"title\";\n        title.innerHTML = \"CABAL EVENTS\";\n        titleDiv.appendChild(title);\n    };\n    MainView.prototype.horizontalLine = function () {\n        var line = this.doc.createElement(\"div\");\n        line.className = \"horizontalLine\";\n        this.mainDiv.appendChild(line);\n    };\n    MainView.prototype.addSelectonText = function (div) {\n        var text = this.doc.createElement(\"h2\");\n        text.id = \"selectText\";\n        text.innerHTML = \"SELECT EVENT\";\n        div.appendChild(text);\n    };\n    MainView.prototype.initSelection = function () {\n        var _this = this;\n        var selectionOptions = [\"option1\", \"option2\", \"option3\"];\n        var selectionContainer = this.doc.createElement(\"div\");\n        selectionContainer.id = \"eventsContainer\";\n        this.mainDiv.appendChild(selectionContainer);\n        this.addSelectonText(selectionContainer);\n        var eventSelection = this.doc.createElement(\"select\");\n        eventSelection.id = \"eventSelection\";\n        var defaultOption = this.doc.createElement(\"option\");\n        defaultOption.value = \"\";\n        defaultOption.text = \"Select Event\";\n        defaultOption.disabled = true;\n        defaultOption.selected = true;\n        eventSelection.appendChild(defaultOption);\n        var count = 0;\n        for (var option in selectionOptions) {\n            count++;\n            var createOption = this.doc.createElement(\"option\");\n            createOption.value = selectionOptions[option].toUpperCase();\n            createOption.text = selectionOptions[option].toUpperCase();\n            eventSelection.appendChild(createOption);\n        }\n        selectionContainer === null || selectionContainer === void 0 ? void 0 : selectionContainer.appendChild(eventSelection);\n        eventSelection.addEventListener(\"change\", function () {\n            _this.selectedOption = eventSelection.value;\n        });\n    };\n    MainView.prototype.confirmButton = function () {\n        var _this = this;\n        var button = this.doc.createElement(\"div\");\n        button.id = \"start\";\n        button.innerHTML = \"START APP\";\n        this.mainDiv.appendChild(button);\n        button.addEventListener(\"pointerup\", function () {\n            if (_this.selectedOption != \"\") {\n                _this.hideCabalEventsScreen();\n            }\n        });\n    };\n    MainView.prototype.hideCabalEventsScreen = function () {\n        this.mainDiv.style.display = \"none\";\n        this.charSelectView.showCharSelection();\n    };\n    return MainView;\n}());\nexports.MainView = MainView;\n\n\n//# sourceURL=webpack:///./src/MainView.ts?");

/***/ }),

/***/ "./src/gui/charSelection/CharSelectionView.ts":
/*!****************************************************!*\
  !*** ./src/gui/charSelection/CharSelectionView.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CharSelection = void 0;\nvar CharSelection = /** @class */ (function () {\n    function CharSelection(background, document) {\n        this.selectedChar = \"\";\n        this.charList = [];\n        this.bkgr = background;\n        this.doc = document;\n        this.selectionView = this.doc.createElement(\"div\");\n        this.bkgr.appendChild(this.selectionView);\n        this.selectionView.style.display = \"none\";\n        this.addCharSelectElements();\n    }\n    CharSelection.prototype.showCharSelection = function () {\n        this.selectionView.style.display = \"\";\n    };\n    CharSelection.prototype.addCharSelectElements = function () {\n        this.addTitle();\n        this.horizontalLine();\n        this.initSelection();\n        this.horizontalLine();\n        this.addCharButton();\n        this.confirmButton();\n    };\n    CharSelection.prototype.addTitle = function () {\n        var titleDiv = this.doc.createElement(\"div\");\n        this.selectionView.appendChild(titleDiv);\n        var title = this.doc.createElement(\"h1\");\n        title.id = \"title\";\n        title.innerHTML = \"SELECT Character\";\n        titleDiv.appendChild(title);\n    };\n    CharSelection.prototype.horizontalLine = function () {\n        var line = this.doc.createElement(\"div\");\n        line.className = \"horizontalLine\";\n        this.selectionView.appendChild(line);\n    };\n    CharSelection.prototype.addSelectonText = function (div) {\n        var text = this.doc.createElement(\"h2\");\n        text.id = \"selectText\";\n        text.innerHTML = \"SELECT Character\";\n        div.appendChild(text);\n    };\n    CharSelection.prototype.initSelection = function () {\n        var _this = this;\n        this.charList = [\"char1\", \"char2\", \"char2\"];\n        var selectionContainer = this.doc.createElement(\"div\");\n        selectionContainer.id = \"eventsContainer\";\n        this.selectionView.appendChild(selectionContainer);\n        this.addSelectonText(selectionContainer);\n        var CharSelection = this.doc.createElement(\"select\");\n        CharSelection.id = \"eventSelection\";\n        var defaultOption = this.doc.createElement(\"option\");\n        defaultOption.value = \"\";\n        defaultOption.text = \"Select Char\";\n        defaultOption.disabled = true;\n        defaultOption.selected = true;\n        this.selectedChar = defaultOption.value;\n        CharSelection.appendChild(defaultOption);\n        for (var option in this.charList) {\n            var createOption = this.doc.createElement(\"option\");\n            createOption.value = this.charList[option].toUpperCase();\n            createOption.text = this.charList[option].toUpperCase();\n            CharSelection.appendChild(createOption);\n        }\n        selectionContainer === null || selectionContainer === void 0 ? void 0 : selectionContainer.appendChild(CharSelection);\n        CharSelection.addEventListener(\"change\", function () {\n            _this.selectedChar = CharSelection.value;\n        });\n    };\n    CharSelection.prototype.addCharButton = function () {\n        var button = this.doc.createElement(\"div\");\n        button.id = \"start\";\n        button.innerHTML = \"Add Character\";\n        this.selectionView.appendChild(button);\n        button.addEventListener(\"pointerup\", function () { });\n    };\n    CharSelection.prototype.confirmButton = function () {\n        var _this = this;\n        var button = this.doc.createElement(\"div\");\n        button.id = \"start\";\n        button.innerHTML = \"START APP\";\n        this.selectionView.appendChild(button);\n        button.addEventListener(\"pointerup\", function () {\n            if (_this.selectedChar != \"\") {\n                _this.hideCharSelectionView();\n            }\n        });\n    };\n    CharSelection.prototype.hideCharSelectionView = function () {\n        this.selectionView.style.display = \"none\";\n    };\n    return CharSelection;\n}());\nexports.CharSelection = CharSelection;\n\n\n//# sourceURL=webpack:///./src/gui/charSelection/CharSelectionView.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.ts");
/******/ 	
/******/ })()
;