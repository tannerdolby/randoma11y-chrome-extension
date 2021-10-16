// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
export const themes = [
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

export function hexToRGB(hex) {
    let r = 0,
        g = 0,
        b = 0;
    
    // if hex code is shorthand (3-digits) #f06 
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    // if hex code is normal six-digit notation #ffddff
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    // cast hex strings back to numbers
    return `rgb(${+r}, ${+g}, ${+b})`;
};
