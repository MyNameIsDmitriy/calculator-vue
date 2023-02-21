export const buttons = {
  0: {
    description: "Clears the entire expression.",
    operation: () => (this.calculation = ""),
    name: "Clear",
  },
  1: {
    description:
      "Opening bracket. Parentheses are needed to set your own order of actions in a mathematical expression. Example: 3+(15-6)",
    operation: () => "",
    name: "(",
  },
  2: {
    description:
      "Closing bracket. Parentheses are needed to set your own order of actions in a mathematical expression. Example: 3+(15-6)",
    operation: () => "",
    name: ")",
  },
  3: {
    description: "Number seven.",
    operation: () => "",
    name: "7",
  },
  4: {
    description: "Number eight.",
    operation: () => "",
    name: "8",
  },
  5: {
    description: "Number nine.",
    operation: () => "",
    name: "9",
  },
  6: {
    description:
      "Division sign. Allows you to divide one value or the value of an expression into another. Example: 3/cos(1)",
    operation: () => "",
    name: "/",
  },
  7: {
    description:
      "The unit will be divided by your expression. Thus, you determine the inverse proportionality.",
    operation: () => `1/(${this.calculation})`,
    name: "1/x",
  },
  8: {
    description: "Raises your expression to the second power.",
    operation: () => `(${this.calculation})^2`,
    name: "x²",
  },
  9: {
    description:
      "Pi. Equal to 3.1416... Will add to the end of your expression.",
    operation: () => `this.calculation + Math.PI.toFixed(4).toString()`,
    name: "π",
  },
  10: {
    description: "Number four.",
    operation: () => "",
    name: "4",
  },
  11: {
    description: "Number five.",
    operation: () => "",
    name: "5",
  },
  12: {
    description: "Number six.",
    operation: () => "",
    name: "6",
  },
  13: {
    description:
      "Multiplication sign, allows you to calculate the product of two numbers or expressions. Example: 3*(3-18)",
    operation: () => "",
    name: "*",
  },
  14: {
    description:
      "Returns the logarithm of a number. ln(x) - natural logarithm. log2(x) - the base 2 logarithm of a number. log10(x) - the base 10 logarithm of a number",
    operation: () => `this.calculation + ln()`,
    name: "ln",
  },
  15: {
    description:
      "Euler number. Equal to 2,7182818284. Will add to the end of your expression.",
    operation: () => this.calculation + Math.E.toFixed(4).toString(),
    name: "e",
  },
  16: {
    description: "Calculates the square root of your expression.",
    operation: () => `(${this.calculation})^0.5`,
    name: "√",
  },
  17: {
    description: "Number one.",
    operation: () => "",
    name: "1",
  },
  18: {
    description: "Number two.",
    operation: () => "",
    name: "2",
  },
  19: {
    description: "Number three.",
    operation: () => "",
    name: "3",
  },

  20: {
    description:
      "Minus sign. Allows you to calculate the difference of two numbers or expressions. Example: cos(1)-sin(0.5)",
    operation: () => "",
    name: "-",
  },

  21: {
    description: "Returns the sine of a number in radians. Example: sin(0.7)",
    operation: () => `this.calculation + sin()`,
    name: "sin",
  },

  22: {
    description: "Returns the cosine of a number in radians. Example: cos(1)",
    operation: () => `this.calculation + cos()`,
    name: "cos",
  },

  23: {
    description: "Returns the tangent of a number in radians. Example: tan(45)",
    operation: () => `this.calculation + tan()`,
    name: "tan",
  },

  24: {
    description: "Number zero.",
    operation: () => "",
    name: "0",
  },

  25: {
    description:
      "Dot. Allows you to separate the integer part of the number from the fractional. Example: 5.6",
    operation: () => "",
    name: ".",
  },

  26: {
    description:
      "Equal sign. Logs your expression. Only the last three entries are kept in the log.",
    operation: () => "",
    name: "=",
  },

  27: {
    description:
      "Plus sign. Allows you to add two numbers or expressions. Example: 75+ln2(41)",
    operation: () => "",
    name: "+",
  },
};
