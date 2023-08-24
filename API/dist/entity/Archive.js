"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Archive = void 0;
var typeorm_1 = require("typeorm");
var Archive = /** @class */ (function () {
    function Archive() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ type: 'int', width: 11 }),
        __metadata("design:type", Number)
    ], Archive.prototype, "dateTime", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Archive.prototype, "usUnits", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Archive.prototype, "interval", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "barometer", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "pressure", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "altimeter", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "inTemp", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "outTemp", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "inHumidity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "outHumidity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "windSpeed", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "windDir", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "windGust", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "windGustDir", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "rainRate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "rain", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "dewpoint", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "windchill", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "heatindex", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "ET", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "radiation", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "UV", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "extraTemp1", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "extraTemp2", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "heatingVoltage", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "supplyVoltage", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "referenceVoltage", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "windBatteryStatus", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "rainBatteryStatus", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "outTempBatteryStatus", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'double', nullable: true }),
        __metadata("design:type", Number)
    ], Archive.prototype, "inTempBatteryStatus", void 0);
    Archive = __decorate([
        (0, typeorm_1.Entity)()
    ], Archive);
    return Archive;
}());
exports.Archive = Archive;
//# sourceMappingURL=Archive.js.map