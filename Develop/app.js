const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
``
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")
const render = require("./lib/htmlRenderer")

let teamArray = [];

//Questions about the manager (only one manager per team)
const aboutManager = [{
        type: "input",
        name: "name",
        message: "Enter your name as Manager:"
    },
    {
        type: "input",
        name: "office",
        message: "Enter your office number:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address:"
    },
];

//Question about the rest of employees
const addAnEmployee = [{
    type: "confirm",
    name: "addition",
    message: "Do you want to add an employee?"
}];
const questions = [{
        message: "Select employee role:",
        name: "role",
        type: "list",
        choices: ["Engineer", "Intern"],
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

//Last question: school for the intern and gitHub user for the engineer
const lastQuestion = [{
    type: "input",
}];


function promptEmployee(questions) {
    return inquirer.prompt(questions);
}

/* Code to use inquirer to gather information about the development team members,and to create objects for each team member */
async function init() {
    // Only one manager in the team 
    const managerInfo = await promptEmployee(aboutManager);
    teamArray.push(new Manager(managerInfo.name, 1, managerInfo.email, managerInfo.office));
    let employeeNumber = 1; //Number of employee (manager inclued)
    let addQuestion = true; // Boolean for adding or not an employee
    // Multiple employees  allowed
    while (addQuestion == true) {
        const addEmployee = await promptEmployee(addAnEmployee);
        addQuestion = addEmployee.addition;
        if (addQuestion == true) {
            employeeNumber += 1
            console.log("------------------------------------");
            console.log("Adding an employee with id number: " + employeeNumber);
            const answers = await promptEmployee(questions); // Answers objetc to prompt
            const role = answers.role;
            //Last question depending on the type of employee
            if (role == "Engineer") {
                lastQuestion[0].name = "gitHub";
                lastQuestion[0].message = "GitHub username:";
                const lastAnswer = await promptEmployee(lastQuestion);
                answers.gitHub = lastAnswer.gitHub;
                teamArray.push(new Engineer(answers.name, employeeNumber, answers.email, answers.gitHub));
            } else if (role == "Intern") {
                lastQuestion[0].message = "School:";
                lastQuestion[0].name = "school";
                const lastAnswer = await promptEmployee(lastQuestion);
                answers.school = lastAnswer.school;
                teamArray.push(new Intern(answers.name, employeeNumber, answers.email, answers.school));
            }
        } else {
            // All employees recorded
            console.log("------------------------------------")
            console.log("All employees recorded. The team contains " + employeeNumber + " employees")
            console.log(teamArray)
            let htmlRender;
            htmlRender = render(teamArray);
            console.log(htmlRender)
        }
    };
}

init();

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