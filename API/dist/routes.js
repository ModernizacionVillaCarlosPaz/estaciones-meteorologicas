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
        route: "/cmm/:startDate/:endDate",
        controller: CmmController_1.CmmController,
        action: "Find"
    }, {
        method: "get",
        route: "/cmm/:Date",
        controller: CmmController_1.CmmController,
        action: "FindDay"
    },
    {
        method: "get",
        route: "/cmm1",
        controller: Cmm1Controller_1.Cmm1Controller,
        action: "last"
    }, {
        method: "get",
        route: "/cmm1/:startDate/:endDate",
        controller: Cmm1Controller_1.Cmm1Controller,
        action: "Find"
    }, {
        method: "get",
        route: "/cmm1/:Date",
        controller: Cmm1Controller_1.Cmm1Controller,
        action: "FindDay"
    },
    {
        method: "get",
        route: "/cmm2",
        controller: Cmm2Controller_1.Cmm2Controller,
        action: "last"
    }, {
        method: "get",
        route: "/cmm2/:startDate/:endDate",
        controller: Cmm2Controller_1.Cmm2Controller,
        action: "Find"
    }, {
        method: "get",
        route: "/cmm2/:Date",
        controller: Cmm2Controller_1.Cmm2Controller,
        action: "FindDay"
    }
];
//# sourceMappingURL=routes.js.map