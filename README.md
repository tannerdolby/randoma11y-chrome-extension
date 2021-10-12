# Random A11y Chrome Extension
Change the appearance of a webpage in Chrome by toggling a [randoma11y](https://randoma11y.com) theme. Click on the extension icon to open the popup UI and view the available themes. 

After selecting a theme, it will be applied "as best as it can" to the webpage and the color palette, contrast ratio and WCAG AA/AAA information will display in the popup user interface.

## Usage

1. Open the extensions popup UI in a Chrome tab

![Open the popup UI](https://user-images.githubusercontent.com/48612525/136933461-52256e84-8a2f-4d00-9b76-7d424979c152.png)

2. Click on a theme from the grid to apply it

![Applied theme on hacktoberfest profile page](https://user-images.githubusercontent.com/48612525/136933445-07ebeb92-d690-494f-9b54-e062a2b28ef3.png)

Each theme selected from the popup UI corresponds to an object in the `themes` array stored using the `chrome.storage` API and has the following structure:

```js
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
}
```

## Description

This extension performs a "blanket" theme transformation which looks good generally to preview a specific theme. But I cannot guarantee every webpage will allow for the theme to be provided in a accessible fashion. 

Note: Use this extension as a "preview" or "demo" for a specific theme and then go checkout the color palette separately in your own development for the best user experience.

### Todo
- [ ] Handle hover states
- [ ] Allow theme to persist across chrome.tabs

## Kudos
All color pairings and palettes are provided by [randoma11y.com](https://randoma11y.com) and the [Components AI](https://components.ai/) team.