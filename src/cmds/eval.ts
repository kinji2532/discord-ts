import { TextChannel } from 'discord.js';
import { inspect } from 'util';
import * as ts from "typescript";

exports = (channel:TextChannel, code: string) =>{
  const result = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS }});
  console.log(result);
  channel.send(inspect(eval(result.outputText)));
}