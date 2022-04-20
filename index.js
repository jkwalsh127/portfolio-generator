const fs = require("fs");
const inquirer = require("inquirer");
/**
 * an array of questions to be sent to inquirer
 * @type {object[]} - each questoin is its own object
 */
const questions = [
    {
        name: "userName",
        message: "tell me your name"
    }
];

inquirer.prompt(questions).then((answers) =>{
    console.log("userName:", answers.userName);
});