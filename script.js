"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    (_a = $("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const NAME = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        const LICENCE_PLATE = (_b = $("#license-plate")) === null || _b === void 0 ? void 0 : _b.value;
        if (!NAME || !LICENCE_PLATE) {
            alert("vehicle and license plate are required");
            return;
        }
    });
})();
