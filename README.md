<p align="center">
<img height="40" src="https://www.productboard.com/wp-content/themes/productboard_rebrand/public/img/productboard-logo.svg">
</p>

---

### Before you start

Please create a private fork of this repository and work on that one. Once you're ready to share your work with us, please grant access to your repository to the owner of this (the original) repository.
### Goals of this exercise

1. Write some automated E2E tests for the TO-DO application that's located under the `e2e` directory using [Cypress](https://docs.cypress.io). The goal is *not* to add full coverage, instead, focus on how to organize the code well in a way that is maintainable if the project grows big.

2. Under the directory `./unit/js` there's a library `sw-client.js` wich is an API client 
for the [Star Wars API](https://swapi.dev/).
Please add a new function to this library to find and return a planet by its name.

3. Write unit tests for the `sw-client.js` library that's located under the `unit` directory using [Jest](https://jestjs.io/)

4. Configure the unit tests to run automatically for pull requests under your repository using [GitHub actions](https://github.com/features/actions)

Inside each of the two directories `e2e` and `unit`, you will find further instructions about the specific component of the exercises 1 and 3 and instructions
on how to get setup, run the app and how to run the tests (if applicable).

The main idea is to showcase your skills, so rather than trying to add a lot of coverage, which can be time consuming, please focus rather on showing what you can do 💪
We care about clean and well organized code that would scale well if the application being tested grows into a big project.

There is no maximum timeframe to complete this assignment so feel free to take as much time as you need to prepare something you're proud of 🚀