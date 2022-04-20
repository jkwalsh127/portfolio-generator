const fs = require("fs");
const inquirer = require("inquirer");
const defaultJson = require("./defaults.json"); // default values to use for HTML generation
const generator = require("./util/generator.js");

const DEFAULT_FILENAME = "portfolio.html";

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

/**
 * This is the question given first to see if we want to use default values to
 * make a portfolio
 */
const defaultQuestion = [{
    message: "Would you like to use the default values?",
    type:"confirm",
    name: "defaults"
}];

/**
 * Writes the data we have to a file
 * @param {string} filename - the name of the file to write
 * @param {*} data - the string to write to the file
 */
function writeFile(filename, data){
    console.log("Writing file...");
    fs.writeFile(filename, data, (err) =>{
        if (err) {throw err;}
        console.log(`Successfully wrote to ${filename}`);
    });
}


function init() {

    inquirer.prompt(defaultQuestion).then((answer) =>{
        if (answer.defaults){
            console.log("using: ", defaultJson);
            return;
        }
        inquirer.prompt(questions).then((answers) =>{
            let writeData = generator(answers);
            writeFile(DEFAULT_FILENAME, writeData);
        });
    });
}

init();