# Random A11y Chrome Extension
Change the appearance of a webpage in Chrome by toggling a [randoma11y](https://randoma11y.com) theme. Click on the extension icon to open the popup UI and view the available themes. 

After selecting a theme, it will be applied "as best as it can" to the webpage and the color palette, contrast ratio and WCAG AA/AAA information will display in the popup user interface.

## Usage

1. Open the extensions popup UI in a Chrome tab

![Open the popup UI from the "pinned" area](https://user-images.githubusercontent.com/48612525/137032055-8d927262-79e9-44ad-b3a2-93043137d392.png)

2. Click on a theme from the grid to apply it

![Demo of theme applied in a Chrome tab](https://user-images.githubusercontent.com/48612525/137032240-99ee116e-a5b0-482b-812f-1949ae3961a6.png)

Each theme selected from the popup UI corresponds to an object in the `themes` array stored using the `chrome.storage` API and has the following structure:

```js
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
}
```

## Description

This extension performs a "blanket" theme transformation which looks good generally to preview a specific theme. But I cannot guarantee every webpage will allow for the theme to be provided in a accessible fashion. 

Note: Use this extension as a "preview" or "demo" for a specific theme and then go checkout the color palette separately in your own development for the best user experience.

## Running locally

1. Fork this repo
2. Clone using `git clone git@github.com:tannerdolby/randoma11y-chrome-extension.git`
3. Install dependencies with `npm install` (This is for installing Cypress)
4. Run tests with `npm run test`

### Todo
- [ ] Handle hover states

## Kudos
All color pairings and palettes are the property of [randoma11y.com](https://randoma11y.com) and the [Components AI](https://components.ai/) team. 