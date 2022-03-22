import { TextChannel } from 'discord.js';
import { inspect } from 'util';
import * as ts from "typescript";

export function(channel:TextChannel, code: tring) {
  const result: Object = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS }});
  console.log(result);
  channel.send(inspect(eval(result.outputText)));
}