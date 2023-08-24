"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var CmmController_1 = require("./controller/CmmController");
var Cmm1Controller_1 = require("./controller/Cmm1Controller");
var Cmm2Controller_1 = require("./controller/Cmm2Controller");
exports.Routes = [{
        method: "get",
        route: "/cmm",
        controller: CmmController_1.CmmController,
        action: "last"
    }, {
        method: "get",
        route: "/cmm/:dateTime",
        controller: CmmController_1.CmmController,
        action: "one"
    },
    {
        method: "get",
        route: "/cmm1",
        controller: Cmm1Controller_1.Cmm1Controller,
        action: "last"
    }, {
        method: "get",
        route: "/cmm1/:dateTime",
        controller: Cmm1Controller_1.Cmm1Controller,
        action: "one"
    },
    {
        method: "get",
        route: "/cmm2",
        controller: Cmm2Controller_1.Cmm2Controller,
        action: "last"
    }, {
        method: "get",
        route: "/cmm2/:dateTime",
        controller: Cmm2Controller_1.Cmm2Controller,
        action: "one"
    }
];
//# sourceMappingURL=routes.js.map