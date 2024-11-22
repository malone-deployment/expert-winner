/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const wifi_entity_1 = __webpack_require__(6);
const wifi_module_1 = __webpack_require__(8);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                //   type: 'postgres',
                //   host:
                //     process.env.DB_HOST ||
                //     '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
                //   port: parseInt(process.env.DB_PORT, 10) || 5432,
                //   username: process.env.DB_USER || 'postgres',
                //   password: process.env.DB_PASSWORD || '9DPx*:O=S3rDL.:l',
                //   database: process.env.DB_NAME || 'postgres',
                //   entities: [WifiEntity],
                //   synchronize: true,
                type: 'postgres',
                host: '/cloudsql/rpi-hub-438905:asia-southeast1:postgresql',
                port: 5432,
                username: 'postgres', // Use environment variable for DB user
                database: 'postgres', // Use environment variable for DB name
                password: '9DPx*:O=S3rDL.:l', // Use environment variable for DB password
                entities: [wifi_entity_1.WifiEntity],
                synchronize: true,
            }),
            wifi_module_1.WifiModule,
        ],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WifiEntity = void 0;
const tslib_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(7);
let WifiEntity = class WifiEntity {
};
exports.WifiEntity = WifiEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], WifiEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], WifiEntity.prototype, "tokenId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], WifiEntity.prototype, "minuteCredits", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], WifiEntity.prototype, "date", void 0);
exports.WifiEntity = WifiEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], WifiEntity);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WifiModule = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const wifi_entity_1 = __webpack_require__(6);
const wifi_service_1 = __webpack_require__(9);
const wifi_controller_1 = __webpack_require__(12);
let WifiModule = class WifiModule {
};
exports.WifiModule = WifiModule;
exports.WifiModule = WifiModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([wifi_entity_1.WifiEntity])],
        providers: [wifi_service_1.WifiService],
        controllers: [wifi_controller_1.WifiController],
    })
], WifiModule);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WifiService = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(5);
const QRCode = tslib_1.__importStar(__webpack_require__(10));
const wifi_entity_1 = __webpack_require__(6);
const wifi_type_1 = __webpack_require__(11);
let WifiService = class WifiService {
    constructor(wifiRepository) {
        this.wifiRepository = wifiRepository;
    }
    async generateQR(text) {
        try {
            const result = await QRCode.toDataURL(text);
            //   console.log({ result });
            return result;
        }
        catch (err) {
            console.error(err);
        }
    }
    //   async getToken(minuteByToken: Token): Promise<Buffer> {
    async getToken(minuteByToken) {
        const currentTimestamp = Date.now();
        const id = globalThis.crypto.randomUUID();
        const wifiEntity = new wifi_entity_1.WifiEntity();
        if (wifi_type_1.minutesByToken.hasOwnProperty(minuteByToken)) {
            wifiEntity.tokenId = id;
            wifiEntity.minuteCredits = (0, wifi_type_1.getMinutes)(minuteByToken);
            wifiEntity.date = null;
            try {
                const baseUrl = 'http://localhost:5173';
                // const baseUrl = 'http://192.168.100.57:5173';
                // console.log({ baseUrl });
                const timeoutRedirectUrl = new URL(`/timeoutPage?minuteByToken=${id}`, baseUrl);
                // console.log({ timeoutRedirectUrl });
                const qrCode = await this.generateQR(String(timeoutRedirectUrl));
                // console.log({ qrCode });
                await this.wifiRepository.save(wifiEntity);
                return {
                    qrCode,
                    url: String(timeoutRedirectUrl),
                };
                // return wifiEntity;
            }
            catch (error) {
                console.error('Error saving WifiEntity:', error);
                throw new Error('Failed to save token information');
            }
        }
        else {
            throw new Error(`Token does not exist in enum: ${minuteByToken}`);
        }
    }
    async setStartSession(tokenId) {
        const wifiEntity = await this.wifiRepository.findOne({
            where: { tokenId },
        });
        if (wifiEntity.date !== null)
            return wifiEntity;
        const startDate = Date.now();
        wifiEntity.date = String(startDate);
        try {
            await this.wifiRepository.save(wifiEntity);
            return wifiEntity;
        }
        catch (error) {
            console.error('Error saving WifiEntity:', error);
            throw new Error('Failed to save token information');
        }
    }
};
exports.WifiService = WifiService;
exports.WifiService = WifiService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(wifi_entity_1.WifiEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], WifiService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("qrcode");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.minutesByToken = void 0;
exports.getMinutes = getMinutes;
exports.minutesByToken = {
    '1': '60000',
    '5': '300000',
    '10': '600000',
};
function getMinutes(token) {
    return exports.minutesByToken[token];
}


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WifiController = void 0;
const tslib_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
const wifi_service_1 = __webpack_require__(9);
const wifi_type_1 = __webpack_require__(11);
const wifi_dto_1 = __webpack_require__(13);
let WifiController = class WifiController {
    constructor(wifiService) {
        this.wifiService = wifiService;
    }
    //   @Get(':id')
    //   findOne(@Param('id') id: string): string {
    //     return `This action returns a #${id} cat`;
    //   }
    fck() {
        return 'fck this shit';
    }
    startSession(id) {
        console.log({ id });
        return this.wifiService.setStartSession(id);
    }
    getToken(token) {
        console.log(typeof token, token, 'token here');
        const wifiToken = new wifi_dto_1.WifiTokenDTO(token);
        return this.wifiService.getToken(wifiToken.token);
    }
};
exports.WifiController = WifiController;
tslib_1.__decorate([
    (0, common_1.Get)('fck'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], WifiController.prototype, "fck", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], WifiController.prototype, "startSession", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('minuteByToken')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof wifi_type_1.Token !== "undefined" && wifi_type_1.Token) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], WifiController.prototype, "getToken", null);
exports.WifiController = WifiController = tslib_1.__decorate([
    (0, common_1.Controller)('wifi'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof wifi_service_1.WifiService !== "undefined" && wifi_service_1.WifiService) === "function" ? _a : Object])
], WifiController);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateQRCodeBodyDTO = exports.WifiTokenDTO = void 0;
const tslib_1 = __webpack_require__(3);
const wifi_type_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(14);
class WifiTokenDTO {
    constructor(rawToken) {
        this.rawToken = rawToken;
        this.token = this.rawToken;
    }
}
exports.WifiTokenDTO = WifiTokenDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.IsEnum)(wifi_type_1.minutesByToken),
    tslib_1.__metadata("design:type", typeof (_a = typeof wifi_type_1.Token !== "undefined" && wifi_type_1.Token) === "function" ? _a : Object)
], WifiTokenDTO.prototype, "token", void 0);
class GenerateQRCodeBodyDTO {
}
exports.GenerateQRCodeBodyDTO = GenerateQRCodeBodyDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    tslib_1.__metadata("design:type", String)
], GenerateQRCodeBodyDTO.prototype, "tokenId", void 0);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ })
/******/ 	]);
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const HOST = '0.0.0.0';
// 'https://backend-image-422041495987.asia-southeast1.run.app/wifi/ this is the right host base'
const PORT = Number(process.env.PORT) || 8080;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(PORT, HOST).then(() => {
        // tslint:disable-next-line:no-console
        console.log(`** Nest Live Development Server is listening on ${HOST}:${PORT}, open your browser on http://localhost:${PORT}/ **`);
    });
}
bootstrap();

})();

/******/ })()
;