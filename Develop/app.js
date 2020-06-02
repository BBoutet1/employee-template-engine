const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
// const fs = require("fs");​
// const OUTPUT_DIR = path.resolve(__dirname, "output")
// const outputPath = path.join(OUTPUT_DIR, "team.html");​
// const render = require("./lib/htmlRenderer");​​
// Code to use inquirer to gather information about the development team members,

const optionQuestions = ["Office number:", "GitHub username:", "School"]; //last question by employee category"
let categoryQuestion = ""; // Selected category last question

const firstQuestion = [{
    type: "input",
    name: "number",
    message: "How many employees in your team?"
}];
const questions = [{
        message: "Select employee type:",
        name: "category",
        type: "list",
        choices: ["Manager", "Employee", "Intern"],
    },
    {
        type: "input",
        name: "name",
        message: "Enter employee name:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter email address :"
    },
];

const lastQuestion = [{
    type: "input",
    name: "detail",
}];


function promptEmployee(questions) {
    return inquirer.prompt(questions);
}


async function init() {
    const firstAnswer = await promptEmployee(firstQuestion);
    const membersNumber = firstAnswer.number;
    for (i = 0; i < membersNumber; i++) {
        const answers = await promptEmployee(questions); // Answers objetc to prompt
        const category = answers.category;
        if (category == "Manager") {
            categoryQuestion = optionQuestions[0];
        } else if (category == "Employee") {
            categoryQuestion = optionQuestions[1];
        } else if (category == "Intern") {
            categoryQuestion = optionQuestions[2];
        }
        lastQuestion[0].message = categoryQuestion;
        const lastAnswer = await promptEmployee(lastQuestion);
        answers.detail = lastAnswer.detail;
    };


}

init();

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```