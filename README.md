# A guide to Webpack Module Federation using Angular

- [Description](#description)
- [Code demos](#code-demos)
- [Shared Modules](#shared-modules)
- [Recommendations](#recommendations)
- [Multi-frameworks with Module Federation](#multi-frameworks-with-module-federation)
- [Pitfalls](#pitfalls)
- [Other learning material](#other-learning-material)

## Description 

This repo came about as a result of my journey to learn how to use [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/) as a vehicle to implement [micro-frontend architectures](/docs/other-learning-material.md#micro-frontends).

> Module federation allows a JavaScript application to dynamically load code from another application — in the process, sharing dependencies, if an application consuming a federated module does not have a dependency needed by the federated code — Webpack will download the missing dependency from that federated build origin. [^1]
>

[^1]: [Webpack 5 Module Federation: A game-changer in JavaScript architecture](https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669)

**The repo is structured as a learning guide to Webpack Module Federation. I advise you to go through each section in the order they are presented.**

> **Note**
> 
> This repo uses Angular as the frontend framework to explore Webpack Module Federation but a lot of the concepts explained are applicable regardless of the frontend framework. 
> 
   
## Code demos

**Read the [Code demos overall notes](/docs/code-demos-overall-notes.md) before exploring the code demos.**

> **Note**
>
> You can use `github.dev` to explore the code demos without cloning the repo. As long as you're logged in to `github.com`, you can just press `.` (dot) on this repo page and the repo will be opened in the `github.dev` editor, a lightweight editing experience that runs entirely in your browser.

| Demo                                                                                                                                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [basic-ng16](/code-demos/basic-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                                                                        | The most bare-bones possible example of how to setup Webpack Module Federation where the shell lazy loads an Angular module using Angular routing. This code demo does NOT make use of the [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation) npm package which is usually used to setup module federation for Angular projects. </br></br> The main idea is to show the basics for learning purposes. </br></br> The remote webpack module contains an Angular module which the shell loads using Angular routing. |
| [angular-architects-ng16](/code-demos/angular-architects-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                                              | Same as the [basic-ng16](/code-demos/basic-ng16/README.md) example but instead of manually doing all the module federation setup, it uses the [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation) npm package which is a package that aims to streamline the module federation setup for Angular apps. </br></br> The remote webpack module contains an Angular module which the shell loads using Angular routing.                                                                                                  |
| [dynamic-ng16](/code-demos/dynamic-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                                                                    | Shows how to setup module federation without having to declare a remote in the shell's webpack configuration file. This code demo is called dynamic because it does NOT require the remote to be declared in the shell's webpack configuration. </br></br> Despite not being part of this example, it would be simple to extend it and have the remote webpack module location fetched at runtime via an HTTP call. </br></br> The remote webpack module contains an Angular module which the shell loads using Angular routing.                                              |
| [dynamic-manifest-ng16](/code-demos/dynamic-manifest-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                                                  | Same as the [dynamic-ng16](/code-demos/dynamic-ng16/README.md) example but shows how to use a manifest file to hold the configuration of the remotes. </br></br> The remote webpack module contains an Angular module which the shell loads using Angular routing.                                                                                                                                                                                                                                                                                                            |
| [component-ng16](/code-demos/component-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                                                                | The shell dynamically instantiates an Angular component and adds it to the DOM. This example also shows how to pass inputs to the Angular component. </br></br> The remote webpack modules contain an Angular Module and an Angular component which the shell dynamically loads without using Angular routing. It shows 4 different ways to load the Angular module/component.                                                                                                                                                                                                |
| [component-standalone-ng16](/code-demos/component-standalone-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                                          | The shell loads an Angular standalone component by using Angular routing and by dynamically instantiating an Angular standalone component and adding it to the DOM. This example also shows how to pass inputs to the Angular component and subscribe to its outputs. </br></br> The remote webpack module contains an Angular standalone component.                                                                                                                                                                                                                          |
| [component-directive-ng16](/code-demos/component-directive-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                                            | Same as the [component-ng16](/code-demos/component-ng16/README.md) example but using a reusable Angular directive. This example also shows how to pass inputs to the Angular component and subscribe to its outputs. </br></br> The remote webpack module contains an Angular component. <br></br> The Angular directive in this code demo could also be used with Angular standalone components.                                                                                                                                                                             |
| [routes-ng16](/code-demos/routes-ng16/README.md) </br></br> Both shell and remote app use Angular 16.                                                                      | Using Angular routing, the shell loads a couple of remote Angular standalone components from the routes that are exposed from the mfe1 app. <br></br> The remote webpack module contains a variable that represents an array of Angular routes.                                                                                                                                                                                                                                                                                                                               |
| [web-component-ng16](/code-demos/web-component-ng16/README.md) </br></br>  Both shell and remote app use Angular 16.                                                       | Shows how to setup module federation where the shell loads a Web component created from an Angular standalone component. <br></br> This example also shows how to use the inputs and outputs of the converted Angular component, which are mapped to Web component custom properties and custom events, and how to get strict type checking and IDE auto-completion on HTML for web components.   <br></br> The remote webpack module contains a function that registers the Web component.                                                                                   |
| [web-component-directive-ng16](/code-demos/web-component-directive-ng16/README.md) </br></br>  Both shell and remote app use Angular 16.                                   | Same as the [web-component-ng16](/code-demos/web-component-ng16/README.md) example but using an Angular directive to bootstrap the Web component. <br></br> The remote webpack module executes a function that registers the Web component.                                                                                                                                                                                                                                                                                                                                   |
| [web-component-angular-architects-wrapper-ng16](/code-demos/web-component-angular-architects-wrapper-ng16/README.md) </br></br>  Both shell and remote app use Angular 16. | The shell uses a generic Angular component that acts as a wrapper for the remotely loaded Web component. It shows how to use the generic component directly on the HTML and with Angular routing. <br></br> This example also shows how to set properties and listen to events from the Web component. <br></br> The remote webpack module executes a function that registers the Web component.                                                                                                                                                                              |
| [multi-version-ng](/code-demos/multi-version-ng/README.md) </br></br>  TODO.                                                                                               | TODO. <br></br> TODO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [communication-custom-events-ng16](/code-demos/communication-custom-events-ng16/README.md) </br></br>  TODO.                                                               | TODO. <br></br> TODO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [communication-event-bus-ng16](/code-demos/communication-event-bus-ng16/README.md) </br></br>  TODO.                                                                       | TODO. <br></br> TODO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [advanced-ng16](/code-demos/advanced-ng16/README.md) </br></br>  TODO.                                                                                                     | TODO. <br></br> TODO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## Shared Modules

TODO

## Recommendations

TODO

## Multi-frameworks with Module Federation

TODO

## Pitfalls

TODO

## Other learning material

[This page](/docs/other-learning-material.md) contains a collection of links that helped me learn Webpack Module Federation and build the [code demos](#code-demos).
