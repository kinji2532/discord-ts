import { Client, Message } from 'discord.js';
import { inspect } from 'util';
import * as ts from "typescript";

exports.func = async (client: Client, message: Message, type: string, ...code: string[]) =>{
  await message.react('721258817546878976');
  await message.react('721260517875777546');
  const result = (type === 'js' ? code.join(' '):type === 'ts' ? ts.transpileModule(code.join(' '), { compilerOptions: { module: ts.ModuleKind.CommonJS }}).outputText:'');
  message.channel.send(inspect(eval(result)));
}