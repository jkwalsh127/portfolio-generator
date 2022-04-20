const fs = require("fs");
const inquirer = require("inquirer");
const defaultJson = require("defaults.json"); // default values to use for HTML generation

/**
 * an array of questions to be sent to inquirer
 * @type {object[]} - each questoin is its own object
 */
const questions = [
    {
        name: "userName",
        message: "tell me your name",
        type:"input"
    },
    {
        name: "location",
        message: "Where are you located?",
        type:"input"
    },
    {
        name: "bio",
        message: "Tell me a little about yourself",
        type:"input"
    },
    {
        name: "linkedInURL",
        message: "What is your linked in?",
        type:"input"
    },
    {
        name: "githubURL",
        message: "What is your github?",
        type:"input"
    },
    {
        name: "email",
        message: "what is your email?",
        type:"input"
    }
];

const defaultQuestion = [{
    message: "Would you like to use the default values?",
    type:"confirm",
    name: "defaults"
}];





function init() {


    inquirer.prompt(defaultQuestion).then((answer) =>{
        if (answer.confirm){
            console.log("using: ", defaultJson);
            return;
        }
        inquirer.prompt(questions).then((answers) =>{
            console.log("answer", answers);
        });
    });
}

init();