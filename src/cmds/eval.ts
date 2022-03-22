import { TextChannel } from 'discord.js';
import { inspect } from 'util';
import * as ts from "typescript";

exports.func = (channel:TextChannel, type: string, code: string) =>{
  const result = (type === 'js' ? code:type === 'ts' ? ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS }}):'');
  channel.send(inspect(eval(result.outputText)));
}