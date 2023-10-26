# Tattoo Machines Store

*This project is a website for an online store specializing in the sale of tattoo machines and tattooing accessories.*
## Technologies
*This project is developed using the following technologies:*
- **Frontend** : HTML, SCSS, TypeScript, Next.js, Effector, Emailjs
- ***Backend*** : Node.js, Nest.js, TypeScript, Sequelize
- **Testing*** : Jest
- ***Database*** : mysql
- ***Authentication*** : Passport, Express-session

## Installation and Running
1. Clone this repository to your computer.
2. Go to the **server** folder.
   `cd server`
3. Enter the command to install the packages.
   `yarn install`
4. Open and review the`./server/env-example` file create an `.env` file according to the `.env-example`
5. Go to database config file `./server/config/config.json` add your msql config.
6. Run the scripts that are in the file `package.json` :  `"migration:start"` and `"seeds"`
7. Start the dev server `yarn start:dev`
8.  Go to the **client** folder.
    `cd ../` `cd client`
9. Enter the command to install the packages.
   `yarn install`
10. Open and review the`./client/env-example` file create an `.env` file according to the `.env-example`
11. Start the dev server: `yarn dev`