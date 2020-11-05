const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "output.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const arrayID = []

const createEmployee = () => {
    function newManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your name?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "EMail address?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Office Number?",
            },
            {
                type: "input",
                name: "managerGithub",
                message: "Github username?",
            },

        ]).then((answers) => {
            const manager = new Manager(answers.managerName, answers.managerEmail, answers.officeNumber, answers.managerGithub)
            teamMembers.push(manager)
            arrayID.push(answers.managerID)
            newTeam();
        })
        function newTeam() {
            inquirer.prompt([
                {
                    type: "list",
                    name: "memberChoice",
                    message: "Whats your new team members role?",
                    choices: [
                        "Engineer",
                        "Intern",
                        "No new entries to add"
                    ]
                }
            ]).then(chosen => {
                switch (chosen.memberChoice) {
                    case "Engineer":
                        newEngineer();
                        break;
                    case "Intern":
                        newIntern();
                        break;
                    default:
                        makeTeam();
                }
            }
            )

            function newEngineer() {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "engineerName",
                        message: "What is your name?",
                    },
                    {
                        type: "input",
                        name: "engineerEmail",
                        message: "EMail adress?"
                    },
                    {
                        type: "input",
                        name: "engineerID",
                        message: "Employee ID?",
                    },
                    {
                        type: "input",
                        name: "engineerGithub",
                        message: "Github username?",
                    },
                ]).then((answers) => {
                    const engineer = new Engineer(answers.engineerName, answers.engineerEmail, answers.engineerID, answers.engineerGithub)
                    teamMembers.push(engineer)
                    arrayID.push(answers.engineerID)
                    newTeam();
                })
            }
            function newIntern() {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "internName",
                        message: "What is your name?",
                    },
                    {
                        type: "input",
                        name: "internEmail",
                        message: "EMail address?"
                    },
                    {
                        type: "input",
                        name: "internID",
                        message: "What is your ID?",
                    },
                    {
                        type: "input",
                        name: "internSchool",
                        message: "College Name?",
                    }
                ]).then((answers) => {
                    const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
                    teamMembers.push(intern)
                    arrayID.push(answers.internID)
                    newTeam();
                })
            }
        }
        function makeTeam() {
            fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        }
    }
    newManager();

}

createEmployee();
