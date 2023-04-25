# Meme Generator
Meme generator built with React

## Project Requirements:

Using React 18 with React Hooks and Typescript, Create a single page meme generator app. It should be capable of the following: 

- Allow a user to enter an image URL and display the image on the page. 
- Allow the user to rotate, scale, or mirror the image.
- Allow the user to put a line of text at the top and bottom of the image
- Allow the user to change the color of the text that is displayed on the image. 

You may use any utility libraries that you think you will need to submit the project, but please avoid using frameworks such as Material UI. 

## AI-Generated Documentation

App
---
The `App` component is a functional component that serves as the main entry point for the application. It imports several other components, including `Meme`, `Card`, and `MemeControls`. It also uses the useState hook to manage the state of the `memeConfig` object, which contains the current configuration for the meme being generated.

### Props
The `App` component does not accept any props.

### Usage
To use the `App` component, simply import it into your project and add it to your app's main component tree.

---

Card
---
The `Card` component is a functional component that displays a card with a header, body, and footer. It accepts several props that allow you to customize the appearance of the card.

### Props
The `Card` component accepts the following props:

`header`: The content to display in the header of the card.
`footer`: The content to display in the footer of the card.
`className`: A CSS class to apply to the card.
`testId`: A data-testid attribute to apply to the card, which can be used for testing.

### Usage
To use the `Card` component, simply import it into your project and add it to your component tree. Pass in the desired props to customize the appearance of the card. The Card component can wrap other components, which end up in the card's body.

---

Meme
---

The `Meme` component is a functional component that generates a meme based on the configuration provided to it. It accepts an IMeme object as props, which contains the following properties:

`fillColor`: The color to use for the background of the meme.
`strokeColor`: The color to use for the stroke around the text on the meme.
`strokeSize`: The size of the stroke around the text on the meme.

### Props
The `Meme` component accepts an IMeme object as props.

### Usage
To use the `Meme` component, simply import it into your project and add it to your component tree. Pass in an IMeme object as props to configure the appearance of the meme.

---

MemeControls
---
The `MemeControls` component is a functional component that displays controls for configuring a meme. It accepts an `IMeme` object as props, which contains the current configuration for the meme being generated, as well as a callback function to handle updates to the configuration.

### Props
The MemeControls component accepts the following props:

`fillColor`: The current fill color for the meme.
`strokeColor`: The current stroke color for the meme.
`strokeSize`: The current stroke size for the meme.
`onUpdate`: A callback function that is called when the configuration of the meme is updated.

### Usage
To use the `MemeControls` component, simply import it into your project and add it to your component tree. Pass in the current configuration for the meme, as well as a callback function to handle updates to the configuration.