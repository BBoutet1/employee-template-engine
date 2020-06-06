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
        name: "officeNumber",
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

//Last question (school for the intern or github user for the engineer)
const lastQuestion = [{
    type: "input",
    //name and message properties  added in init()
}];


function promptEmployee(questions) {
    return inquirer.prompt(questions);
}

/* Code to use inquirer to gather information about the development team members,and to create objects for each team member */
async function init() {
    // Only one manager in the team 
    const managerInfo = await promptEmployee(aboutManager);
    teamArray.push(new Manager(managerInfo.name, 1, managerInfo.email, managerInfo.officeNumber));
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
                lastQuestion[0].name = "github";
                lastQuestion[0].message = "GitHub username:";
                const lastAnswer = await promptEmployee(lastQuestion);
                answers.github = lastAnswer.github;
                teamArray.push(new Engineer(answers.name, employeeNumber, answers.email, answers.github));
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
            const teamHtml = render(teamArray);
            fs.mkdirSync(OUTPUT_DIR, { recursive: true }); //Recursive property to create all levels of directory if not exist.
            fs.writeFile(outputPath, teamHtml, function(err) {
                if (err) return console.log(err);
                console.log("team.html file created");
            });
        }
    };
}

init();