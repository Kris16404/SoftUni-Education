const { chromium } = require('playwright-chromium');
const { expect, assert } = require('chai');

let host = 'http://127.0.0.1:5500/01/';
let browser;
let page;

const mockedData = {
  1: {
    author: 'Spami',
    content: 'Hello, are you there?',
  },
  2: {
    author: 'Garry',
    content: 'Yep, whats up :?',
  },
  3: {
    author: 'Spami',
    content: 'How are you? Long time no see? :)',
  },
  4: {
    author: 'George',
    content: 'Hello, guys! :))',
  },
  5: {
    author: 'Spami',
    content: 'Hello, George nice to see you! :)))',
  },
};

let laodMessageExpect =
  'Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))';

describe('e2e tests', async function () {
  before(async function () {
    browser = await chromium.launch({ headless: false, slowMo: 1000 });
  });
  after(async function () {
    await browser.close();
  });

  beforeEach(async function () {
    page = await browser.newPage();
  });

  afterEach(async function () {
    page.close();
  });

  it('load messages tests', async function () {
    await page.goto(host);
    await page.waitForSelector('#refresh');
    await page.click('#refresh');
    let result = await page.$eval('#messages', (msg) => msg.value);
    expect(result).to.equal(laodMessageExpect);
  });

  it('send message tests', async function () {
    await page.goto(host);
    await page.waitForSelector('#submit');
    await page.waitForSelector('[name="author"]');
    await page.waitForSelector('[name="content"]');

    await page.locator('[name="author"]').fill('Kris');
    await page.locator('[name="content"]').fill('Hi, I am KRIS');
    await page.click('#submit');

    let result = await page.$eval('#messages', (msg) => msg.value);
    expect(result).to.equal(`${laodMessageExpect}\nKris: Hi, I am KRIS`);
  });
});
