/* 
Random A11y Theme Extension - All themes are for public use and are 
the property of randoma11y.com from the Components AI team
*/

const themes = [
    {
        palette: {
            colorOne: "#257c97",
            colorTwo: "#ffffA1",
            contrast: {
                ratio: 4.55,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#99e2e0",
            colorTwo: "#535751",
            contrast: {
                ratio: 5.02,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#12011b",
            colorTwo: "#008e6f",
            contrast: {
                ratio: 4.87,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#14095d",
            colorTwo: "#c0d9bb",
            contrast: {
                ratio: 11.32,
                isAAA: true,
                wcagAANormalText: true,
                wcagAAANormalText: true,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#0b2b57",
            colorTwo: "#13d786",
            contrast: {
                ratio: 7.41,
                isAAA: true,
                wcagAANormalText: true,
                wcagAAANormalText: true,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#e8fcdc",
            colorTwo: "#cd2f78",
            contrast: {
                ratio: 4.54,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#13236b",
            colorTwo: "#4bafa6",
            contrast: {
                ratio: 5.39,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#2a3648",
            colorTwo: "#c1a3bb",
            contrast: {
                ratio: 5.36,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#32224f",
            colorTwo: "#d7eba6",
            contrast: {
                ratio: 11.05,
                isAAA: true,
                wcagAANormalText: true,
                wcagAAANormalText: true,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#d7872c",
            colorTwo: "#2e001b",
            contrast: {
                ratio: 6.52,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#0a0c10",
            colorTwo: "#5ee95d",
            contrast: {
                ratio: 12.39,
                isAAA: true,
                wcagAANormalText: true,
                wcagAAANormalText: true,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#1d2236",
            colorTwo: "#6283f5",
            contrast: {
                ratio: 4.56,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#000321",
            colorTwo: "#bb5d44",
            contrast: {
                ratio: 4.60,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#f4fffb",
            colorTwo: "#9f5e9d",
            contrast: {
                ratio: 4.50,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    },
    {
        palette: {
            colorOne: "#05e68d",
            colorTwo: "#7b1d1c",
            contrast: {
                ratio: 6.25,
                isAAA: false,
                wcagAANormalText: true,
                wcagAAANormalText: false,
                wcagAALargeText: true,
                wcagAAALargeText: true,
                wcagGraphicalObjAndUI: true
            }
        }
    }
];

let paletteSize = themes.length;

// Listen for when extension is first installed or updated to a new version
chrome.runtime.onInstalled.addListener(async () => {
    // Store themes array of palette objects
    // using the storage API
    chrome.storage.sync.set({ themes });
    chrome.storage.sync.set({ paletteSize });
    console.log(`Themes: ${themes}`);
});
