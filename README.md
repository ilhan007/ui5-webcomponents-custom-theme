# Build Custom Theme for UI5 Web Components

**The project describes how to create a custom theme for  UI5 Web Components.**

There are several ways to create a custom theme for an application, built with [UI5 Web Components](https://github.com/SAP/ui5-webcomponents/).
The recommended way is to use the UI Theme Designer (user friendly tool for creating custom themes), described in the [Custom Theming with UI Theme Designer](https://github.com/SAP/ui5-webcomponents/blob/main/docs/3-customizing/02-theme.md) section. However, the UI Theme Designer is propriatery tool, available internally at SAP. In case you don't have access to the UI Theme Designer, this article is for you.

# Theming of UI5 Web Components

The theming of UI5 Web Components is based entirely on CSS variables. Switching between themes means changing the values of these CSS Variables.
Applying a custom theme means setting custom values for these CSS Variables. So, it turns out we only need to get some variables and overwrite their values.

The CSS variables (used by the UI5 Web Components internally) are maintained in the so called [theming-base-content](https://github.com/SAP/theming-base-content) project.
The great thing is that they are stable and backward compatible - new variables may be added, but old are maintained, so you can safely use them.

For example, you can explore the [Morning Horizon CSS Variables](https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css).
These are exactly the CSS variables being applied, when the theme is set to Morning Horizon("sap_horizon").
And, they are available on NPM: [@sap-theming/theming-base-content](https://www.npmjs.com/package/@sap-theming/theming-base-content).

So far, so good, we have the ingredients - the CSS variables. Now, we need to learn what's the easiest way to change them.

At this point, you may ask, can I just copy the [Morning Horizon CSS Variables](https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css), 
change some of the values and finally include the file in my app? And, the answer is yes - you can do that and it will work.
Whatever CSS variables you change, the changes will take effect. However, this is not the most effective way.

Instead, it's best to take the source less file and change only some of the important less variable (like the variables for the brand and primary colors)
and all the rest will be calculated accordingly.

# Creating Custom Theme
It's time to put the theory into practice. To build a custom theme, we have done the following:

### 1. Using the "@sap-theming/theming-base-content"

We have installed `@sap-theming/theming-base-content` from NPM to get the source less files of the themes we are going to extend.
We have created a single less file `src/mytheme.less` and imported the source less file of `sap_horizon`.
It will serve as our base theme that we are going to customize.

```less
// src/mytheme.less

@import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";
```

### 2. Customizing variables
You are free to change the values of as many variables as you want.
However, we mostly recommend changing the main ones `sapPrimary1` - `sapPrimary7` as most of the variables are derived from them.

```less
// mytheme.less
@import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";

@sapPrimary1: violet;
@sapPrimary2: violet;
```

### 3. Compile Less to CSS
We have installed `less` from NPM to compile less to css.
This is done in the `customtheme.js` file. 
The script runs the less compiler over the less file (`src/mytheme.less`) to produce a css out of it (`src/customtheme/mytheme.css`)
and adds a small piece of metadata that the UI5 Web Components framework will later use.

For convinience, the project provides a task running the script:

`npm run build:theme`

The task outputs the CSS variables into the `src/customtheme/mytheme.css` file.
And, that's it!.

# Using Custom Theme

Once we have the custom theme (`src/customtheme/mytheme.css`), the final step is to use it.

### 1. Adding the Custom CSS
In this project we rely on the vite to include the css by just importing the file as it knows how to deal with CSS imports.
Vite will include the styles as `style` tag for us.

```ts
import "./customtheme/mytheme.css";
```

However, you can reference the file with `link` tag as usual, or by adding manually the `src/customtheme/mytheme.css` content in `style` tag.

### 2. Custom Theme Confuguration
In the previous step we have loaded the CSS , now we only need to set it to the UI5 Web Components.
To do so, you can use one of the standard following APIs for setting a theme (for both custom and standard themes):

- With URL parameter: `index.html?sap-ui-theme=mytheme`

- With JS API:
```ts
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

setTheme("mytheme");
```

If you wonder, how we know to use `mytheme` or how to change it - don't worry!
We will get to the name of the theme and respectively of the parameter in the next section.


# Run the project
Everything said so far is inplemented.
For the test purposes, the project installs `@ui5/webcomponents`, imports many components in `src/main.ts`, used in the `index.html` to observe the custom theming applied.
And, [vite](https://vitejs.dev/) is also used for the development server and es6 module bundling tool (as UI5 Web Components are shipped as es6 modules).


### 1. Install dependencies
`npm i`

### 2. Customize variables [optional]

Open the `src/mytheme.less` file and change the values of `@sapPrimary1` and `@sapPrimary2` variables.

### 3. Run build

`npm run build:theme`

- Or, you can also define the name of the custom theme

`npm run build:theme pinky`

- Or, you can also define the name of the custom theme + the base theme to extend

`npm run build:theme pinky sap_fiori_3`

The build outputs the CSS Variables in `src/customtheme/mytheme.css`.

**Note:** If the second param (the theme we extend) is used, make sure to match the imported source less from `@sap-theming/theming-base-content`
inside the `mytheme.less` file.

### 4. Run the server

`npm run dev`

### 5. Open the test page 
The test page can be opened at a given port, displayed in the console.

- For Example: at `http://localhost:5173/` - The page opens in the default theme for the UI5 Web Component - Morning Horizon as of now

- For Example: at `http://localhost:5173/?sap-ui-theme=mytheme` - The page opens with the custom theme, called `mytheme` by default (In case you have built it with `npm run build:theme`)

- For Example: at `http://localhost:5173/?sap-ui-theme=pinky` - The page opens with the custom theme, called `pinky` (In case you have built it with `npm run build:theme pinky`)

# Screens

### Morning Horizon

<br>
<img width="1313" alt="Screenshot 2024-03-09 at 15 36 46" src="https://github.com/ilhan007/ui5-webcomponents-custom-theme/assets/15702139/2d27fdd2-dbaf-4133-b8a3-341cc9f7e61f">
<img width="1312" alt="Screenshot 2024-03-09 at 15 36 55" src="https://github.com/ilhan007/ui5-webcomponents-custom-theme/assets/15702139/9893b83b-e444-4168-97d7-5c608ce8e78d">
<br>

### The Custom Theme

<br>
<img width="1268" alt="Screenshot 2024-03-09 at 15 39 47" src="https://github.com/ilhan007/ui5-webcomponents-custom-theme/assets/15702139/57cd114d-0f1e-49a9-b2f3-1305dea52604">
<img width="1204" alt="Screenshot 2024-03-09 at 15 40 30" src="https://github.com/ilhan007/ui5-webcomponents-custom-theme/assets/15702139/50286ec6-3c8b-4207-8f83-bf774bb4b748">



