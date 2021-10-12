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
        console.log(themes, "AAA");
        console.log(t["palette"], "SADEG");
        let { colorOne, colorTwo } = t["palette"];
        colorOne.toLowerCase();
        colorTwo.toLowerCase();
        console.log(c1, colorOne, c2, colorTwo, "CAT JAM");
        //console.log(colorOne, colorTwo, "RIPERONI");
        // c1 and c2 will always be lowercase
        if (colorOne == c1 & colorTwo == c2) {
            theme = t;
        }
    }
    console.log(theme, " HERE");
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

function createSpan(content) {
    const span = document.createElement("span");
    span.setAttribute("class", "wcag-compliance");
    span.textContent = content ? "pass" : "fail";
    span.classList.add(content ? "pass" : "fail")
    return span;
}

const elements = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "aside",
    "div",
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

        const span = document.createElement("span");
        span.setAttribute("class", "wcag-compliance");

        c1.textContent = colorOne;
        c2.textContent = colorTwo;
        c1.style.backgroundColor = colorOne;
        c2.style.backgroundColor = colorTwo;
        c1.style.color = colorTwo;
        c2.style.color= colorOne;
        contrastRatio.textContent = `Contrast Ratio: ${ratio}:1`;
        wcagAANormal.textContent = "WCAG AA Normal Text:";
        wcagAALarge.textContent = "WCAG AA Large Text:";
        wcagAAANormal.textContent = "WCAG AAA Normal Text:";
        wcagAAALarge.textContent = "WCAG AAA Large Text:";
        wcagGoAndUI.textContent = "WCAG Graphical Objects and UI:"
        wcagAANormal.appendChild(createSpan(wcagAANormalText));
        wcagAALarge.appendChild(createSpan(wcagAALargeText));
        wcagAAANormal.appendChild(createSpan(wcagAAANormalText));
        wcagAAALarge.appendChild(createSpan(wcagAAALargeText));
        wcagGoAndUI.appendChild(createSpan(wcagGraphicalObjAndUI));
    });
}));

function setPageTheme(args) {
    const [elements, foreground, background, flip] = args;
    
    document.body.style.backgroundColor = flip ? background : foreground;
    
    elements.forEach(el => {
        let nodes = document.querySelectorAll(el);
        
        nodes.forEach(node => {
            node.style.color = flip ? background + "!important" : background;

            if (node.localName == "svg") {
                node.style.fill = flip ? foreground + "!important" : background;
            }

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
