<template>
  <div class="wrapper">
    <div class="calculator">
      <div class="calculation-history">
        <p>{{ calculationHistory[2] || "" }}</p>
        <p>{{ calculationHistory[1] || "" }}</p>
        <p>{{ calculationHistory[0] || "calculate smth to get history" }}</p>
      </div>

      <form class="calculation" @submit.prevent>
        <input
          class="calculation-field input"
          type="text"
          autofocus
          ref="inputRef"
          @keyup="calculateInput"
          v-model="calculation"
        />
        <p class="calculation-result">
          {{ calculationResult || "result is..." }}
        </p>
      </form>

      <div class="keyboard">
        <span
          class="keyboard__button"
          @mouseover="showDescription(label, 'keyboard-description', 0.5, 0)"
          @mouseleave="actualDescription = null"
          @click="pressButton(label.buttonName, $event)"
          v-for="label in buttons"
          :key="label"
        >
          {{ label.buttonName }}
        </span>
      </div>

      <div class="keyboard-description">
        <p>
          {{ actualDescription || "hover your mouse over any of the buttons" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @mouseleave=""

import { buttons } from "@/buttons.js";

export default {
  name: "vCalculator",
  props: [],

  data() {
    return {
      calculationHistory: [],
      calculation: "",
      correctCalculation: "",
      calculationResult: "",
      buttons: buttons,

      mathOperations: ["/", "*", "-", "+", "."],
      descriptions: [],
      actualDescription: "",

      previousCalcValue: "",
      availableCharacters: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "+",
        "-",
        "/",
        "*",
      ],
      dangerDuplicate: ["(", ")", "/", "+", "*", "-", "=", "."],
    };
  },

  watch: {
    calculation(newCalc) {
      if (newCalc === "") this.calculationResult = "";
    },
  },

  methods: {
    getHistory() {
      this.calculationHistory.splice(2, 1);
      this.calculationHistory.unshift(this.calculation);
    },

    calculateInput(event) {
      try {
        if (/[^0-9aceilnopstx+\-*.^()/]/g.test(event.key)) {
          event.preventDefault(); // preventDefault() is not working
        }

        this.validator();
        if (event.key === "Enter") this.getHistory();
      } catch (err) {
        // console.log(err.name);
        // console.log(err.message);
        return; // do nothing
      }
    },

    pressButton(label) {
      try {
        if (
          !isNaN(label) ||
          this.mathOperations.includes(label) ||
          label === "(" ||
          label === ")"
        ) {
          this.calculation += label;
        }

        if (label === "Clear") {
          this.calculation = "";
          this.calculationResult = "";
        }
        if (label === "1/x") this.calculation = `1/(${this.calculation})`;

        if (label === "x²") this.calculation = `(${this.calculation})^2`;

        if (label === "π") this.calculation += Math.PI.toFixed(4).toString();

        if (label === "ln") this.calculation += "ln()";

        if (label === "e") this.calculation += Math.E.toFixed(4).toString();

        if (label === "√") this.calculation = `(${this.calculation})^0.5`; // no no no 2,0000

        if (label === "sin") this.calculation += "sin()";
        if (label === "cos") this.calculation += "cos()";
        if (label === "tan") this.calculation += "tan()";

        this.validator();

        if (label === "=") this.getHistory();

        this.$refs.inputRef.focus();
      } catch (error) {
        this.$refs.inputRef.focus();
        return; // do nothing
      }
      // if (label === "=")
    },

    validator() {
      let trigoAndLog = ["cos", "sin", "tan", "log10", "log2", "ln"];
      // let trigoParantheses = [
      //   "cos()",
      //   "sin()",
      //   "tan()",
      //   "log10()",
      //   "log2()",
      //   "ln()",
      // ];

      // let calculationArray = this.calculation.split(/[^0-9acgilnost()]/);
      // calculationArray.forEach((item) => {
      //   if (trigoAndLog.includes(item)) {
      //     this.calculation = this.calculation.replaceAll(item, `${item}()`); // not correct
      //   }
      // });

      // console.log(calculationArray);

      this.correctCalculation = this.calculation;

      this.correctCalculation = this.correctCalculation.replace("^", "**");

      trigoAndLog.forEach((el) => {
        this.correctCalculation = this.correctCalculation.replace(
          el,
          "Math." + el
        );
        if (el === "ln") {
          this.correctCalculation = this.correctCalculation.replace(el, "log");
        }
      });

      console.log(this.correctCalculation);

      this.calculationResult =
        eval(this.correctCalculation).toString().split(".")[1]?.length > 4
          ? eval(this.correctCalculation).toFixed(4).toString()
          : eval(this.correctCalculation).toString();

      if (this.calculationResult.toString().split(".")[1] === "0000") {
        this.calculationResult = this.calculationResult
          .toString()
          .split(".")[0];
      }
    },

    showDescription(label, targetElement, timeBetween, currentPos) {
      //this.actualDescription = label.buttonDescription;

      if (currentPos < label.buttonDescription.length) {
        document.getElementsByClassName(targetElement).innerHTML +=
          label.buttonDescription.charAt(currentPos);
        currentPos++;

        setTimeout(function () {
          this.showDescription(label, targetElement, timeBetween, currentPos);
        }, timeBetween);
      }
    },

    //
    //
    //
    //

    testFunction(n) {
      if (!isNaN(n)) {
        this.calcValue += n;
        this.previousCalcValue = "";
      }

      // +++++++ duplicate
      if (
        this.calcValue != 0 &&
        this.previousCalcValue === "" &&
        (n === "." ||
          n === "+" ||
          n === "*" ||
          n === "-" ||
          n === "/" ||
          n === "(" ||
          n === ")")
      ) {
        this.calcValue += n;
        this.previousCalcValue = n;
      }

      if (n === "Clear") {
        this.calcValue = "";
        this.previousCalcValue = "";
      }

      if (n === "√") {
        if (Math.sqrt(this.calcValue).toString().length > 4) {
          this.calcValue = Math.sqrt(this.calcValue).toFixed(4);
        } else this.calcValue = Math.sqrt(this.calcValue);
      }

      if (n === "=" && this.previousCalcValue === "") {
        this.calcValue =
          eval(this.calcValue).toString().split(".")[1]?.length > 4
            ? eval(this.calcValue).toFixed(4).toString()
            : eval(this.calcValue).toString();
        this.previousCalcValue = n;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/_variables.scss";

.wrapper {
  width: $content-small-width;
  margin: 0 auto;
}

.calculator {
  display: flex;
  flex-direction: column;

  width: 700px;
  margin: 0 auto;

  border: 2px solid cyan;

  background-color: rgba(255, 255, 255, 0.25);
}

.calculation-history {
  display: flex;
  flex-direction: column;

  margin-top: 5px;
  p {
    display: flex;
    justify-content: flex-end;

    width: 97%;

    margin-bottom: 3px;

    color: $color-black;
    font-family: $font-2;
  }
}

.calculation {
  margin: 5px 0 7px 0;

  .calculation-field {
    width: 100%;

    box-sizing: border-box;
    border: none;
    outline: none;

    background: transparent;
    font-size: 1.8rem;
    color: $color-white;
    font-family: $font-1;

    text-align: center;
  }

  .calculation-result {
    display: flex;
    justify-content: center;

    color: $color-purple;
    font-size: 1.7rem;
    font-family: $font-2;
  }
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  width: 100%;
  box-sizing: border-box;

  padding: 5px 0;

  color: $color-white;
  font-size: 1.8rem;
  font-family: $font-1;

  .keyboard__button {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 5px 0;
  }

  .keyboard__button:hover {
    color: $color-purple;
    cursor: pointer;
  }

  .keyboard__button:active {
    background-color: rgba(255, 10, 255, 0.25);
    cursor: pointer;
    transition: all 0.2s ease-in;
  }
}

.keyboard-description p {
  color: $color-black;
  font-size: 1.6rem;
  font-family: $font-2;
}

// -----------------------------
// Delete all styles under this line
// -----------------------------

.screen-wrap {
  display: flex;
  justify-content: center;
}

.screen {
  width: 50%;
  min-height: 60px;

  background-color: $color-black;

  border: 4px solid $color-orange;
  border-radius: 6px;

  margin: 50px auto;

  text-align: center;

  color: $color-orange;
  font-family: $font-2;
  font-size: 1.8rem;
  font-weight: 600;

  outline: none;
}

.button:active {
  background-color: $color-purple;

  transition: all 0.2s ease-out;
}
</style>
