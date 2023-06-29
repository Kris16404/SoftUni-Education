const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser;
let context;
let page;
const host = 'http://localhost:5500';

describe('setup', async function () {
  before(async () => {
    browser = await chromium.launch({ headless: false, slowMo: 1000 });
  });
  after(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    context = await browser.newContext();
    setupContext(context);
    page = await context.newPage();
  });
  afterEach(async () => {
    await page.close();
    await context.close();
  });
});

describe('load messages test', async function () {
  await page.goto(host);
  await page.click('#refresh');
  let domEl = await page.locator('#messages');
  expect(domEl.textContemnt).to.equal(
    'Spami: Hello, are you there?Garry: Yep, wShats up :?Spami: How are you? Long time no see? :)George: Hello, guys! :))Spami: Hello, George nice to see you! :)))'
  );
});
