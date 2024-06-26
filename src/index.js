const puppeteer = require('puppeteer');
const fs = require('fs');

const file = fs.readFileSync('./credentials.json');
const datauser = JSON.parse(file);
const LOGIN_INSTAGRAM = datauser.LOGIN;
const SENHA_INSTAGRAM = datauser.SENHA;
const LINK_INSTAGRAM = datauser.POST_LINK;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const date = () => {
    d = new Date();
    return (d.getDate().toString() + "/" + d.getMonth().toString() + "/" + d.getFullYear().toString() + " " +
    d.getHours().toString() + ":" + d.getMinutes().toString())
}

const comment = async (link) => {
    let browser = null;

    try {
        const file = fs.readFileSync('./comentarios.json');
        const json = JSON.parse(file);
        const profiles = json.lista;
        fs.writeFileSync('./comentarios.json' , JSON.stringify(json));
        browser = await puppeteer.launch({
            headless: false, 
            args: ['--start-maximized'] ,
            defaultViewport: null
        });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(60000);
        await page.goto(link);

        // Esperar pelo link com o texto "Entrar"
        await page.waitForXPath("//a[contains(text(), 'Entrar')]");
        // Clicar no link
        const buttonEntrar = await page.$x("//a[contains(text(), 'Entrar')]");
        if (buttonEntrar.length > 0) {
            await buttonEntrar[0].click();
        } 
       
        await page.waitForSelector('form#loginForm');
        await page.type("input[aria-label='Telefone, nome de usuário ou email']", LOGIN_INSTAGRAM, { delay: 150 });
        await page.type("input[aria-label='Senha']", SENHA_INSTAGRAM, { delay: 150 });
        await page.click("form#loginForm button[type='submit']");


        await page.waitForXPath('//div[contains(text(), "Agora não")]');
        const button = await page.$x('//div[contains(text(), "Agora não")]');
        if (button.length > 0) {
            await button[0].click();
        }

        await page.waitForSelector('textarea[aria-label="Adicione um comentário..."]');
        var qtd_comentarios = 0;

        while(1) {
            let pos = randomInt(0,profiles.length);
            let comentario = profiles[pos].ig;
            await page.type('textarea[aria-label="Adicione um comentário..."]', comentario, { delay: randomInt(200, 500) });
            await page.waitForXPath('//div[contains(text(), "Publicar") and @role="button"]');
            const buttons = await page.$x('//div[contains(text(), "Publicar") and @role="button"]');
            if (buttons.length > 0) {
                await buttons[0].click();
            }
            console.log(qtd_comentarios);
            qtd_comentarios++;
            await page.waitFor(randomInt(470000, 490000));
        }     

        await browser.close();
        console.log(date()); 
    } catch (err) {
        console.log(err);
    } /* finally {
        browser.close();
        await  sleep(randomInt(3000000, 3120000));
    } */
};

const commentForever = async () => {
    while(true){
      await comment(LINK_INSTAGRAM);
      break;
    }
}

commentForever();