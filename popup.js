let inputs = [...document.querySelectorAll(".change-color")];

// Initialize the grid of theme previews
chrome.storage.sync.get("themes", ({ themes }) => {
    inputs.forEach((input, i) => {
        input.textContent = themes[i].palette.contrast.ratio;
        input.style.backgroundColor = themes[i].palette.colorOne;
        input.style.color = themes[i].palette.colorTwo;
    });
});

const elements = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
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

            // Traverse any child nodes
            if (node.childNodes.length > 0) {
                node.childNodes.forEach(n => {
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
            node.style.color = flip ? background : foreground;
        });
    });
}
