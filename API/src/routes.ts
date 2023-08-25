import { CmmController } from "./controller/CmmController"
import { Cmm1Controller } from "./controller/Cmm1Controller"
import { Cmm2Controller } from "./controller/Cmm2Controller"

export const Routes = [{
    method: "get",
    route: "/cmm",
    controller: CmmController,
    action: "last"
}, {
    method: "get",
    route: "/cmm/:startDate/:endDate",
    controller: CmmController,
    action: "Find"
},

{
    method: "get",
    route: "/cmm1",
    controller: Cmm1Controller,
    action: "last"
}, {
    method: "get",
    route: "/cmm1/:startDate/:endDate",
    controller: Cmm1Controller,
    action: "Find"
},

{
    method: "get",
    route: "/cmm2",
    controller: Cmm2Controller,
    action: "last"
}, {
    method: "get",
    route: "/cmm2/:startDate/:endDate",
    controller: Cmm2Controller,
    action: "Find"
}
]