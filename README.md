## Build Custom Theme for UI5 Web Components

There are several ways to create a custom theme for an application, built with UI5 Web Components.
The recommended way is to use the UI Theme Designer, described in  the [Custom Theming with UI Theme Designer](https://github.com/SAP/ui5-webcomponents/blob/main/docs/3-customizing/02-theme.md) section.
However, the UI Theme Designer is propriatery tool, available internally at SAP.

**Thus, the project describes how to create a custom theme on your own - wothout the UI Theme Designer.**


### Theming of UI5 Web Components

The theming of UI5 Web Components is based entirely on CSS variables. Switching between themes means changing the values of these CSS Variables. Applying a custom theme means setting custom values for these CSS Variables.

### The CSS Variables

The CSS variables (used by the UI5 Web Components) are maintained in the so called [theming-base-content](https://github.com/SAP/theming-base-content) project.

The CSS Variables for Morning Horizon are: https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css. When the theme is set to "sap_horizon", exactly this set of variables is applied.

### Build Custom Theme

To build a custom theme, we have done the following:
- Installed `less` and `@sap-theming/theming-base-content` from NPM (`less` to compile less to css, and `theming-base-content` to get the source less files of the themes we will extend).

- Created a less file `mytheme.less` and used the source less file of sap_horizon (but you can extend any of the standard themes)

```less
// mytheme.less

@import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";
```

- Customized a single less variable
```less
// mytheme.less
@import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";

@sapPrimary1: violet;
```

- Run less compiler to produce a css file with the CSS Variables

`npm run build:theme`

- The CSS variables are generated into the `dist/mytheme.css`, ready to be added into your application either inside `style` tag or with a `link`.
Thanks to the special metadata, added to the generated `mytheme.css` file, the UI5 Web Components framwork will detect and apply the custom theme as soon as you set it.

### Switching to the Custom Theme

Once the CSS Variables are included one way or another, the final step is to use on of the following API to set your theme:

With URL parameter: `index.html?sap-ui-theme=mytheme`

With JS API:
```ts
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

setTheme("mytheme");
```

With Config Script (inside your HTML page)
```html
<script data-ui5-config type="application/json">
{
	"theme": "mytheme"
}
</script>
```


### Run the project

1. Install dependencies
`npm i`

2. Run build to generate the custom theme

`npm run build:theme`

Or, you can also define the name of the custom theme

`npm run build:theme pinky`

Or, you can also define the name of the custom theme + the one it extends

`npm run build:theme pinky sap_fiori_3`

**Note:** if the second param (the theme we extend) is used, make sure to match imported the source less from `@sap-theming/theming-base-content`

3. Run the server
`npm run dev`

4. Open the test page at the giver port (f.e http://localhost:5173/)
- at http://localhost:5173/ - The page opens in the default theme for the UI5 Web Components (Morning Horizon as of now)

- at http://localhost:5173/?sap-ui-theme=mytheme - The page opens with the custom theme, called `mytheme` by default

- at http://localhost:5173/?sap-ui-theme=pinky - The page opens with the custom theme, called `pinky`