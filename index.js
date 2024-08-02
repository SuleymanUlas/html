var isDarkTheme = false; var body = document.body; let signup = ""; let sets = true; let key = 'null'; var originalSetItem = sessionStorage.setItem; var orginalGetItem = sessionStorage.getItem; var contextObj = sessionStorage;
SysSecurity(false); const id = localStorage.getItem("Id"); const nametxt = localStorage.getItem("Name"); const emailtxt = localStorage.getItem("Email");
let Backgroundtxt = localStorage.getItem("Background"); let BackgrounDtxt = localStorage.getItem("BackgrounD"); let Lighticon = localStorage.getItem("Lighticon"); let Darkicon = localStorage.getItem("Darkicon"); let fontFamilys = localStorage.getItem("fontFamily"); let fontColors = localStorage.getItem("Fontcolor"); let fontSizes = localStorage.getItem("fontSize"); let fontStyle = localStorage.getItem("fontStyle");
SysSecurity(true);
const ws = new WebSocket("ws://ec2-13-60-92-231.eu-north-1.compute.amazonaws.com:3000");
ws.onopen = function () {
    if (emailtxt != 'null') {
    ws.send(`!ID:${id || 'null'}!Email:${emailtxt}!`);
    }
}
ws.onmessage = (event) => {
    const data = event.data;
    let message = ""; message = data;
    console.log(message);
    const LOgRegex = /SET\(%Email:([^/]+)\/Name:([^/]+)\/Id:([^%]+)%\)VALUE$/g;
    const SIgnRegex = /SET\(%Email:([^/]+)\/Name:([^/]+)\/Id:([^%]+)%\)VALUES$/g;
    const InfoRegex = /Info\?:([^+]+)\+\/\+Color:([^+]+)\+$/g;
    if (message == '%ACOUNT%') {
        close_content();
        userButton('login');
    }
    else if (InfoRegex.test(message)) {
        let content = message.slice(6);
        const colorRegex = /Color:(.+)\+/g;
        let color = "";
        content = content.replace(colorRegex, (match, colors) => {
            color = colors;
        });
        const Info = document.createElement("div");
        Info.className = "Info_Div";
        Info.style.backgroundColor = `${color}`;
        const length = content.length;
        let context = length - 12;
        let text = content.slice(0, context);
        const body = document.body;
        body.appendChild(Info);
        typeMessage(Info, `${text}`, "lime");
        function typeMessage(container, message, color) {
            const messageSpan = document.createElement("span");
            messageSpan.style.color = `${color}`;
            messageSpan.style.textAlign = "center";
            messageSpan.style.width = "100%";
            messageSpan.style.display = "block";
            messageSpan.style.borderRadius = "10px";
            messageSpan.style.fontSize = "italic";
            container.appendChild(messageSpan);
            let times = 30;
            function changeTimes(newTimes) {
                times = newTimes;
            }
            setTimeout(changeTimes, 3000, 20);
            setTimeout(changeTimes, 6000, 10);
            setTimeout(changeTimes, 10000, 5);
            let index = 0;
            function typeNextCharacter() {
                if (index < message.length) {
                    messageSpan.textContent += message.charAt(index);
                    index++;
                    setTimeout(typeNextCharacter, times);
                }
            }
            typeNextCharacter();
        }

        setTimeout(() => {
            body.removeChild(Info);
        }, 3000);
    } else if (SIgnRegex.test(message)) {
        sessionStorage = orginalGetItem;
        let email = ''; let names = ''; let id = '';
        message = message.replace(SIgnRegex, (match, emails, namess, ids) => { email = emails; names = namess; id = ids });
        const content2 = document.getElementById("ucontent");
        while (content2.firstChild) {
            content2.removeChild(content2.firstChild);
        }
        const user = document.getElementById("content");
        user.style.visibility = "hidden";
        SysSecurity(false);
        localStorage.setItem("Email", email);
        localStorage.setItem("Name", names);
        localStorage.setItem("Id", id);
        SysSecurity(true);
        function random() {
            let leternum = 0;
            let letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; leternum = Math.floor(Math.random() * 26); let oneL = letter.charAt(leternum); let one = Math.floor(Math.random() * 10) + 1;
            let two = Math.floor(Math.random() * 10) + 1; let three = Math.floor(Math.random() * 10) + 1; let four = Math.floor(Math.random() * 10) + 1; let five = Math.floor(Math.random() * 10) + 1;
            return `${oneL}-${one}${two}${three}${four}${five}.`;
        }
        key = random();
        originalSetItem.apply(contextObj, ["key", key]);
        sets = false;
        setTimeout(() => {
            location.reload();
        }, 3000);
    } else if (LOgRegex.test(message)) {
        let email = ''; let names = ''; let id = '';
        message = message.replace(LOgRegex, (match, emails, namess, ids) => { email = emails; names = namess; id = ids });
        SysSecurity(false);
        sessionStorage = orginalGetItem;
        localStorage.setItem("Email", email);
        localStorage.setItem("Name", names);
        localStorage.setItem("Id", id);
        SysSecurity(true);
        const content2 = document.getElementById("ucontent");
        while (content2.firstChild) {
            content2.removeChild(content2.firstChild);
        }
        const user = document.getElementById("content");
        user.style.visibility = "hidden";
        setTimeout(() => {
            function random() {
                let leternum = 0;
                let letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; leternum = Math.floor(Math.random() * 26); let oneL = letter.charAt(leternum); let one = Math.floor(Math.random() * 10) + 1;
                let two = Math.floor(Math.random() * 10) + 1; let three = Math.floor(Math.random() * 10) + 1; let four = Math.floor(Math.random() * 10) + 1; let five = Math.floor(Math.random() * 10) + 1;
                return `${oneL}-${one}${two}${three}${four}${five}.`;
            }
            key = random();
            originalSetItem.apply(contextObj, ["key", key]);
            setTimeout(() => {
                sets = false;
                location.reload();
            }, 1000);
        }, 3000);
    }
    else {
        const messageContainer = document.createElement("div");
        messageContainer.style.textAlign = "center";
        messageContainer.style.width = "50%";
        messageContainer.style.minHeight = "5%";
        messageContainer.style.maxHeight = "30%";
        messageContainer.style.alignItems = "center";
        messageContainer.className = "file-container";
        messageContainer.style.marginTop = "10px";
        messageContainer.style.marginBottom = "10px";
        messageContainer.style.fontSize = "italic";
        messageContainer.style.backgroundColor = Backgroundtxt;
        messageContainer.id = "o";
        typeMessage(messageContainer, message, fontColors);
        messagesDiv.appendChild(messageContainer);
    }
    function typeMessage(container, message, color) {
        const messageSpan = document.createElement("span");
        messageSpan.style.color = `${color}`;
        messageSpan.style.textAlign = "center";
        messageSpan.style.width = "100%";
        messageSpan.style.display = "block";
        messageSpan.style.borderRadius = "10px";
        messageSpan.style.fontSize = fontSizes || "italic";
        messageSpan.style.fontStyle = fontStyle;
        messageSpan.style.fontFamily = fontFamilys;
        messageSpan.style.whiteSpace = 'pre-wrap';
        container.appendChild(messageSpan);
        let times = 30;
        function changeTimes(newTimes) {
            times = newTimes;
        }
        setTimeout(changeTimes, 3000, 20);
        setTimeout(changeTimes, 6000, 10);
        setTimeout(changeTimes, 10000, 2);
        let index = 0;
        function typeNextCharacter() {
            let currentChar = message.charAt(index);
            messageSpan.textContent += currentChar;
            index++;
            setTimeout(typeNextCharacter, times);
        }
        typeNextCharacter();

    }
};
sessionStorage.removeItem("key");
sessionStorage.setItem = function () { console.log('Dont try') }
var button = document.getElementById("themebutton");
const main_elements = document.getElementsByClassName("Main_Button2");
const home = document.getElementById("home");
const main_elements2 = document.getElementsByClassName("Main_Button");
const Close_contents = document.getElementById("dialogc");
const main = document.getElementById("main");
const main_user = document.getElementById("main_user");
const dropArea = document.getElementById("drop-area");
const hometool = document.getElementById("home");
const messagesDiv = document.getElementById("x");
const messageInput = document.getElementById("t");
const sendButton = document.getElementById("go");
const fileButton = document.getElementById("fileInput");
const AI = document.getElementById("AI");
function home_menu() {
    location.reload();
}
document.addEventListener("click", function () {
    const mouse = document.getElementById("mouseclick");
    mouse.classList.remove("fa-solid", "fa-computer-mouse");
    mouse.classList.add("fa-solid", "fa-spinner", "fa-spin-pulse");
    setTimeout(() => {
        mouse.classList.remove("fa-solid", "fa-spinner", "fa-spin-pulse");
        mouse.classList.add("fa-solid", "fa-computer-mouse");
    }, 1000);
});
body.style.fontFamily = fontFamilys;
body.style.fontSize = fontSizes;
body.style.fontStyle = fontStyle;
body.style.color = fontColors;
body.style.backgroundColor = BackgrounDtxt || 'black';
button.classList.add("fa-solid", "fa-moon");
for (let i = 0; i < main_elements.length; i++) {
    main_elements[i].style.borderColor = Lighticon || 'rgb(52, 243, 154)';
    main_elements[i].style.color = Darkicon || 'white';
}
for (let i = 0; i < main_elements2.length; i++) {
    main_elements2[i].style.borderColor = Lighticon || 'rgb(52, 243, 154)';
    main_elements2[i].style.color = Darkicon || 'white';
}
main.style.top = '0%';
home.style.top = '6.5%';
Close_contents.style.color = Darkicon || 'white';
if (emailtxt != 'null') {
    setTimeout(() => {
        while (main_user.firstChild) {
            main_user.removeChild(main_user.firstChild);
        }
        const img = document.createElement("img");
        img.style.outline = 'none';
        img.style.position = 'absolute';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.borderRadius = '50%'
        img.src = `./profil/${emailtxt}.png`;
        main_user.appendChild(img);
    }, 1000);
}
let isAutoScrollEnabled = true;
const messagesContainer = document.getElementById("x");
messagesContainer.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
        isAutoScrollEnabled = false;
    } else {
        isAutoScrollEnabled = true;
    }
});

if (isAutoScrollEnabled) {
    setInterval(function () {
        if (isAutoScrollEnabled) {
            var messagesDiv = document.querySelector(".Messages");
            var messageDiv = document.createElement("div");
            messageDiv.id = "xxx";
            messagesDiv.appendChild(messageDiv);
            const MAX_MESSAGE_DIVS = 10;
            const messageDivs = document.querySelectorAll("#xxx");
            if (messageDivs.length > MAX_MESSAGE_DIVS) {
                const divToDelete = messageDivs[messageDivs.length - 1];
                divToDelete.parentNode.removeChild(divToDelete);
            }
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }, 1000);

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}
function userInfo() {
    if (emailtxt != 'null') {
        const Info = document.createElement("div");
        Info.className = "Info_Div";
        Info.style.backgroundColor = 'red';
        const body = document.body;
        const content2 = document.getElementById("ucontent");
        while (content2.firstChild) {
            content2.removeChild(content2.firstChild);
        }
        body.appendChild(Info);
        typeMessage(Info, 'Don\'t share your API key!', 'yellow');
        setTimeout(() => {
            body.removeChild(Info);
        }, 3000);
        const user = document.getElementById("content");
        const content = content2;
        user.style.visibility = "visible";
        const ImgSelector = document.createElement("img");
        ImgSelector.className = 'Profil_Photo';
        ImgSelector.id = 'userprofile';
        ImgSelector.src = `./profil/${emailtxt}.png`;
        const imagefiles = document.createElement("input");
        imagefiles.type = "file";
        imagefiles.style.visibility = "hidden";
        imagefiles.accept = "image/*";
        const span = document.createElement("span");
        span.className = "Span2";
        span.textContent = `Email:${emailtxt}\nName:${nametxt}\nAPI Key:${id} `;
        content2.appendChild(ImgSelector);
        content2.appendChild(span);
        content2.innerHTML = content2.innerHTML + '<button id=\"deleteAcount\" title=\"Delete Acount\" class=\"Login\" style=\"cursor: pointer; \"><i class=\"fa-solid fa-user-slash\" aria-hidden=\"true\"></i></button> <button id=\"closeup\" title=\"Log out of account\" class=\"Problem\" style=\"cursor: pointer; \"><i class=\"fa-solid fa-user-xmark\"></i></button>';
        document.getElementById("deleteAcount").style.bottom = '-50%';
        document.getElementById("closeup").style.bottom = '-50%';
        const div = document.createElement("div"); div.className = "gearsDiv";
        const h1 = document.createElement('h1'); const h2 = document.createElement('h2'); const h3 = document.createElement('h3'); const h4 = document.createElement('h4'); const h5 = document.createElement('h5');; const h2_2 = document.createElement('h2'); const h3_2 = document.createElement('h3');
        const gearButton = document.createElement('button'); const gearButton2 = document.createElement('button'); const gearButton3 = document.createElement('button'); const gearButton4 = document.createElement('button'); const gearButton5 = document.createElement('button'); const gearButton_2 = document.createElement('button'); const gearButton2_2 = document.createElement('button'); const gearButton3_2 = document.createElement('button'); const gearButton4_2 = document.createElement('button');
        const iElement = document.createElement('i'); const iElement2 = document.createElement('i'); const iElement3 = document.createElement('i'); const iElement4 = document.createElement('i'); const iElement5 = document.createElement('i'); const iElement_2 = document.createElement('i'); const iElement2_2 = document.createElement('i'); const iElement3_2 = document.createElement('i'); const iElement4_2 = document.createElement('i');
        const colorSelector = document.createElement('input'); const colorSelector2 = document.createElement('input'); const colorSelector3 = document.createElement('input'); const colorSelector_2 = document.createElement('input'); const colorSelector2_2 = document.createElement('input');
        colorSelector.type = "color"; colorSelector.style.visibility = "hidden"; colorSelector.style.outline = "none"; colorSelector_2.type = "color"; colorSelector_2.style.visibility = "hidden"; colorSelector_2.style.outline = "none";
        colorSelector2.type = "color"; colorSelector2.style.visibility = "hidden"; colorSelector2.style.outline = "none"; colorSelector2_2.type = "color"; colorSelector2_2.style.visibility = "hidden"; colorSelector2_2.style.outline = "none";
        colorSelector3.type = "color"; colorSelector3.style.visibility = "hidden"; colorSelector3.style.outline = "none";
        iElement.className = "fa-solid fa-palette"; iElement2.className = "fa-solid fa-palette"; iElement3.className = "fa-solid fa-rotate"; iElement4.className = "fa-solid fa-check"; iElement5.className = "fa-solid fa-palette"; iElement_2.className = "fa-solid fa-palette"; iElement2_2.className = "fa-solid fa-palette"; iElement3_2.className = "fa-solid fa-rotate"; iElement4_2.className = "fa-solid fa-check";
        gearButton.className = "gearsButton"; gearButton.style.left = "15%"; gearButton.style.color = colorSelector.value; gearButton_2.className = "gearsButton"; gearButton_2.style.left = "15%"; gearButton_2.style.color = colorSelector.value;
        gearButton2.className = "gearsButton"; gearButton2.style.left = "55%"; gearButton2.style.color = colorSelector.value; gearButton2_2.className = "gearsButton"; gearButton2_2.style.left = "55%"; gearButton2_2.style.color = colorSelector.value;
        gearButton3.className = "gearsButton"; gearButton3.style.right = "10%"; gearButton3.style.width = "2em"; gearButton3.style.height = "2em"; gearButton3.title = "reset"; gearButton3_2.className = "gearsButton"; gearButton3_2.style.right = "10%"; gearButton3_2.style.width = "2em"; gearButton3_2.style.height = "2em"; gearButton3_2.title = "reset";
        gearButton4.className = "gearsButton"; gearButton4.style.right = "0%"; gearButton4.style.width = "2em"; gearButton4.style.height = "2em"; gearButton4.title = "First set background color after reload page"; gearButton4_2.className = "gearsButton"; gearButton4_2.style.right = "0%"; gearButton4_2.style.width = "2em"; gearButton4_2.style.height = "2em"; gearButton4_2.title = "First set icon color after reload page";
        gearButton5.className = "gearsButton"; gearButton5.style.bottom = "3%"; gearButton5.style.left = "33%";
        h5.className = "gearsH"; h5.style.bottom = "0%"; h5.textContent = "Select the font style:"; h5.style.left = "0%";
        h4.className = "gearsH"; h4.style.left = "3%"; h4.style.top = "35%"; h4.textContent = "Icon color:";
        h3.className = "gearsH"; h3.textContent = "Dark"; h3.style.left = "40%";
        h2_2.className = "gearsH"; h2_2.textContent = "Bright";
        h3_2.className = "gearsH"; h3_2.textContent = "Dark"; h3_2.style.left = "40%";
        h2.className = "gearsH"; h2.textContent = "Bright";
        h1.className = "gearsH"; h1.style.left = "3%"; h1.style.top = "10%"; h1.textContent = "Background:";
        const gearsChildDIV = document.createElement('div'); gearsChildDIV.className = "gearsChildDIV"; gearsChildDIV.style.left = "22%"; gearsChildDIV.style.top = "5.5%";
        const gearsChildDIV2 = document.createElement('div'); gearsChildDIV2.className = "gearsChildDIV"; gearsChildDIV2.style.left = "22%"; gearsChildDIV2.style.top = "35%";
        const gearsChildDIV3 = document.createElement('div'); gearsChildDIV3.className = "gearsChildDIV"; gearsChildDIV3.style.right = "0%"; gearsChildDIV3.style.width = "40%"; gearsChildDIV3.style.display = "flex"; gearsChildDIV3.style.alignItems = "center"; gearsChildDIV3.style.justifyContent = "center"; gearsChildDIV3.style.bottom = "0%"; gearsChildDIV3.innerHTML = '<div> <select class="Selectoredit" id="font-family-selector"> <option value="Arial">Arial</option> <option value="Times New Roman">Times New Roman</option> <option value="Courier New">Courier New</option> <option value="Georgia">Georgia</option> <option value="Verdana">Verdana</option> </select> <select class="Selectoredit" id="font-size-selector"> <option value="10px">10px</option> <option value="12px">12px</option> <option value="14px">14px</option> <option value="16px">16px</option> <option value="18px">18px</option> </select> <select class="Selectoredit" id="font-style-selector"> <option value="normal">Normal</option> <option value="italic">Italic</option> <option value="bold">Bold</option> <option value="bold italic">Bold italic</option> </select> <button id="apply-button" class="gearsButton" style="width: 2em;height: 2em;bottom: 0%;margin-left: -2em; left: 100%;" ><i class="fa-solid fa-check"></i></button> </div>';
        content.appendChild(div); div.appendChild(h1); div.appendChild(gearsChildDIV); gearsChildDIV.appendChild(h2); gearsChildDIV.appendChild(gearButton); gearButton.appendChild(iElement); gearsChildDIV.appendChild(h3); gearsChildDIV.appendChild(gearButton2); gearButton2.appendChild(iElement2); gearsChildDIV.appendChild(gearButton3); gearButton3.appendChild(iElement3); gearsChildDIV.appendChild(gearButton4); gearButton4.appendChild(iElement4);
        div.appendChild(h4); div.appendChild(gearsChildDIV2); gearsChildDIV2.appendChild(h2_2); gearsChildDIV2.appendChild(gearButton_2); gearButton_2.appendChild(iElement_2); gearsChildDIV2.appendChild(h3_2); gearsChildDIV2.appendChild(gearButton2_2); gearButton2_2.appendChild(iElement2_2); gearsChildDIV2.appendChild(gearButton3_2); gearButton3_2.appendChild(iElement3_2); gearsChildDIV2.appendChild(gearButton4_2); gearButton4_2.appendChild(iElement4_2);
        div.appendChild(h5); div.appendChild(gearsChildDIV3); div.appendChild(gearButton5); gearButton5.appendChild(iElement5);
        gearButton.addEventListener('click', function () { infoT(); colorSelector.click(); }); colorSelector.addEventListener('change', () => { gearButton.style.color = colorSelector.value; localStorage.setItem("Background", colorSelector.value) }); gearButton2.addEventListener('click', function () { infoT(); colorSelector2.click(); }); colorSelector2.addEventListener('change', () => { gearButton2.style.color = colorSelector2.value; localStorage.setItem("BackgrounD", colorSelector2.value) });
        gearButton3.addEventListener('click', function () { infoT(); localStorage.removeItem("Background"); localStorage.removeItem("BackgrounD"); iElement3.className = "fa-solid fa-rotate fa-spin"; setTimeout(() => { iElement3.className = "fa-solid fa-rotate"; }, 3000); gearButton.style.color = "black"; gearButton2.style.color = "black" });
        gearButton4.addEventListener('click', function () { infoT(); const sure = confirm("You are sure?"); if (sure) { location.reload(); } });
        gearButton_2.addEventListener('click', function () { infoT(); colorSelector_2.click(); }); colorSelector_2.addEventListener('change', () => { gearButton_2.style.color = colorSelector_2.value; localStorage.setItem("Lighticon", colorSelector_2.value) }); gearButton2_2.addEventListener('click', function () { infoT(); colorSelector2_2.click(); }); colorSelector2_2.addEventListener('change', () => { gearButton2_2.style.color = colorSelector2_2.value; localStorage.setItem("Darkicon", colorSelector2_2.value) });
        gearButton3_2.addEventListener('click', function () { infoT(); localStorage.removeItem("Lighticon"); localStorage.removeItem("Darkicon"); iElement3_2.className = "fa-solid fa-rotate fa-spin"; setTimeout(() => { iElement3_2.className = "fa-solid fa-rotate"; }, 3000); gearButton_2.style.color = "black"; gearButton2_2.style.color = "black" });
        gearButton4_2.addEventListener('click', function () { infoT(); const sure = confirm("You are sure?"); if (sure) { location.reload(); } });
        gearButton5.addEventListener('click', function () { infoT(); colorSelector3.click(); }); colorSelector3.addEventListener('change', () => { gearButton5.style.color = colorSelector3.value; localStorage.setItem("Fontcolor", colorSelector3.value) });
        document.getElementById("apply-button").addEventListener("click", function () {
            const fontFamily = document.getElementById("font-family-selector").value;
            const fontSize = document.getElementById("font-size-selector").value;
            const fontStyle = document.getElementById("font-style-selector").value;
            localStorage.setItem("fontFamily", fontFamily);
            localStorage.setItem("fontSize", fontSize);
            localStorage.setItem("fontStyle", fontStyle);
            infoT();
        });
        document.getElementById("userprofile").addEventListener("click", function () {
            imagefiles.click();
        });
        imagefiles.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const file = e.target.result.split(",")[1];
                    const changeImage = `Email:${emailtxt}?Profile:${file}`;
                    ws.send(changeImage);
                    infoT();
                };
                reader.readAsDataURL(file);
            }
        });
        const deleteAcount = document.getElementById("deleteAcount");
        deleteAcount.addEventListener("click", function () {
            const sure = confirm("You are sure?");
            if (sure) {
                ws.send(`DELETE:${emailtxt},${id}`);
                setTimeout(() => {
                    location.reload();
                }, 5000);
            }
        });
        const closeup = document.getElementById("closeup");
        closeup.addEventListener("click", function () {
            const sure = confirm("You are sure?");
            if (sure) {
                ws.send(`!ID:null!Email:delete!`);
                sessionStorage.clear();
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        });
        function infoT() {
            Info.style.backgroundColor = 'green';
            body.appendChild(Info);
            while (Info.firstChild) {
                Info.removeChild(Info.firstChild);
            }
            typeMessage(Info, 'The changes you make will appear when the page is refreshed.', 'white');
            setTimeout(() => {
                body.removeChild(Info);
            }, 3000);
        }
    }
    else {
        userButton();
    }
}
function userButton(open) {
    const content2 = document.getElementById("ucontent");
    while (content2.firstChild) {
        content2.removeChild(content2.firstChild);
    }
    const user = document.getElementById("content");
    user.style.visibility = "visible";
    const dialog = document.getElementById("dialog");
    const content = document.getElementById("ucontent");
    content.className = "UserContent";
    const img = document.createElement("img");
    img.src = "./profil/logo.png";
    img.className = "Image";
    const h1 = document.createElement("h1");
    h1.className = "Write";
    h1.textContent = "Sign Up";
    const span = document.createElement("span");
    span.className = "Span";
    span.textContent = "Name";
    const nameI = document.createElement("input");
    nameI.className = "Name";
    nameI.maxLength = "12";
    const span2 = document.createElement("span");
    span2.className = "Span";
    span2.textContent = "Email";
    const emailI = document.createElement("input");
    emailI.className = "Email-Password";
    emailI.type = "email";
    emailI.maxLength = "30";
    emailI.oninput = function () {
        EmailStrength(this.value);
    };
    const span3 = document.createElement("span");
    span3.className = "Span";
    span3.textContent = "Password";
    const passwordI = document.createElement("input");
    passwordI.className = "Email-Password";
    passwordI.type = "password";
    passwordI.maxLength = "25";
    passwordI.oninput = function () {
        showPasswordStrength(this.value);
    };
    const button = document.createElement("button");
    button.className = "Button";
    const i = document.createElement("i");
    i.className = "fa-solid fa-arrow-right";
    button.appendChild(i);
    const button2 = document.createElement("button");
    button2.className = "Button";
    const i2 = document.createElement("i");
    i2.className = "fa-solid fa-arrow-right";
    button2.appendChild(i2);
    const login = document.createElement("button");
    login.className = "Login";
    login.textContent = "Login";
    if (open == 'login') {
        login.click();
    }
    const problem = document.createElement("button");
    problem.className = "Problem";
    problem.textContent = "Have a problem?";
    content.appendChild(img); content.appendChild(h1); content.appendChild(span); content.appendChild(nameI); content.appendChild(span2); content.appendChild(emailI); content.appendChild(span3); content.appendChild(passwordI); content.appendChild(button); content.appendChild(login); content.appendChild(problem); dialog.appendChild(content);
    function showPasswordStrength(password) {
        let strength = 0;
        strength = 0;
        if (password.length >= 8) {
            strength += 1;
        }
        if (/[a-z]/.test(password)) {
            strength += 1;
        }
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }
        if (/\d/.test(password)) {
            strength += 1;
        }

        if (strength <= 1) {
            passwordI.style.backgroundColor = "red";
        } else if (strength === 2) {
            passwordI.style.backgroundColor = "orange";
        } else {
            passwordI.style.backgroundColor = "green";
        }
    }
    function EmailStrength(email) {
        let strength2 = 0;
        strength2 = 0;
        if (email.length >= 8) {
            strength2 += 1;
        }
        if (/@/.test(email)) {
            strength2 += 1;
        }
        if (/.com/.test(email)) {
            strength2 += 1;
        }
        if (strength2 === 1) {
            emailI.style.backgroundColor = "red";
        } else if (strength2 === 2) {
            emailI.style.backgroundColor = "orange";
        } else if (strength2 === 3) {
            emailI.style.backgroundColor = "green";
        }
    }
    problem.addEventListener("click", function () {
        h1.textContent = '';
        const content2 = document.getElementById("ucontent");
        while (content2.firstChild) {
            content2.removeChild(content2.firstChild);
        }
        span.textContent = 'Please write the email address you want to recover.';
        span.style.marginLeft = "10px";
        span.style.marginRight = "0%";
        emailI.style.marginTop = '30%';
        content2.appendChild(span);
        content2.appendChild(emailI);
        content2.appendChild(button2);
        button2.addEventListener("click", function () {
            let H_email = emailI.value
            ws.send(`(help-${emailI.value}-help)`)
            while (content2.firstChild) {
                content2.removeChild(content2.firstChild);
            }
            span.textContent = 'Verify the code sent to your email';
            emailI.style.marginTop = '%20';
            passwordI.style.marginTop = '%20';
            emailI.placeholder = 'Code';
            passwordI.placeholder = 'New Password';
            emailI.value = '';
            passwordI.value = '';
            content2.appendChild(span);
            content2.appendChild(emailI);
            content2.appendChild(passwordI);
            content2.appendChild(button);
            let close = 0;
            button.addEventListener("click", function () {
                if (3 > close) {
                    ws.send(`(Email:${H_email}Password:${passwordI.value}Code:${emailI.value})`);
                }
                else {
                    ws.send(`!Lock{${H_email}}`);
                }
                close++
            });
        });
    });
    button.addEventListener("click", function () {
        if (passwordI.style.backgroundColor == "green") {
            if (emailI.style.backgroundColor == "green") {
                if (h1.textContent == "Sign Up") {
                    if (
                        nameI.value == "" ||
                        emailI.value == "" ||
                        passwordI.value == ""
                    ) {
                        alert("Please fill in the inputs");
                    } else {
                        const content2 = document.getElementById("ucontent");
                        while (content2.firstChild) {
                            content2.removeChild(content2.firstChild);
                        }
                        const name = nameI.value;
                        const email = emailI.value;
                        const password = passwordI.value;
                        let names = "";
                        let emails = "";
                        let passwords = "";
                        names = name;
                        emails = email;
                        passwords = password;
                        signup = `S(Name:${names}+Email:${emails}+Password:${passwords}+`;
                        const profile = document.createElement("div");
                        profile.className = "Img";
                        const image = document.createElement("i");
                        const imagefiles = document.createElement("input");
                        imagefiles.type = "file";
                        imagefiles.style.visibility = "hidden";
                        imagefiles.accept = "image/*";
                        image.className = "fa-solid fa-image";
                        span.style.marginLeft = "10px";
                        span.style.marginRight = "10px";
                        span.textContent = "Please select the profile picture";
                        profile.appendChild(image);
                        content.appendChild(span);
                        content.appendChild(profile);
                        content.appendChild(imagefiles);
                        profile.appendChild(image);
                        image.addEventListener("click", function () {
                            imagefiles.click();
                        });
                        imagefiles.addEventListener("change", function (event) {
                            const content2 = document.getElementById("ucontent");
                            while (content2.firstChild) {
                                content2.removeChild(content2.firstChild);
                            }
                            const file = event.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    const file = e.target.result.split(",")[1];
                                    console.log(file);
                                    signup = `${signup}Profile:${file})U`;
                                    ws.send(signup);
                                };
                                reader.readAsDataURL(file);
                            }
                            passwordI.maxLength = "24";
                            passwordI.style.marginTop = "20%";
                            passwordI.value = '';
                            span.textContent = "Verify the code sent to your email";
                            span.style.marginLeft = "10px";
                            span.style.marginRight = "0%";
                            content.appendChild(span);
                            content.appendChild(passwordI);
                            content.appendChild(button);
                            let close = 0;
                            passwordI.style.backgroundColor = 'green';
                            passwordI.oninput = function () { }
                            button.addEventListener("click", function () {
                                if (3 > close) {
                                    const code = passwordI.value;
                                    ws.send(`%4?4%Code:${code}%4?4%Email:${email}%4?4%`);
                                    close++;
                                }
                                else {
                                    ws.send(`!Lock{${email}}`);
                                }
                            });
                        });
                    }
                }
                if (h1.textContent == "Login") {
                    let close = 0;
                    button.addEventListener("click", function () {
                        if (emailI.value == "" || passwordI.value == "") {
                            alert("Please fill in the inputs");
                        }
                        else {
                            let email = emailI.value;
                            let password = passwordI.value;
                            if (3 > close) {
                                ws.send(`/Email:${email}?Password:${password}Finit%`);
                            }
                            else {
                                ws.send(`!Lock{${email}}`);
                            }
                        }
                        close++
                    });

                }
            } else {
                if (passwordI.style.backgroundColor != 'green') {
                    let text = "Please set the email and password input green!";
                    let color = "yellow";
                    const Info = document.createElement("div");
                    Info.className = "Info_Div";
                    Info.style.backgroundColor = `${color}`;
                    const body = document.body;
                    body.appendChild(Info);
                    typeMessage(Info, `${text}`, "red");
                    setTimeout(() => {
                        body.removeChild(Info);
                    }, 3000);
                }
            }
        } else {
            let text = "Please set the email and password input green!";
            let color = "yellow";
            const Info = document.createElement("div");
            Info.className = "Info_Div";
            Info.style.backgroundColor = `${color}`;
            const body = document.body;
            body.appendChild(Info);
            typeMessage(Info, `${text}`, "red");
            setTimeout(() => {
                body.removeChild(Info);
            }, 3000);
        }
    });
    login.addEventListener("click", function () {
        h1.textContent = "Login";
        content.removeChild(span);
        content.removeChild(nameI);
        content.removeChild(login);
        const signup = document.createElement("button");
        signup.className = "Login";
        signup.textContent = "Sign Up";
        content.appendChild(signup);
        signup.addEventListener("click", function () {
            const content2 = document.getElementById("ucontent");
            while (content2.firstChild) {
                content2.removeChild(content2.firstChild);
            }
            h1.textContent = "Sign Up";
            content.appendChild(img);
            content.appendChild(h1);
            content.appendChild(span);
            content.appendChild(nameI);
            content.appendChild(span2);
            content.appendChild(emailI);
            content.appendChild(span3);
            content.appendChild(passwordI);
            content.appendChild(button);
            content.appendChild(login);
            content.appendChild(problem);
            dialog.appendChild(content);
        });
    });
}
function typeMessage(container, message, color) {
    const messageSpan = document.createElement("span");
    messageSpan.style.color = `${color}`;
    messageSpan.style.textAlign = "center";
    messageSpan.style.width = "100%";
    messageSpan.style.display = "block";
    messageSpan.style.borderRadius = "10px";
    messageSpan.style.fontSize = "italic";
    container.appendChild(messageSpan);
    let times = 30;
    function changeTimes(newTimes) {
        times = newTimes;
    }
    setTimeout(changeTimes, 3000, 20);
    setTimeout(changeTimes, 6000, 10);
    setTimeout(changeTimes, 10000, 5);
    let index = 0;
    function typeNextCharacter() {
        if (index < message.length) {
            messageSpan.textContent += message.charAt(index);
            index++;
            setTimeout(typeNextCharacter, times);
        }
    }
    typeNextCharacter();
}
function toggleBackgroundColor() {
    if (isDarkTheme) {
        body.style.backgroundColor = BackgrounDtxt || 'black';
        button.classList.remove("fa-solid", "fa-sun");
        button.classList.add("fa-solid", "fa-moon");
        for (let i = 0; i < main_elements.length; i++) {
            main_elements[i].style.borderColor = Lighticon || 'rgb(52, 243, 154)';
            main_elements[i].style.color = Darkicon || 'white';
        }
        for (let i = 0; i < main_elements2.length; i++) {
            main_elements2[i].style.borderColor = Lighticon || 'rgb(52, 243, 154)';
            main_elements2[i].style.color = Darkicon || 'white';
        }
        Close_contents.style.color = Darkicon || 'white';
    } else {
        body.style.backgroundColor = Backgroundtxt || 'white';
        button.classList.remove("fa-solid", "fa-moon");
        button.classList.add("fa-solid", "fa-sun");
        for (let i = 0; i < main_elements.length; i++) {
            main_elements[i].style.borderColor = Darkicon || 'white';
            main_elements[i].style.color = Lighticon || 'rgb(52, 243, 154)';
        }
        for (let i = 0; i < main_elements2.length; i++) {
            main_elements[i].style.borderColor = Darkicon || 'white';
            main_elements2[i].style.color = Lighticon || 'rgb(52, 243, 154)';
        }
        Close_contents.style.color = Lighticon || 'rgb(52, 243, 154)';
    }
    isDarkTheme = !isDarkTheme;
}
function close_content() {
    const content2 = document.getElementById("ucontent");
    content2.style.display = "";
    content2.style.justifyContent = "";
    while (content2.firstChild) {
        content2.removeChild(content2.firstChild);
    }
    const user = document.getElementById("content");
    user.style.visibility = "hidden";
}
document.addEventListener("wheel", function (e) {
    let marginscroll = parseFloat(main.style.top);
    let otherscrroll = parseFloat(home.style.top);
    let heightscrroll = parseFloat(home.style.height);
    if (e.deltaY < 0) {
        if (marginscroll < 0) {
            marginscroll += 1.75;
            otherscrroll += 1.75;
        }
    } else {
        if (marginscroll > - 10) {
            marginscroll -= 1.75;
            otherscrroll -= 1.75;
        }
    }
    main.style.top = `${marginscroll}%`;
    home.style.top = `${otherscrroll}%`;
});
function tooll(type) {
    if (type == 'image') {

    }
    else if (type == 'video') {

    }
    else if (type == 'pdf') {
    }
}
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', handleDrop, false);
document.getElementById("drop-area").addEventListener("click", function () {
    const imagefiles = document.createElement("input");
    imagefiles.type = "file";
    imagefiles.style.visibility = "hidden";
    imagefiles.click();
    imagefiles.addEventListener("change", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let files = e.target.files;
        if (files.length > 0) {
            let filesext = files[0].name;
            handleFiles(files, filesext);
        }
    });
});
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;
    let filesext = e.dataTransfer.files[0].name;
    handleFiles(files, filesext);
}

function handleFiles(files, filesext) {
    const file = files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const file = e.target.result.split(",")[1];
            ws.send(JSON.stringify({ emailtxt, file, filesext }));
        };
        reader.readAsDataURL(file);
    }
    while (hometool.firstChild) {
        hometool.removeChild(hometool.firstChild);
    }
    document.getElementById("activity").style.visibility = 'visible';
    const container = document.createElement("div");
    container.className = "home_file";
    container.style.height = '70%';
    filesext.replace(/.([^.]+)$/g, (match, one) => {
        setTimeout(() => {
            if (one.includes('png')) {
                const png = document.createElement("img");
                png.src = `./file/${emailtxt}/${filesext}`;
                png.className = 'iframetool';
                hometool.appendChild(container).appendChild(png);
            }
            else {
                const iframe = document.createElement("iframe");
                iframe.src = `./file/${emailtxt}/${filesext}`;
                iframe.className = 'iframetool';
                hometool.appendChild(container).appendChild(iframe);
            }
            AI.className = "AI_AREA2";
            const GoButtonA = document.getElementById("go");
            GoButtonA.addEventListener("click", function () {
                const iElement = document.getElementById("gobutton");
                iElement.className = "fa-solid fa-arrow-up fa-bounce";
                setTimeout(() => {
                    iElement.className = "fa-solid fa-arrow-up";
                }, 3000);
            });
            fileButton.addEventListener("change", function (e) {
                e.preventDefault();
                e.stopPropagation();
                const file = e.target.files[0];
                let files = e.target.files;
                let filesext = files[0].name;
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const file = e.target.result.split(",")[1];
                        const message = { emailtxt, file, filesext };
                        ws.send(JSON.stringify(message));
                    };
                    reader.readAsDataURL(file);
                }
                if (files) {
                    setTimeout(() => {
                        const fileType = file.type;
                        const fileContent = `./file/${emailtxt}/${filesext}`;
                        const messageContainer = document.createElement("div");
                        messageContainer.style.textAlign = "center";
                        messageContainer.style.width = "50%";
                        messageContainer.style.height = "30%";
                        messageContainer.style.alignItems = "center";
                        messageContainer.className = "file-container";
                        messageContainer.style.backgroundColor = BackgrounDtxt;
                        messageContainer.style.marginTop = "10px";
                        messageContainer.style.fontSize = "italic";
                        messageContainer.style.overflow = "hidden";
                        if (fileType.includes("image")) {
                            const image = document.createElement("img");
                            image.src = fileContent;
                            image.style.width = "100%";
                            image.style.height = "100%";
                            image.style.overflowY = "scroll";
                            messageContainer.appendChild(image);
                        } else if (fileType.includes("pdf")) {
                            const pdfContainer = document.createElement("iframe");
                            pdfContainer.width = '100%';
                            pdfContainer.src = fileContent;
                            pdfContainer.height = '100%';
                            messageContainer.appendChild(pdfContainer);
                        } else if (fileType.includes("video")) {
                            const video = document.createElement("video");
                            video.src = URL.createObjectURL(file);
                            video.controls = true;
                            video.width = "100%";
                            video.height = "300px";
                            messageContainer.appendChild(video);
                        } else if (fileType.includes("text")) {
                            const textNode = document.createTextNode(fileContent);
                            messageContainer.appendChild(textNode);
                        } else {
                            const fileContentText = document.createTextNode(
                                `File name: ${fileType}`
                            );
                            messageContainer.appendChild(fileContentText);
                        }

                        messagesDiv.appendChild(messageContainer);
                    }, 3000);
                }
            });
            sendButton.addEventListener("click", () => {
                let message = ""; message = messageInput.value; let none = ""; none = message.trim();
                if (none == "") { }
                else {
                    ws.send(JSON.stringify(`(Email:${emailtxt}?Ext:${filesext}?Message:${message})`));
                    const messageContainer = document.createElement("div");
                    messageContainer.style.textAlign = "center";
                    messageContainer.style.width = "50%";
                    messageContainer.style.minHeight = "5%";
                    messageContainer.style.alignItems = "center";
                    messageContainer.className = "message-container";
                    messageContainer.style.backgroundColor = BackgrounDtxt;
                    messageContainer.style.marginTop = "10px";
                    messageContainer.style.fontSize = "italic";
                    typeMessage(messageContainer, `You: ${message}`, "white");
                    messagesDiv.appendChild(messageContainer);
                    messageInput.value = "";
                }
            });

        }, 5000);
    });
}
ws.onerror = function () {
    ws.close();
};
let runCode = false;
function fille() {
    var button = document.getElementById("fileInput");
    button.click();
}
const circle = document.getElementById("circle");
document.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    circle.style.left = `${mouseX}px`;
    circle.style.top = `${mouseY}px`;
});
function help(e) {
    e.preventDefault();
    const mouseX = e.clientX;
    const mouseY = e.clientY - 20;
    const help = document.getElementById("here");
    help.style.visibility = "visible";
    help.style.left = `${mouseX}px`;
    help.style.top = `${mouseY}px`;
    setTimeout(() => {
        help.style.visibility = "hidden";
    }, 5000);
}
const microphone_icon = document.getElementById("microphone_icon");
var recognizing;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
reset();
recognition.onend = reset();
recognition.onresult = function (event) {
    const messageInput = document.getElementById("t")
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            messageInput.value += event.results[i][0].transcript;
        }
    }
}
function reset() {
    recognizing = false;
}

function toggleStartStop() {
    if (recognizing) {
        recognition.stop();
        reset();
    } else {
        recognition.start();
        recognizing = true;
    }
}
microphone_icon.addEventListener("click", function () {
    if (microphone_icon.className == 'fa-solid fa-microphone-slash') {
        microphone_icon.className = "fa-solid fa-microphone";
    }
    else {
        microphone_icon.className = "fa-solid fa-microphone-slash";
    }
});
function deleteElements() {
    const x = document.getElementById("x");
    const sure = confirm("You are sure?");
    if (sure) {
        while (x.firstChild) {
            x.removeChild(x.firstChild);
        }
        const Parentold = document.getElementById("x");
        Parentold.innerHTML =
            '<div id="xxx"></div><div id="xxx"></div><div id="xxx"></div><div id="xxx"></div><div id="xxx"></div><div id="xxx"></div><div id="xxx"></div><div id="xxx"></div><div id="xxx"></div><div id="xxx"></div>';
    }
}
function Read_Area() {
    const spanElements = document.querySelectorAll("span");
    spanElements.forEach((spanElement) => {
        spanElement.addEventListener("mouseover", function (event) {
            const write = spanElement.innerText;
            Read(write);
        });
    });
    function Read(write) {
        const synthesis = window.speechSynthesis;
        const app = new SpeechSynthesisUtterance(write);
        app.rate = 1;
        synthesis.speak(app);
    }
}
function copy() {
    const messageA = document.getElementById("messageLine");
    messageA.addEventListener("mouseover", function Copy(event) {
        if (event.target.tagName === "SPAN") {
            const selectedText = event.target.textContent;
            const textarea = document.createElement("textarea");
            textarea.value = selectedText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            messageA.removeEventListener("mouseover", function () { });
        }
    });
}
function handleStorageChange(event) {
    console.log('Storage event occurred');
    console.log(event.key);
    if (SysSecurity()) {
        switch (event.key) {
            case "key":
                setTimeout(() => {
                    location.reload();
                }, 2000);
                break;
            case "Name":
                localStorage.setItem("Name", nametxt);
                break;
            case "Email":
                localStorage.setItem("Email", emailtxt);
                break;
            default:
                break;
        }
    }
    sessionStorage.clear();
    alert("Do'nt that!");
}
window.addEventListener("storage", handleStorageChange);
function SysSecurity(valSec) {
    if (valSec) {
        return true;
    }
    else {
        return false;
    }
}
window.addEventListener("beforeunload", function (event) {
    if (sets) {
        sessionStorage.setItem = originalSetItem;
        sessionStorage.getItem = orginalGetItem;
        if (key == sessionStorage.getItem("key") && !key == '') {
            localStorage.setItem("Name", nametxt);
            localStorage.setItem("Email", emailtxt);
        }
        else {
            localStorage.setItem("Name", nametxt);
            localStorage.setItem("Email", emailtxt);
        }
    }
    else {
        if (key == sessionStorage.getItem("key")) {
            if (key != '') { }
            else {
                localStorage.setItem("Name", nametxt);
                localStorage.setItem("Email", emailtxt);
            }
        }
        else {
            localStorage.setItem("Name", nametxt);
            localStorage.setItem("Email", emailtxt);
        }
    }
});
window.addEventListener("offline", function () {
    const net = "No internet conection!";
    const Info = document.createElement("div");
    Info.className = "Info_Div";
    Info.style.backgroundColor = 'red';
    const body = document.body;
    const content2 = document.getElementById("ucontent");
    while (content2.firstChild) {
        content2.removeChild(content2.firstChild);
    }
    body.appendChild(Info);
    typeMessage(Info, net, 'yellow');
    setTimeout(() => {
        body.removeChild(Info);
    }, 3000);
});
