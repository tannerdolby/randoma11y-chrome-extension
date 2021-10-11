let inputs = [...document.querySelectorAll(".change-color")];

// Initialize the grid of theme previews
chrome.storage.sync.get("themes", ({ themes }) => {
    inputs.forEach((input, i) => {
        input.textContent = themes[i].palette.contrast.ratio;
        input.style.backgroundColor = themes[i].palette.colorOne;
        input.style.color = themes[i].palette.colorTwo;
    });
});

// reference: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
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
        input.style.color,
        input.style.backgroundColor,
        false
    ];

    // execute the content script using the scripting API
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageTheme,
        args: [args]
    });


    const currTheme = document.querySelector(".current-theme");

    let c1, c2, ratio;
    let [r1, g1, b1] = format(args[1].split(","));
    let [r2, g2, b2] = format(args[2].split(","));

    console.log(currTheme.childElementCount, "YOOOO");
    // todo: Refactor!
    if (currTheme.childElementCount == 0) {
        c1 = document.createElement("div");
        c2 = document.createElement("div");
        let wrapper = document.createElement("div");
        wrapper.setAttribute("class", "wrapper");
        ratio = document.createElement("p");
        ratio.setAttribute("class", "contrast-ratio");
        ratio.textContent = "Contrast Ratio: 5.15" + ":1";
        c1.setAttribute("class", "color-one");
        c2.setAttribute("class", "color-two");
        // abstract this (function for styling the selected theme)
        c1.textContent = rgbToHex(r1, g1, b1);
        c2.textContent = rgbToHex(r2, g2, b2);
        c1.style.backgroundColor = rgbToHex(r1, g1, b1);
        c2.style.backgroundColor = rgbToHex(r2, g2, b2);
        c1.style.color = rgbToHex(r2, g2, b2);
        c2.style.color= rgbToHex(r1, g1, b1);;
        wrapper.appendChild(c1);
        wrapper.appendChild(c2);
        currTheme.appendChild(wrapper);
        currTheme.appendChild(ratio);
    } else {
        c1 = document.querySelector(".color-one");
        c2 = document.querySelector(".color-two");
        c1.textContent = rgbToHex(r1, g1, b1);
        c2.textContent = rgbToHex(r2, g2, b2);
        c1.style.backgroundColor = rgbToHex(r1, g1, b1);
        c2.style.backgroundColor = rgbToHex(r2, g2, b2);
        c1.style.color = rgbToHex(r2, g2, b2);
        c2.style.color= rgbToHex(r1, g1, b1);
        ratio.textContent = "Contrast Ratio: 5.15" + ":1";
    }
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
