const fs = require("fs");
const inquirer = require("inquirer");
const defaultJson = require("./defaults.json"); // default values to use for HTML generation
const generator = require("./util/generator.js");
const axios = require("axios");

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
        name: "github",
        message: "What is your github user name?",
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
 * @param {} answers - the answers the user gave us
 */
async function writeFile(filename, answers){
    console.log("Writing file...");
    let gitHubURL = generateGitHubURL(answers);
    answers.gitHubURL = gitHubURL;
    let repos = await fetchRepos(answers.github);
    let writeData = generator({repos, ...answers});

    fs.writeFile(filename, writeData, (err) =>{
        if (err) {throw err;}
        console.log(`Successfully wrote to ${filename}`);
    });
}

/**
 * gets the appropriate information for the 
 * @param {string} githubUserName - the URL for the appropriate github username
 * @returns {object} the api's fetch
 */
function fetchRepos (githubUserName){
    const queryUrl = `https://api.github.com/users/${githubUserName}/repos?per_page=100`;
    axios.get(queryUrl).then((rep) => {
        return rep.data;
    });
}

function generateGitHubURL(data) {
    if (`${data.github}`.includes("http")) {
        return `${data.github}`;
    } else {
        return `https://github.com/${data.github}`;
    };
};

function init() {

    inquirer.prompt(defaultQuestion).then((answer) =>{
        if (answer.defaults){
            writeFile(DEFAULT_FILENAME, defaultJson);
            return;
        }
        inquirer.prompt(questions).then((answers) =>{
            let writeData = generator(answers);
            writeFile(DEFAULT_FILENAME, writeData);
        });
    });
}

init();