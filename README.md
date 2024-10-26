# Rule Engine Eligibility Checker

This project is a Node.js-based Rule Engine that determines the eligibility of a user based on their profile attributes (age, department, salary, and experience). It parses complex logical expressions into an Abstract Syntax Tree (AST) and evaluates them according to user input. The eligibility rules are flexible, supporting both **AND** and **OR** operators and a variety of comparison operations.

## Features

- **Rule Parsing**: Parses complex eligibility rules into an AST.
- **Evaluation**: Evaluates the eligibility rules based on user input.
- **Support for Multiple Conditions**: Supports multiple conditional operators like `>`, `<`, `=` with `AND` and `OR` for logical operations.

## Example Usage

```javascript
const rule1 = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const rule2 = "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)";

// Combine and evaluate the rules based on user input.
```


# Rule Engine Eligibility Checker

This project is a Node.js-based Rule Engine that determines the eligibility of a user based on their profile attributes (age, department, salary, and experience). It parses complex logical expressions into an Abstract Syntax Tree (AST) and evaluates them according to user input. The eligibility rules are flexible, supporting both **AND** and **OR** operators and various comparison operations.

# Project Title

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/repo-name.git
   cd repo-name
   ```

2. Open the project in VS Code:

   ```bash
   code .
   ```

3. Run the application:

   In the terminal, execute the following command:

   ```bash
   node index.js
   ```

### Usage

You will be prompted to input the following details:

- Age
- Department(Sales or Marketing)
- Salary
- Experience

After entering the required information, the application will calculate through Rule 1 and Rule2(provided problem statement condition) and will provide output indicating whether you are eligible or not.



