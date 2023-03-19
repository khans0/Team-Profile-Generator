const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const path = require('path');
const fs = require('fs');
const { fileURLToPath } = require('url');

//const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const OUTPUT_DIR = path.resolve(dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer.js");

const employees = [];

const promptManager = () => {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the manager's name?",
      name: "name"
    },
    {
      type: "input",
      message: "What is the manager's ID?",
      name: "id"
    },
    {
      type: "input",
      message: "What is the manager's email address?",
      name: "email"
    },
    {
      type: "input",
      message: "What is the manager's office number?",
      name: "officeNumber"
    }
  ]).then(answers => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    employees.push(manager);
    promptEmployee();
  });
};



//add the employee
//employees prompts

function promptEmployee() {
    inquirer.prompt([
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more employees"
        ]
      }
    ]).then(answer => {
      switch (answer.role) {
        case "Engineer":
          promptForEngineer();
          break;
        case "Intern":
          promptForIntern();
          break;
        default:
          generateHtml();
      }
    });
  }

//engineer prompt
const promptEngineer = () => {
  inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            type:"input",
            message: "what is the engineer's ID",
            name: "id"
        },
        {
            type: "input",
            message: "What is the manager's email address?",
            name: "email"
        },
        {
            type:"input",
            message: "What is the engineer's github username?",
            name: "github"
        }
      ]).then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(engineer);
        promptEngineer();
      });
    };

//intern prompts
const promptIntern = () => {
  inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name"
        },
        {
            type:"input",
            message: "what is the intern's ID",
            name: "id"
        },
        {
            type: "input",
            message: "What is the intern's email address?",
            name: "email"
        },
        {
            type:"input",
            message: "What is the intern's school?",
            name: "school"
        }
      ]).then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(intern);
        promptIntern();
      });
    };

 //html page
 function generateHtml() {
    const html = render (employees)
    fs.writeFile(outputPath, html, err =>{
        if (err) throw err
        console.log("The team was generated successfully!")

    })
 }

 promptManager()

