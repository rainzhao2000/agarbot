
import puppeteer from 'puppeteer';

async function delay(ms) {
    await new Promise((res) => {
        setTimeout(() => res(), ms);
    });
    return true;
}

function clearInput(inputSelector) {
    document.querySelector(inputSelector).value = "";
}

export default async function execBot({ botName, partyCode }) {
    const config = {
        headless: true
    };
    const browser = await puppeteer.launch(config);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://agar.io/');
    // const connectionSelector = 'div#blocker>span.connecting-text';
    // await page.waitForSelector(connectionSelector, { timeout: 60000 });
    await page.waitForFunction(delay, {}, 5000);
    const joinSelector = 'button.party-join';
    await page.waitForSelector(joinSelector);
    await page.click(joinSelector);
    const inputSelector = 'input.party-token';
    await page.waitForSelector(inputSelector);
    await page.evaluate(clearInput, inputSelector);
    await page.type(inputSelector, partyCode);
    await page.click(joinSelector);
    await page.waitForFunction(delay, {}, 1000);
    const nameSelector = 'input#nick';
    await page.waitForSelector(nameSelector);
    await page.evaluate(clearInput, nameSelector);
    await page.type(nameSelector, botName);
    await page.waitForFunction(delay, {}, 1000);
    const playSelector = 'button.party-play';
    await page.waitForSelector(playSelector);
    await page.click(playSelector);
    await page.mouse.move(10, 10);
    await page.mouse.move(20, 20);
    const statsSelector = 'div#stats';
    await page.waitForSelector(statsSelector, { visible: true, timeout: 60000 });
    await browser.close();
}