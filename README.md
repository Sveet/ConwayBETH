# Conway's Game of Life on BETH Stack

Welcome to a TypeScript implementation of Conway's Game of Life! This project is a modern take on the classic cellular automaton devised by the British mathematician John Conway. Dive in to explore the fascinating patterns and behaviors of cells in this simulation.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)

## Introduction

Conway's Game of Life is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

The game consists of a grid of cells, each of which can be alive or dead. The cells evolve in steps, with each step being based on a few simple rules:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

## Technologies Used

This project is built using the [BETH stack](https://github.com/fvucemilo/beth-stack). Here's a breakdown:

- **Bun**: A drop-in NodeJS replacement with first class support for TypeScript. Features: designed for speed and comes with a bundler, test runner, and Node.js-compatible package manager.
- **Elysia**: A fast and friendly bun web framework with end-to-end type safety and great developer experience. Elysia provides first-class TypeScript support with well-thought integration between services, whether it's tRPC, Swagger, or WebSocket. [Learn more about Elysia](https://elysiajs.com/).
- **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- **HTMX**: A tool that allows you to access AJAX, CSS Transitions, WebSockets, and Server Sent Events directly in HTML, boosting the interactivity of the application without requiring you to write any JavaScript.

Together, these technologies provide a robust foundation for building and scaling the Game of Life simulation.
## Bun
Bun should be installed to run this project. It is likely that it can run with NodeJS, however it is untested and will perform worse.

### Homebrew
  ```bash
  brew tap oven-sh/bun
  brew install bun
  ```
### Other
See the bun docs for other methods of installation: [link](https://bun.sh/docs/installation)

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-link/conways-game-of-life-ts.git
  ```
1. Navigate to the project directory:
  ```bash
  cd ConwayBETH
  ```
1. Install the required dependencies:
  ```bash
  bun install
  ```
1. Run the server:
  ```bash
  bun start
  ```
1. Open your browser and navigate to http://localhost:3000 to begin playing the game

## Usage
* Click on cells to toggle their state between alive (filled) and dead (empty).
* Use the controls at the top to start or stop the simulation.
* All worlds are saved by ID and persisted via SQLite database.
* Explore different initial configurations to see various patterns emerge!