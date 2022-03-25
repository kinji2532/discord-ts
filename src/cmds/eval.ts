/* eslint-disable no-eval *//* eslint-disable arrow-spacing *//* eslint-disable space-before-blocks *//* eslint-disable keyword-spacing *//* eslint-disable array-bracket-spacing *//* eslint-disable brace-style *//* eslint-disable semi */
import { Client, Message } from 'discord.js';
import { inspect } from 'util';
import * as ts from 'typescript';

exports.func = async (client: Client, message: Message, operator: string[], type: string, ...code: string[]) =>{
  await message.react('721258817546878976');
  await message.react('721260517875777546');
  if(!operator.includes(message.author.id)){
    return message.channel.send('使用権限がありません');
  }
  const result = (type === 'js' ? code.join(' ') : type === 'ts' ? ts.transpileModule(code.join(' '), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText : '');
  message.channel.send(inspect(eval(result))).then(msg=>msg.react('721260517875777546'));
}
