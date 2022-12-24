"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let ProductsService = class ProductsService {
    constructor() {
        this.products = [];
    }
    create(product) {
        const id = (0, crypto_1.randomBytes)(10).toString('hex');
        this.products.push(Object.assign({ id }, product));
    }
    findAll() {
        return this.products;
    }
    update(id, product) {
        const productFind = this.products.find((item) => item.id == id);
        const productUpdate = Object.assign(Object.assign({}, productFind), product);
        this.products = this.products.filter((item) => item.id != id);
        this.products.push(productUpdate);
    }
    delete(id) {
        this.products = this.products.filter((item) => item.id != id);
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map