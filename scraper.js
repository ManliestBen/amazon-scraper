const puppeteer = require('puppeteer');  // Require puppeteer 

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});  // Set to headless mode to prevent browser from opening, saving system resources
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/b/ref=usbk_surl_books/?node=283155');  // Main book section in Amazon site
    await page.click('#acs-product-block-0 > div.a-section.a-spacing-mini.a-spacing-top-micro.acs-product-block__product-image > a > img')  // Navigates to first image within the section selected
    await page.waitFor(1000);

    const result = await page.evaluate(() => {   // Selects which sections on the page are necessary for saving relevant data, then saves them to variables
        let title = document.querySelector('#productTitle').innerText;
        let price = document.querySelector('.offer-price').innerText;
        let description = document.querySelector('#productDescription > div:nth-child(2) > div.a-expander-content.a-expander-partial-collapse-content > p').innerText;
        let dimensions = document.querySelector('#productDetailsTable > tbody > tr > td > div > ul > li:nth-child(6)').innerText;
        let imageURL = document.querySelector('.imageThumb').innerHTML;
        let weight = document.querySelector('#productDetailsTable > tbody > tr > td > div > ul > li:nth-child(7)').innerText;
        return {
            title,
            price,
            description,
            dimensions,
            imageURL,
            weight
        }
    })

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value);
});