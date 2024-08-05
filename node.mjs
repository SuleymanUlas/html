import fs, { mkdir } from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import { createServer } from 'https';
import express from 'express';
import { WebSocketServer } from 'ws';
import pdfjs from 'pdfkit';
import { mkdirSync } from 'fs';
let send_email = '';
let send_code = '';
let msa = 'Hello, your verification code to log in to your account';
const options = {
    key: fs.readFileSync('./-package/private.key'),
    cert: fs.readFileSync('./-package/certificate.crt'),
    ca: fs.readFileSync('./-package/ca_bundle.crt')
};
const server = createServer(options, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket Server is Running');
});
const wss = new WebSocketServer({ server });
function deleteOldFiles(folderPath, thresholdDays) {
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        const fileAgeInMs = Date.now() - stats.mtime.getTime();
        const fileAgeInDays = fileAgeInMs / (1000 * 60 * 60 * 24);

        if (fileAgeInDays > thresholdDays) {
            fs.unlinkSync(filePath);
            console.log(`Deleted ${file} (${fileAgeInDays.toFixed(2)} days old).`);
        }
    });
}
const folderPath = './Locked';
const thresholdDays = 3;
deleteOldFiles(folderPath, thresholdDays);
wss.on('connection', function connection(ws) {
    console.log('\x1b[32mClient connected\x1b[0m');
    ws.on('message', function incoming(message) {
        console.log('\x1b[33mSystem starting\x1b[0m');
        try {
            message = JSON.parse(message);
            const fileprogres = /\(Email:([^?]+)\?Ext:([^?]+)\?Message:(.+)\)$/g;
            if (message.emailtxt && message.filesext && message.file) {
                message.filesext.replace(/.([^.]+)$/g, (match, one) => {
                    if (one == 'pdf') {
                        const pdf = new pdfjs;

                    }
                    else if (one) {
                    }
                });
                fs.writeFile(`./file/${message.emailtxt}/${message.filesext}`, Buffer.from(message.file, 'base64'), (err) => {
                    if (err) { console.log(err) }
                });
            }
            else if (fileprogres.test(message)) {
                ws.send('hello!')
                message.replace(fileprogres, (match, email, ext, messageV) => {
                    ext.replace(/.([^.]+)$/g, (match, one) => {
                        if (one == 'pdf') {
                            const pdf = new pdfjs;
                        }
                        else if (one) {
                        }
                    });
                });
            }
        }
        catch (err) {
            message = message.toString();
            let sign = ''; sign = message; const signupRegex = /S\((.+)\)U$/g;
            const complateRegex = /%4\?4%Code:(.+)%4\?4%Email:(.+)%4\?4%$/g;
            const loginRegex = /\/Email:([^?]+)\?Password:(.+)Finit%$/g;
            const idRegex = /!ID:([^!]+)!Email:([^!]+)!$/g;
            const lockRegex = /!Lock{([^}]+)}$/g;
            const helpRegex = /\(help-([^-]+)-help\)$/g;
            const recoveryRegex = /\(Email:(.+)Password:(.+)Code:(.+)\)$/g;
            const changeImageRegex = /Email:([^?]+)\?Profile:(.+)/g;
            const deleteRegex = /DELETE:([^,]+),(.+)/g;
            /** 
             * ?Acount area*/
            if (idRegex.test(sign)) {
                sign = sign.replace(idRegex, (match, ids, email) => {
                    fs.readFile(`SQL/${email}.su`, 'utf8', (err, data) => {
                        if (email != 'null') {
                            if (err) {
                                ws.send('SET(%Email:null/Name:null/Id:null%)VALUE');
                            }
                            else {
                                const acountRegex = /Name:⁂([^⁂]+)⁂Email:⁂([^⁂]+)⁂Password:⁂([^⁂]+)⁂Id:⁂([^⁂]+)⁂/g;
                                data.replace(acountRegex, (match, Nam, Ema, Pass, id) => {
                                    if (match) {
                                        if (ids == id) { }
                                        else {
                                            let log = `SET(%Email:null/Name:null/Id:null%)VALUE`; ws.send(log);
                                        }
                                    }
                                    else {
                                        let quick = 'Acount is broken!'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query);
                                    }
                                });
                            }
                        }
                    });
                });
            }
            else if (signupRegex.test(sign)) {
                const nameRegex = /Name:([^+]+)\+Email:/g; const emailRegex = /Email:([^+]+)\+Password:/g; const passwordRegex = /Password:([^+]+)\+Profile:/g; const profileRegex = /Profile:(.+)\)U/g;
                let name = ''; let email = ''; let password = ''; let profile = ''; let letter = ''; let leternum = 0;
                letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; leternum = Math.floor(Math.random() * 26); let oneL = letter.charAt(leternum); let one = Math.floor(Math.random() * 10) + 1;
                let two = Math.floor(Math.random() * 10) + 1; let three = Math.floor(Math.random() * 10) + 1; let four = Math.floor(Math.random() * 10) + 1; let five = Math.floor(Math.random() * 10) + 1;
                const code = `${oneL}-${one}${two}${three}${four}${five}`;
                sign = sign.replace(nameRegex, (match, names) => { name = names; return match; });
                sign = sign.replace(emailRegex, (match, emails) => { email = emails; return match; });
                sign = sign.replace(passwordRegex, (match, passwords) => { password = passwords; return match; });
                sign = sign.replace(profileRegex, (match, profiles) => { profile = profiles; return match; });
                let ok = email.trim();
                function random() {
                    let result = '';
                    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    result += letters.charAt(Math.floor(Math.random() * 26));
                    for (let i = 0; i < 19; i++) {
                        result += Math.floor(Math.random() * 10);
                    }
                    result += letters.charAt(Math.floor(Math.random() * 26));
                    return result;
                }
                if (ok) {
                    let text = `Name:${name}%+/Email:${email}%+/Password:${password}%+/Id:${random()}%+/`;
                    fs.writeFile(`./waited_acount/${code}.txt`, text, (err) => { if (err) { console.warn(err); } });
                    send_email = email;
                    send_code = code;
                    SU();
                    const file = Buffer.from(profile, 'base64');
                    fs.writeFile(`profil/${email}.png`, file, (err) => { if (err) { console.warn('Profil picture not saved'); } });
                }
            }
            else if (complateRegex.test(sign)) {
                let code = ''; let email = '';
                const codeRegex = /%4\?4%Code:(.+)%4\?4%Email/g; const emailRegex = /%4\?4%Email:(.+)%4\?4%/g;
                sign = sign.replace(codeRegex, (match, one) => { code = one; return match; });
                sign = sign.replace(emailRegex, (match, two) => { email = two; return match; });
                let names = ''; let password = ''; let emails = ''; let Id = '';
                fs.readFile(`./waited_acount/${code}.txt`, 'utf8', (err, data) => {
                    if (err) { let quick = 'Wrong code!'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query); }
                    else {
                        const nameRegex = /Name:(.+)\%\+\/Email/g;
                        data = data.replace(nameRegex, (match, namess) => { names = namess.trim(); return match; });
                        const emailRegex = /Email:(.+)\%\+\/Password/g;
                        data = data.replace(emailRegex, (match, one) => { emails = one.trim(); return match; });
                        const passwordRegex = /Password:(.+)\%\+\/Id/g;
                        data = data.replace(passwordRegex, (match, two) => { password = two.trim(); return match; });
                        const IdRegex = /Id:(.+)\%\+\//g;
                        data = data.replace(IdRegex, (match, two) => { Id = two.trim(); return match; });
                        if (email == emails) {
                            fs.readFile(`./Locked/${emails}.lock`, 'utf8', (err, data) => {
                                if (err) {
                                    if (names) {
                                        if (password) {
                                            if (!fs.existsSync(`./SQL/${email}.su`)) {
                                                fs.writeFile(`./SQL/${email}.su`, `Name:⁂${names}⁂Email:⁂${email}⁂Password:⁂${password}⁂Id:⁂${Id}⁂`, (err) => { if (err) { let quick = 'Please retry...'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query); } });
                                                const query = `SET(%Email:${email}/Name:${names}/Id:${Id}%)VALUES`; ws.send(query);
                                                if (!fs.existsSync(`./file${email}`)) { fs.mkdirSync(`./file/${email}`); }
                                            }
                                            else {
                                                let quick = 'E-mail used!'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query);
                                            }
                                            fs.unlink(`./waited_acount/${code}.txt`, (err) => { if (err) { console.error('Error deleting file:', err); } });
                                        }
                                    }
                                }
                                else { let quick = 'Account closed for 3 days!'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query); }
                            });
                        }
                    }
                });
            }
            else if (loginRegex.test(sign)) {
                let email = ''; let password = '';
                const emailRegex = /\/Email:([^?]+)\?Password:/g; const passwordRegex = /\?Password:(.+)Finit%/g;
                sign = sign.replace(emailRegex, (match, emails) => { email = emails; return match; });
                sign = sign.replace(passwordRegex, (match, passwords) => { password = passwords; return match; });
                ws.send(`Info?:Please wait+/+Color:green+`);
                fs.readFile(`./SQL/${email}.su`, 'utf8', (err, data) => {
                    if (err) {
                        let quick = 'Email not found!'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query);
                    }
                    else {
                        const acountRegex = /Name:⁂([^⁂]+)⁂Email:⁂([^⁂]+)⁂Password:⁂([^⁂]+)⁂Id:⁂([^⁂]+)⁂/g;
                        data.replace(acountRegex, (match, Nam, Ema, Pass, Id) => {
                            fs.readFile(`./Locked/${Ema}.lock`, 'utf8', (err, data) => {
                                if (err) {
                                    if (match) {
                                        if (password == Pass) {
                                            let quick = 'Welcome'; let color = 'green'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query); let log = `SET(%Email:${email}/Name:${Nam}/Id:${Id}%)VALUE`; ws.send(log);
                                        }
                                        else {
                                            let quick = 'Wrong password'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query);
                                        }
                                    }
                                    else {
                                        let quick = 'Acount is broken!'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query);
                                    }
                                }
                            });
                        });
                    }
                });
            }
            else if (lockRegex.test(sign)) {
                sign = sign.replace(lockRegex, (match, email) => {
                    fs.writeFile(`./Locked/${email}.lock`, '', (err) => {
                        if (err) { ws.send(`Info?:Error!Please retry+/+Color:red+`) }
                    });
                });
            }
            else if (helpRegex.test(sign)) {
                sign = sign.replace(helpRegex, (match, email) => {
                    fs.readFile(`./Locked/${email}.lock`, 'utf8', (err, data) => {
                        if (err) {
                            let letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; let leternum = Math.floor(Math.random() * 26); let oneL = letter.charAt(leternum); let one = Math.floor(Math.random() * 10) + 1;
                            let two = Math.floor(Math.random() * 10) + 1; let three = Math.floor(Math.random() * 10) + 1; let four = Math.floor(Math.random() * 10) + 1; let five = Math.floor(Math.random() * 10) + 1;
                            const code = `${oneL}${one}${two}${three}${four}${five}`;
                            send_email = email;
                            send_code = code;
                            SU();
                            fs.readFile(`./SQL/${email}.su`, 'utf8', (err, data) => {
                                if (err) { let quick = 'Acount is broken!'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query) }
                                else {
                                    fs.writeFile(`./Help/${code}.help`, data, (err) => {
                                        if (err) { ws.send(`Info?:Error!Please retry+/+Color:red+`) }
                                    });
                                }
                            });
                        }
                        else { let quick = 'Account closed for 3 days!'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query); }
                    });
                });
            }
            else if (recoveryRegex.test(sign)) {
                sign = sign.replace(recoveryRegex, (match, email, password, code) => {
                    fs.readFile(`./Locked/${email}.lock`, 'utf8', (err, data) => {
                        if (err) {
                            fs.readFile(`./Help/${code}.help`, 'utf8', (err, data) => {
                                if (err) { let quick = 'Wrong code'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query); }
                                else {
                                    const acountRegex = /Name:⁂([^⁂]+)⁂Email:⁂([^⁂]+)⁂Password:⁂([^⁂]+)⁂Id:⁂([^⁂]+)⁂/g;
                                    data.replace(acountRegex, (match, Nam, Ema, Pass, Id) => {
                                        if (email == Ema) {
                                            const newdata = `Name:⁂${Nam}⁂Email:⁂${Ema}⁂Password:⁂${password}⁂Id:⁂${Id}⁂`;
                                            fs.writeFile(`./SQL/${email}.su`, newdata, (err) => {
                                                if (err) { ws.send(`Info?:Error!Please retry+/+Color:red+`) }
                                                else {
                                                    fs.unlink(`./Help/${code}.help`, (err) => { if (err) { console.error('Error deleting file:', err); } });
                                                    let quick = 'Password changed successfully!Now log in again'; let color = 'green'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query);
                                                    setTimeout(() => {
                                                        ws.send('%ACOUNT%');
                                                    }, 2000);
                                                }
                                            });
                                        }
                                        else {
                                            let quick = 'Wrong code'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query);
                                        }
                                    });
                                }
                            });
                        }
                        else { let quick = 'Account closed for 3 days!'; let color = 'red'; const query = `Info?:${quick}+/+Color:${color}+`; ws.send(query); }
                    });
                });
            }
            else if (changeImageRegex.test(sign)) {
                sign.replace(changeImageRegex, (match, email, profile) => {
                    const file = Buffer.from(profile, 'base64');
                    fs.writeFile(`profil/${email}.png`, file, (err) => { if (err) { console.warn('Profil picture not saved'); } });
                });
            }
            else if (deleteRegex.test(sign)) {
                sign.replace(deleteRegex, (match, email, ids) => {
                    fs.readFile(`SQL/${email}.su`, 'utf8', (err, data) => {
                        if (err) {
                            ws.send('SET(%Email:null/Name:null/Id:null%)VALUE');
                        }
                        else {
                            const acountRegex = /Name:⁂([^⁂]+)⁂Email:⁂([^⁂]+)⁂Password:⁂([^⁂]+)⁂Id:⁂([^⁂]+)⁂/g;
                            data.replace(acountRegex, (match, Nam, Ema, Pass, id) => {
                                if (ids == id) {
                                    ws.send('SET(%Email:null/Name:null/Id:null%)VALUE');
                                    fs.unlink(`SQL/${Ema}.su`, (err) => { if (err) { console.error('Error deleting file:', err); } });
                                }
                                else {
                                    fs.writeFile(`./Locked/${email}.lock`, '', (err) => {
                                        if (err) { ws.send(`Info?:Error!Please retry+/+Color:red+`) }
                                    });
                                }
                            });
                        }

                    });
                });
            }
            /**  
             * ?Acount area */
        }

        async function SU() {
            let count = 0;
            const browser = await puppeteer.launch({
                executablePath: '/usr/bin/chromium-browser',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();
            const url = 'https://webmail.mail.us-east-1.awsapps.com/workmail/?organization=s-u'; await page.goto(url);
            const name = 'suleyman'; const pass = 'wrtytresdfDfdQ7564?!';
            const inputId = 'wdc_username'; const inputId2 = 'wdc_password';
            await page.waitForSelector(`#${inputId}`, { visible: true });
            await page.type(`#${inputId}`, name);
            await page.waitForSelector(`#${inputId2}`, { visible: true });
            await page.type(`#${inputId2}`, pass);
            await page.waitForSelector(`#wdc_login_button`, { visible: true });
            await page.click(`#wdc_login_button`);
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            const buttonHandle = await page.evaluateHandle(() => {
                const xpath = '//*[@id="ext-gen105"]/a';
                const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                return result.singleNodeValue;
            });
            if (buttonHandle) {
                await buttonHandle.click();
            }
            await page.evaluate((send_email, count) => {
                const xpath = '/html/body/div[1]/div/div[2]/div[2]/div[2]/div[2]/div/div[2]/div/div/form/div/div[1]/div/div[1]/div/div[2]/div/div[2]/ul/li/input';
                const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                const inputElement = result.singleNodeValue;
                if (inputElement) {
                    setTimeout(() => {
                        inputElement.value = send_email;
                    }, 1000);
                }
                if (inputElement.value = '') {
                    setTimeout(() => {
                        inputElement.value = send_email;
                    }, 1000);
                }
                if (inputElement.value) {
                    count++
                }
            }, send_email, count);
            const frameHandle = await page.waitForSelector('iframe');
            const frame = await frameHandle.contentFrame();
            if (frame) {
                frame.evaluate((send_code, count) => {
                    const pElement = document.querySelector('p');
                    if (pElement) {
                        setTimeout(() => {
                            pElement.innerText =
                                `Use this code to log into your account
                         Code: ${send_code}
                        If you don't want the code, ignore it.`;
                        }, 1000);
                    }
                    if (pElement.innerText = '') {
                        setTimeout(() => {
                            pElement.innerText =
                                `Use this code to log into your account
                         Code: ${send_code}
                        If you don't want the code, ignore it.`;
                        }, 1000)
                    }
                    if (pElement.value) {
                        count++
                        console.log(count);
                    }
                }, send_code, count);

            }
            //await browser.close();
            const send = await page.waitForSelector('#ext-gen307');
            await page.keyboard.press('ContextMenu');
            setTimeout(() => {
                page.keyboard.press('Enter');
            }, 1000);
            if (send) {
                setTimeout(() => {
                    page.evaluate((count, msa) => {
                        const xpath = '/html/body/div[1]/div/div[2]/div[2]/div[2]/div[2]/div/div[2]/div/div/form/div/div[1]/div/div[1]/div/div[6]/div/input';
                        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                        const inputElement = result.singleNodeValue;
                        if (inputElement) {
                            setTimeout(() => {
                                inputElement.value = msa;
                            }, 1000);
                        }
                        if (inputElement.value == '') {
                            setTimeout(() => {
                                inputElement.value = msa;
                            }, 1000);
                        }
                        if (inputElement.value) {
                            count++
                        }
                    }, count, msa);
                }, 2000);
                setTimeout(() => {
                    send.click();
                    console.log('Finish!');
                    setTimeout(() => {
                        serun();
                    }, 2000);
                }, 4000);
            }
            function serun() {
                browser.close();
            }
        }
    });
});

server.listen(3000, () => {
    console.log(`\x1b[36mServer is runing...\x1b[0m`);
});
