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
        message: "What is your linked in URL?",
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
    // format the URL
    let gitHubURL = generateGitHubURL(answers);
    answers.gitHubURL = gitHubURL;

    // fetch the repos
    console.log("fetching repos from URL: ", gitHubURL);
    let repos = await fetchRepos(answers.github);

    // get the information to write to the file
    let writeData = generator({repos, ...answers});
    console.log("Writing file...");

    // use fs to make a new file
    fs.writeFile(filename, writeData, (err) =>{
        if (err) {throw err;}
        console.log(`Successfully wrote to ${filename}`);
    });
}

/**
 * Gets the appropriate information for the generator and returns it as an array
 * @param {string} githubUserName - the URL for the appropriate github username
 * @returns {object[]} - an array of objects for genertor() to use
 */
async function fetchRepos (githubUserName){
    // URL to get the information about the user
    const queryUrl = `https://api.github.com/users/${githubUserName}/repos?per_page=100`;
    // actual query
    return await axios.get(queryUrl).then((rep) => {
        // array to be given to the generator
        ret = [];
        // iterate over reply and push appropriate data
        rep.data.forEach(repo => {
            ret.push( {"name": repo.name, "url": repo.html_url});
        });
        console.log("we have finished fetching");
        return ret;
    });
}

/**
 * Gets a github url from the user's answers
 * @param {object} data - the answers given by the user
 * @returns {string} a valid github URL based on the answer
 */
function generateGitHubURL(data) {
    if (`${data.github}`.includes("http")) {
        return `${data.github}`;
    } else {
        return `https://github.com/${data.github}`;
    }
}

function init() {

    inquirer.prompt(defaultQuestion).then((answer) =>{
        if (answer.defaults){
            writeFile(DEFAULT_FILENAME, defaultJson);
            return;
        }
        inquirer.prompt(questions).then((answers) =>{
            writeFile(DEFAULT_FILENAME, answers);
        });
    });
}

init();