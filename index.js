const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];


// TODO: Write Code to gather information about the development team members, and render the HTML file.


// Inquirer prompts for manager
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter the manager's name:",
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter the manager's ID:",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter the manager's email:",
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "Enter the manager's office number:",
    },
];

// Inquirer prompts for engineer
const engineerQuestions = [
    // Engineer-specific questions
    {
        type: 'input',
        name: 'name',
        message: "Enter the engineer's name:",
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter the engineer's ID:",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter the engineer's email:",
    },
    {
        type: 'input',
        name: 'github',
        message: "Enter the engineer's GitHub username:",
    },
    {
        type: 'input',
        name: 'programmingLanguage',
        message: "Enter the engineer's preferred programming language:",
    },
];

// Inquirer prompts for intern
const internQuestions = [
    // Intern-specific questions
    {
        type: 'input',
        name: 'name',
        message: "Enter the intern's name:",
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter the intern's ID:",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter the intern's email:",
    },
    {
        type: 'input',
        name: 'school',
        message: "Enter the intern's school:",
    },
    {
        type: 'input',
        name: 'internshipDuration',
        message: "Enter the duration of the intern's internship:",
    },
];

async function promptManager() {
    const managerAnswers = await inquirer.prompt(managerQuestions);
    const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
    teamMembers.push(manager);
}

async function promptEngineer() {
    const engineerAnswers = await inquirer.prompt(engineerQuestions);
    const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
    teamMembers.push(engineer);
}

async function promptIntern() {
    const internAnswers = await inquirer.prompt(internQuestions);
    const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
    teamMembers.push(intern);
}

async function main() {
    // Prompt for manager details
    await promptManager();

    let addAnother = true;
    while (addAnother) {
        const { choice } = await inquirer.prompt({
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        });

        switch (choice) {
            case 'Add an engineer':
                await promptEngineer();
                break;
            case 'Add an intern':
                await promptIntern();
                break;
            case 'Finish building the team':
                addAnother = false;
                break;
        }
    }

    const html = render(teamMembers);
    fs.writeFileSync(outputPath, html);
    console.log(`Team HTML file generated at ${outputPath}`);
}

main();
