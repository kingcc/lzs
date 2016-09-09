#! /usr/bin/env node

var program = require('commander');
var log = console.log;
var resume = require('../lib/resume.js');


program
  .version('1.0.0')
  .usage('[option] <keyword>');

program
  .command('resume')
  .alias('rs')
  .description('查看我的简历！')
  .option('-c, --contact', '联系方式')
  .option('-b, --basic', '基本信息')
  .option('-s, --skill', '技能清单')
  .option('-p, --product', '项目清单')
  .action(function(options) {
    resume(options);
  });

program
  .on('--help', function() {
    log('    -b, --basic    基本信息');
    log('    -p, --product  项目清单');
    log('    -s, --skill    技能清单');
    log('    -c, --contact  联系方式');
    log();
  });


//默认不传参显示帮助
if (!process.argv[2]) {
  program.help();
  log();
}

program.parse(process.argv);
