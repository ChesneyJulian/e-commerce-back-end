# e-commerce-back-end

## Description
The goal of this project is to modify code for an e-commerce site's back end. This is accomplished by utilizing Sequelize and Express to complete an Express.js API that interacts with a MySQL Database. This API allows users to retrieve data (by group or by id), update, and delete Categories, Products, and Tags.
## Walkthrough Video
Watch [this video](https://drive.google.com/file/d/1zV1wLt-IKUNQfoIcszpFoea_EN9fogP4/view) to see a demonstration of this project.

## Usage
To use this project, first download all files as well as npm packages noted as dependencies in the package.json. Then:
- create a dotenv file with user, password, and database information
- create database using db/schema.sql and MySQL shell commands
- enter ' npm run seed ' into the terminal from root directory
- enter ' npm run start ' into the terminal from root directory
- open Insomnia or other API development platform and use link 'http://localhost:3001/' followed by specified API routes
- use different API routes to alter, view, or delete data from MySQL database
## Resources
[dotenv](https://www.npmjs.com/package/dotenv)

[MySQL](https://www.npmjs.com/package/mysql2https://www.npmjs.com/package/mysql2)

[Sequelize](https://sequelize.org/)

[Express.js](https://expressjs.com/en/5x/api.html)

[Insomnia](https://insomnia.rest/) (used for API testing and development)