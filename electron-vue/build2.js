'use strict'

process.env.NODE_ENV = 'production'

const { say } = require('cfonts')
const chalk = require('chalk')
const del = require('del')
const { spawn } = require('child_process')
const webpack = require('webpack')
const Multispinner = require('multispinner')
const fs  = require('fs')
let adtlpath = './build/adtl.AppImage';
let adtlexc = fs.existsSync(adtlpath );
if(adtlexc){
  fs.unlinkSync(adtlpath);
}

let now_adtlpath = './build/adtl '+process.env.npm_package_version+'.AppImage';
let adtlexc2 = fs.existsSync(now_adtlpath );
if(adtlexc2){
  fs.copyFileSync(now_adtlpath,adtlpath);
}
console.log(adtlexc2)

