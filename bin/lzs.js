#! /usr/bin/env node

var program = require('commander'),
    path = require('path'),
    resume = require(path.join('..','lib','resume.js')),
    log = console.log;


program
  .version('1.2.6')
  .usage('[option] <keyword>');

program
  .command('resume')
  .alias('rs')
  .description('查看我的简历！')
  .option('-c, --contact', '联系方式')
  .option('-b, --basic', '基本信息')
  .option('-s, --skill', '技能清单')
  .option('-p, --product', '项目清单')
  .option('-i, --picture', '帅照')
  .action(function(options) {
    resume(options);
  });

program
  .on('--help', function() {
    log('    -i, --picture  帅照');
    log('    -b, --basic    基本信息');
    log('    -p, --product  项目清单');
    log('    -s, --skill    技能清单');
    log('    -c, --contact  联系方式');
    log('    ');
    log('  Example:');
    log('    ');
    log('    lzs resume -i');
    log();
  });


//默认不传参显示帮助
if (!process.argv[2]) {
  program.help();
  log();
}

program.parse(process.argv);
