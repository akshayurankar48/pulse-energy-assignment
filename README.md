# Charging Data API

This project is an Express.js-based API for managing charging data from electric vehicles. It utilizes MongoDB for data storage and MQTT for real-time data communication.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Run the Server](#run-the-server)
  - [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Development Approach](#development-approach)
- [Future Improvements](#future-improvements)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB
- MQTT broker (HiveMQ)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
cd charging-data-api
npm install
```

## Configuration

Configure the project by setting environment variables in a `.env` file. Refer to the provided `.env.example` file for required variables.

## Usage

### Run the MQTT Server

```bash
npm run server
```

### Run the HTTP Client

```bash
npm start
```

**Note:** Run MQTT Server and HTTP Client two separate terminals simultaneously.

### API Endpoints

- **GET /api/charging-data:** Get all charging data (supports pagination and filtering by charge point IDs).
- **GET /api/charging-data/:id:** Get charging data by ID.

# Project Structure

The project structure is organized as follows:

- **controllers:** Contains controller functions for handling API routes.
- **middleware:** Custom middleware functions.
- **models:** MongoDB schema models.
- **routes:** Express route configurations.
- **utils:** Utility functions.

## Development Approach

My development approach for this project involved the following steps:

1. **Project Setup:** I initiated the project from scratch, experimenting with various configurations and dependencies. This phase allowed me to familiarize myself with the technology stack and identify potential challenges.

2. **Trial and Error:** During the initial stage, I engaged in extensive trial and error, experimenting with different configurations, libraries, and project structures. This helped me gain insights into the strengths and limitations of various approaches.

3. **Documentation Review:** To gather requirements and gain a deeper understanding of the project scope, I reviewed relevant documentation. This step was crucial for shaping the architecture and ensuring alignment with project goals.

4. **Real Project Kickoff:** Once confident with the initial setup, I transitioned to the actual project, focusing on writing clear commit messages and creating meaningful branches. This approach ensures a well-documented and organized version control history.

5. **Continuous Learning:** Throughout the development process, I continued to refer to documentation and online resources to stay updated on best practices and optimize the implementation. This commitment to continuous learning enhances the project's quality and efficiency.

By following this approach, I aimed to create a robust foundation for the project while maintaining flexibility to adapt to evolving requirements.

## Future Improvements

To enhance the project's functionality and robustness, the following improvements are suggested:

1. **Test Cases:** Introduce comprehensive test cases to ensure the reliability and stability of the application. Covering various scenarios and edge cases will contribute to a more resilient codebase.

2. **Additional HTTP Methods:** Implement POST, PATCH, PUT, and DELETE requests to provide a complete set of CRUD operations. This expands the range of interactions with the API, making it more versatile.

3. **Optimizing for Large Data Sets:** Explore strategies to optimize the application's performance when handling large amounts of data. This may involve refining database queries, implementing pagination effectively, and utilizing caching mechanisms.

4. **Security Enhancements:** Evaluate and implement security best practices, such as input validation, parameter sanitization, and secure communication protocols. Enhancing security measures will protect against potential vulnerabilities.

5. **Logging and Monitoring:** Integrate logging mechanisms and monitoring tools to track application behavior and performance. This facilitates proactive issue identification and resolution.

6. **Error Handling:** Improve error handling mechanisms to provide informative and user-friendly error messages. This ensures a better user experience and aids in troubleshooting.

7. **Documentation Updates:** Keep documentation up-to-date with any changes, additions, or optimizations made to the project. Clear and concise documentation is invaluable for developers joining the project.

8. **Scalability Considerations:** Evaluate the application's scalability and implement strategies to handle increased traffic and user loads. This may involve adopting microservices architecture or optimizing resource utilization.

9. **Code Refactoring:** Periodically review and refactor the codebase to enhance readability, maintainability, and adherence to coding standards. This contributes to a more sustainable and collaborative development process.

10. **Continuous Integration/Continuous Deployment (CI/CD):** Implement CI/CD pipelines to automate testing and deployment processes. This streamlines development workflows and ensures consistent and reliable releases.

By incorporating these improvements, the project can evolve into a more robust, scalable, and maintainable solution.

## Tech Stack

The project is built using the following technologies and dependencies:

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web framework for building robust and scalable APIs.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB.
- **MQTT:** Lightweight messaging protocol for real-time communication.
- **Cors:** Middleware for handling Cross-Origin Resource Sharing.
- **CSV Parser:** Library for parsing CSV files.
- **Dotenv:** Module for loading environment variables from a .env file.
- **Express Async Handler:** Utility for handling asynchronous functions in Express.
- **Nodemon:** Utility to monitor changes in the application and automatically restart the server during development.
- **TypeScript:** Superset of JavaScript that adds static typing and other features for better developer experience.
- **@types packages:** TypeScript type definitions for various libraries used in the project.

### Development Dependencies

- **@types/body-parser:** TypeScript type definitions for the body-parser library.
- **@types/compression:** TypeScript type definitions for the compression library.
- **@types/cors:** TypeScript type definitions for the cors library.
- **@types/express:** TypeScript type definitions for the express library.
- **Nodemon:** Utility to monitor changes in the application and automatically restart the server during development.
- **ts-node:** TypeScript execution environment and REPL for Node.js.
- **TypeScript:** Superset of JavaScript that adds static typing and other features for better developer experience.

## Contributing

Feel free to contribute to this project. Create a fork, make your changes, and submit a pull request.
