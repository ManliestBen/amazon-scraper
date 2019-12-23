const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/b/ref=usbk_surl_books/?node=283155');
    await page.click('#acs-product-block-0 > div.a-section.a-spacing-mini.a-spacing-top-micro.acs-product-block__product-image > a > img')
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
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