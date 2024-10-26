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
