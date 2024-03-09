## Build Custom Theme for UI5 Web Components

**The project describes how to create a custom theme for  UI5 Web Components.**

There are several ways to create a custom theme for an application, built with [UI5 Web Components](https://github.com/SAP/ui5-webcomponents/).
The recommended way is to use the UI Theme Designer, described in  the [Custom Theming with UI Theme Designer](https://github.com/SAP/ui5-webcomponents/blob/main/docs/3-customizing/02-theme.md) section.
However, the UI Theme Designer is propriatery tool, available internally at SAP.


### Theming of UI5 Web Components

The theming of UI5 Web Components is based entirely on CSS variables. Switching between themes means changing the values of these CSS Variables. Applying a custom theme means setting custom values for these CSS Variables.
Now, we only need to get them and overwrite their values.

### The CSS Variables

The CSS variables (used by the UI5 Web Components) are maintained in the so called [theming-base-content](https://github.com/SAP/theming-base-content) project. The great thing is that they are stable and backward compatible - new variables may be added, but old are maintained, so you can safely use them.

For example, you can explore the CSS Variables for Morning Horizon are: https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css.
These are exactly the variables being applied, when the theme is set to Morning Horizon("sap_horizon").

Until now, we have the ingredients - the CSS variables names. Now we need to learn what's easiest way to change them.

At this point, you may ask, can I just copy the css_variables.css for Morning Horizon (linked above), 
change some of the values and finally include the file in my app? And, the answer is yes - you can do that and it will work. Whatever CSS variables you change, th changes will take effect. However, this is not the most effective way. 

Instead, it's best to take the source less file and change some of the important less variable (like the variables for the brand and primary colors) and all the rest will be calculated accordingly.

### Build Custom Theme

It's time to put the theory into practice. To build a custom theme, we have done the following:

- Installed `less` and `@sap-theming/theming-base-content` from NPM. We need `less` to compile less to css, and `theming-base-content` to get the source less files of the themes we are going to extend.

- Created a single less file `mytheme.less` and import the source less file of sap_horizon (but you can extend any of the standard themes)

```less
// mytheme.less

@import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";
```

- Customized a single less variable
```less
// mytheme.less
@import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";

@sapPrimary2: violet;
```

- Run the follwing task to produce a pure css file with the CSS Variables

`npm run build:theme`

Underneath, it does not make anything special - runs the less compiler over the less file to produce a css out of it + adds a small piece of metadata that the UI5 Web Components framework will later use.

- The CSS variables are generated into the `src/customtheme/mytheme.css`,
And, they are ready to be added into your application either inside `style` tag or with a `link`.

**Note:** Thanks to the special metadata, added to the generated `mytheme.css`, the UI5 Web Components framwork will detect and apply the custom theme as soon as you set it.

### Switching to the Custom Theme

Once we have the custom theme (`src/customtheme/mytheme.css`), the final step is to use it.
To do so, you can use one of the following APIs for setting a theme:

- With URL parameter: `index.html?sap-ui-theme=mytheme`

- With JS API:
```ts
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

setTheme("mytheme");
```

- With Configuration Script (inside your HTML page)
```html
<script data-ui5-config type="application/json">
{
	"theme": "mytheme"
}
</script>
```


### Run the project
Everything we explained so far is already set up and you can test it:


1. Install dependencies.
`npm i`

2. Customize variables
Open the `src/mytheme.less` file and change the color for `@sap`

3. Run build to generate the custom theme.

`npm run build:theme`

Or, you can also define the name of the custom theme

`npm run build:theme pinky`

Or, you can also define the name of the custom theme + the base theme to extend

`npm run build:theme pinky sap_fiori_3`

**Note:** if the second param (the theme we extend) is used, make sure to match the imported source less from `@sap-theming/theming-base-content`

4. Run the server
`npm run dev`

5. Open the test page at the giver port (the link will be displayed in the console)
- For Example: at http://localhost:5173/ - The page opens in the default theme - for the UI5 Web Components (Morning Horizon as of now)

- For Example: at http://localhost:5173/?sap-ui-theme=mytheme - The page opens with the custom theme, called `mytheme` by default - in case you have built it with `npm run build:theme`

- For Example: at http://localhost:5173/?sap-ui-theme=pinky - The page opens with the custom theme, called `pinky`, in case you have built it with `npm run build:theme pinky`