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
    route: "/cmm/:dateTime",
    controller: CmmController,
    action: "one"
},

{
    method: "get",
    route: "/cmm1",
    controller: Cmm1Controller,
    action: "last"
}, {
    method: "get",
    route: "/cmm1/:dateTime",
    controller: Cmm1Controller,
    action: "one"
},

{
    method: "get",
    route: "/cmm2",
    controller: Cmm2Controller,
    action: "last"
}, {
    method: "get",
    route: "/cmm2/:dateTime",
    controller: Cmm2Controller,
    action: "one"
}
]