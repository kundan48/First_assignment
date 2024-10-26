const readline = require('readline');

class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }

  toString() {
    return `Node(type=${this.type}, value=${this.value}, left=${this.left}, right=${this.right})`;
  }
}

function findMainOperator(expression) {
  let openParens = 0;
  for (let i = expression.length - 1; i >= 0; i--) {
    if (expression[i] === ')') {
      openParens++;
    } else if (expression[i] === '(') {
      openParens--;
    } else if (openParens === 0) {
      if (expression.substring(i, i + 2) === '&&') {
        return { pos: i, operator: 'AND' };
      } else if (expression.substring(i, i + 2) === '||') {
        return { pos: i, operator: 'OR' };
      }
    }
  }
  return { pos: null, operator: null };
}

function createRule(ruleString) {
  ruleString = ruleString.trim();

  if (ruleString.startsWith('(') && ruleString.endsWith(')')) {
    ruleString = ruleString.slice(1, -1).trim();
  }

  const { pos: operatorPos, operator } = findMainOperator(ruleString);
  if (operatorPos !== null) {
    const leftExpr = ruleString.slice(0, operatorPos).trim();
    const rightExpr = ruleString.slice(operatorPos + 2).trim();
    const leftNode = createRule(leftExpr);
    const rightNode = createRule(rightExpr);
    return new Node('operator', operator, leftNode, rightNode);
  }

  const conditionPattern = /(\w+) ([><=]+) ([\w\d']+)/;
  const match = conditionPattern.exec(ruleString);
  if (match) {
    const [, field, operator, value] = match;
    return new Node('operand', { field, operator, value: value.replace(/'/g, '') });
  }

  throw new Error(`Could not parse rule: ${ruleString}`);
}

function combineRules(rules) {
  let root = null;
  for (const rule of rules) {
    const ast = createRule(rule);
    if (!root) {
      root = ast;
    } else {
      root = new Node('operator', 'AND', root, ast);
    }
  }
  return root;
}

function evaluateRule(ast, data) {
  if (!ast) return false;

  if (ast.type === 'operand') {
    const { field, operator, value } = ast.value;
    const userValue = data[field];

    if (operator === '>') {
      return userValue > Number(value);
    } else if (operator === '<') {
      return userValue < Number(value);
    } else if (operator === '=') {
      return userValue == value;
    } else {
      return false;
    }
  }

  if (ast.type === 'operator') {
    if (ast.value === 'AND') {
      return evaluateRule(ast.left, data) && evaluateRule(ast.right, data);
    } else if (ast.value === 'OR') {
      return evaluateRule(ast.left, data) || evaluateRule(ast.right, data);
    }
  }

  return false;
}

const rule1 = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const rule2 = "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)";

const combinedAst = combineRules([rule1, rule2]);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter age: ', (age) => {
  rl.question('Enter department: ', (department) => {
    rl.question('Enter salary: ', (salary) => {
      rl.question('Enter experience: ', (experience) => {
        const data = {
          age: Number(age),
          department: department,
          salary: Number(salary),
          experience: Number(experience)
        };

        const result = evaluateRule(combinedAst, data);
        console.log(result ? "Employer is eligible" : "Not eligible");

        rl.close();
      });
    });
  });
});
