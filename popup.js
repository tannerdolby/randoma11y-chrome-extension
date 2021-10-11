let inputs = [...document.querySelectorAll(".change-color")];

// Initialize the grid of theme previews
chrome.storage.sync.get("themes", ({ themes }) => {
    inputs.forEach((input, i) => {
        input.textContent = themes[i].palette.contrast.ratio;
        input.style.backgroundColor = themes[i].palette.colorOne;
        input.style.color = themes[i].palette.colorTwo;
    });
});

function findTheme(c1, c2, themes) {
    let theme = {};
    for (t of themes) {
        let { colorOne, colorTwo } = t["palette"];
        if (colorOne == c1 & colorTwo == c2) {
            theme = t;
            console.log(t, "YEP");
            console.log(theme, "YEPP");
        }
    }
    return theme;
}

function toHex(item) {
    let hex = item.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function format(colorArr) {
    colorArr[0] = colorArr[0].slice(4);
    colorArr[2] = colorArr[2].slice(1, -1);
    return colorArr.map(c => parseInt(c.trim(), 10));
}

const elements = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "div",
    "aside",
    "a",
    "p",
    "ul",
    "li",
    "label",
    "span",
    "svg",
    "button"
];

inputs.forEach(input => input.addEventListener("click", async () => {
    // define the active tab
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    let args = [
        elements,
        input.style.backgroundColor,
        input.style.color,
        false
    ];

    // execute the content script using the scripting API
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageTheme,
        args: [args]
    });

    const currTheme = document.querySelector(".current-theme");
    currTheme.classList.remove("visually-hidden");

    let [r1, g1, b1] = format(args[1].split(","));
    let [r2, g2, b2] = format(args[2].split(","));
    let hex1 = rgbToHex(r1, g1, b1);
    let hex2 = rgbToHex(r2, g2, b2);

    let c1 = document.querySelector(".color-one");
    let c2 = document.querySelector(".color-two");
    contrastRatio = document.querySelector(".contrast-ratio");
    wcagAANormal = document.querySelector(".wcag-aa-normal");
    wcagAALarge = document.querySelector(".wcag-aa-large");
    wcagAAANormal = document.querySelector(".wcag-aaa-normal");
    wcagAAALarge = document.querySelector(".wcag-aaa-large");
    wcagGoAndUI = document.querySelector(".wcag-go-and-ui");

    chrome.storage.sync.get("themes", ({ themes }) => {
        let theme = findTheme(hex1, hex2, themes);
        let { colorOne, colorTwo } = theme["palette"];
        let {
            ratio,
            wcagAANormalText, 
            wcagAALargeText, 
            wcagAAANormalText, 
            wcagAAALargeText, 
            wcagGraphicalObjAndUI
        } = theme["palette"]["contrast"];

        c1.textContent = colorOne;
        c2.textContent = colorTwo;
        c1.style.backgroundColor = colorOne;
        c2.style.backgroundColor = colorTwo;
        c1.style.color = colorOne;
        c2.style.color= colorTwo;
        contrastRatio.textContent = `Contrast Ratio: ${ratio}:1`;
        wcagAANormal.textContent = `WCAG AA Normal Text: <span>${wcagAANormalText}</span>`;
        wcagAALarge.textContent = `WCAG AA Large Text: <span>${wcagAALargeText}</span>`;
        wcagAAANormal.textContent = `WCAG AAA Normal Text: <span>${wcagAAANormalText}</span>`;
        wcagAAALarge.textContent = `WCAG AAA Large Text: <span>${wcagAAALargeText}</span>`;
        wcagGoAndUI.textContent = `WCAG Graphical Objects and UI components: <span>${wcagGraphicalObjAndUI}</span>`;
    });
}));

function setPageTheme(args) {
    const [elements, background, foreground, flip] = args;
    
    document.body.style.backgroundColor = flip ? background : foreground;
    
    elements.forEach(el => {
        let nodes = document.querySelectorAll(el);
        
        nodes.forEach(node => {
            node.style.color = flip ? background + "!important" : background;

            if (node.localName == "svg") {
                node.style.fill = flip ? foreground + "!important" : background;
            }

            // todo: cleanup
            // Traverse any child nodes
            if (node.childNodes.length > 0) {
                node.childNodes.forEach(n => {
                    // todo: refactor/abstract this selection logic
                    if (n.localName == "code") {
                        n.style.background =  flip ? foreground + "!important": background;
                        n.style.color = flip ? foreground + "!important" : foreground;
                        if (n.querySelector("span")) {
                            n.style.color = flip ? background + "!important": foreground;
                        }
                    }
                    if (n.localName == "pre") {
                        n.style.background =  flip ? background + "!important" : background;
                    }
                    if (n.localName == "li") {
                        if (n.querySelector("div")) {
                            n.querySelector("div").style.backgroundColor = flip ? foreground + "!important" : foreground;
                        }
                    }
                    if (n.localName == "div") {
                        n.style.backgroundColor = flip ? background + "!important" : foreground;
                    }
                });
            };
        });
    });
    let snippetSelectors = [
        "pre code",
        "pre code span"
    ]
    snippetSelectors.forEach(s => {
        let nodes = document.querySelectorAll(s);
        nodes.forEach(node => {
            node.style.color = flip ? background + "!important": foreground;
        });
    });
}
