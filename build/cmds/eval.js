"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const ts = __importStar(require("typescript"));
exports.func = async (client, message, operator, type, ...code) => {
    await message.react('721258817546878976');
    await message.react('721260517875777546');
    if (!operator.includes(message.author.id)) {
        return message.channel.send('使用権限がありません');
    }
    const result = (type === 'js' ? code.join(' ') : type === 'ts' ? ts.transpileModule(code.join(' '), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText : '');
    message.channel.send((0, util_1.inspect)(eval(result)).slice(0, 2000)).then(msg => msg.react('721260517875777546'));
};
