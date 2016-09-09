#! /usr/bin/env node

'use strict';

var path = require('path'),
    resumePath = path.join('..', 'cfg', 'resume.json'),
    imgPath = path.join('..', 'cfg', 'img.json');

var chalk = require('chalk'),
    crkey = require('crkey'),
    readline = require('readline'),
    img = require(imgPath),
    resume = '';

const PASSTXT = ' *由于是public仓库,为了信息安全请输入密令：';

function log(tx) {
  for (var start = +new Date; + new Date - start <= 100;) {}
  console.log(tx);
};

function printForm(tg) {
  log(chalk.yellow('\n+----------+'));
  log(chalk.blue('  ' + tg.title));
  log(chalk.yellow('+----------+'));
  log('')
  for (var item in tg.data) {
    log(`${chalk.red('•')} ` + chalk.white(tg.data[item].key) + `${chalk.white(':')} ${tg.data[item].val}`);
  }
}

function showBasic() {
  printForm(resume.basicInfo);
};

function showContact() {
  printForm(resume.contact);
}

function showSkill() {
  printForm(resume.itSkill);
}

function showProduct() {
  printForm(resume.product);
}

function showPicture() {
  if(!img) return;
  for (let i in img.image) {
    log(img.image[i]);
  }
}

module.exports = function(options) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(chalk.red(PASSTXT), (answer) => {
    // TODO: Log the answer in a database
    rl.close();

    crkey.decrypto(resumePath, answer, 'blowfish', false, (res) => {
      resume = JSON.parse(res);
      if (options.basic) {
        showBasic();
      } else if (options.contact) {
        showContact();
      } else if (options.skill) {
        showSkill();
      } else if (options.product) {
        showProduct();
      } else if (options.picture) {
        showPicture();
      } else {
        showBasic();
        showProduct();
        showSkill();
        showContact();
      }
    });

  });

}
