<template>
  <div class="wrapper">
    <div class="calculator">
      <CalcHistory :calculationHistory="calculationHistory" />

      <CalcDisplay
        :calculationResult="calculationResult"
        @calculateInput="calculateInput"
        v-model="calculation"
      />

      <CalcKeyboard
        :calculation="calculation"
        @pressButton="pressButton"
        @typeDescription="typeDescription"
        @hideDescription="hideDescription"
      />

      <CalcDescription :actualDescription="actualDescription" />
    </div>
  </div>
</template>

<script>
import CalcHistory from "@/components/CalcHistory.vue";
import CalcDisplay from "@/components/CalcDisplay.vue";
import CalcKeyboard from "@/components/CalcKeyboard.vue";
import CalcDescription from "@/components/CalcDescription.vue";

import { buttons } from "@/buttons";

// TODO
// object freeze ??? (несложно)

const MATH_OPERATIONS = ["/", "*", "-", "+", "."];

export default {
  name: "vCalculator",
  components: {
    CalcHistory,
    CalcDisplay,
    CalcKeyboard,
    CalcDescription,
  },

  data() {
    return {
      buttons: buttons,
      aboba: "",
      abiba: "",

      calculationHistory: ["", ""],
      calculation: "",
      correctCalculation: "",
      calculationResult: "",
      actualDescription: "",
    };
  },

  watch: {
    calculation(newCalc) {
      if (newCalc === "") this.calculationResult = "";
    },
  },

  methods: {
    pressButton(button) {
      try {
        if (
          !isNaN(button.name) ||
          MATH_OPERATIONS.includes(button.name) ||
          button.name === "(" ||
          button.name === ")"
        ) {
          this.calculation += button.name;
        } else this.calculation = button.operation();

        console.log(button.operation);

        // if (button === "Clear") {
        //   this.calculation = "";
        // }

        // if (button === "1/x") this.calculation = `1/(${this.calculation})`;
        // if (button === "x²") this.calculation = `(${this.calculation})^2`;
        // if (button === "√") this.calculation = `(${this.calculation})^0.5`;
        // if (button === "%") this.calculation = `${this.calculation}/100`;

        // if (button === "π") this.calculation += Math.PI.toFixed(4).toString();
        // if (button === "ln") this.calculation += "ln()";
        // if (button === "e") this.calculation += Math.E.toFixed(4).toString();

        // if (button === "sin") this.calculation += "sin()";
        // if (button === "cos") this.calculation += "cos()";
        // if (button === "tan") this.calculation += "tan()";

        this.transformation(this.calculation);

        if (button === "=") this.getHistory();
      } catch (error) {
        // console.error(error);
        return;
      }
    },

    hideDescription() {
      clearTimeout(this.discriptionTimer);
      this.actualDescription = "";
    },

    typeDescription(button, timeBetween, currentPos) {
      this.hideDescription();
      this.showDescription(button, timeBetween, currentPos);
    },

    showDescription(button, timeBetween, currentPos) {
      if (currentPos < button.length) {
        this.actualDescription += button.charAt(currentPos);
        currentPos++;

        this.discriptionTimer = setTimeout(() => {
          this.showDescription(button, timeBetween, currentPos);
        }, timeBetween);
      }
    },

    getHistory() {
      this.calculationHistory.push(this.calculation);
      if (this.calculationHistory.length > 3) this.calculationHistory.shift();
    },

    calculateInput(event) {
      try {
        this.transformation(this.calculation);
        if (event.key === "Enter" && this.calculation !== "") this.getHistory();

        this.aboba = Object.keys(buttons); // delete me
        this.abiba = this.buttons[3].description; // delete me

        console.log("key: " + event.key);
      } catch (err) {
        // console.error(err);
        return;
      }
    },

    // разбить
    transformation(calculation) {
      let trigoAndLog = ["cos", "sin", "tan", "log10", "log2", "ln"];

      this.correctCalculation = calculation;

      // avoiding error
      if (calculation === "") return;

      this.correctCalculation = this.correctCalculation.replace("^", "**");

      trigoAndLog.forEach((el) => {
        this.correctCalculation = this.correctCalculation.replaceAll(
          el,
          "Math." + el
        );
        if (el === "ln") {
          this.correctCalculation = this.correctCalculation.replace(el, "log");
        }
      });

      console.log("correct calc: " + this.correctCalculation);

      // cointing the answer and rounding it to thousanths if fraction has more than 4 digits
      this.calculationResult =
        eval(this.correctCalculation).toString().split(".")[1]?.length > 4
          ? eval(this.correctCalculation).toFixed(4).toString()
          : eval(this.correctCalculation).toString();

      // solution of "3.000", when using the buttons like square root
      if (this.calculationResult.toString().split(".")[1] === "0000") {
        this.calculationResult = this.calculationResult
          .toString()
          .split(".")[0];
      }

      if (
        this.calculationResult.includes("NaN") ||
        this.calculationResult.includes("function")
      ) {
        this.calculationResult = "incorrect expression";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/_variables.scss";

.wrapper {
  width: 100%;
  margin: 7% auto;
}

.calculator {
  display: flex;
  flex-direction: column;

  margin: 0 auto;

  border: 2px solid cyan;

  background-color: rgba(255, 255, 255, 0.25);
}

@media screen and (max-width: $tablet-width) {
  .calculator {
    min-width: 98%;
  }
}

@media screen and (max-width: $content-small-width) {
  .calculator {
    width: 58%;
  }
}

@media screen and (max-width: $content-md-width) {
  .calculator {
    width: 58%;
  }
}

@media screen and (min-width: 1481px) {
  .calculator {
    width: 58%;
  }
}
</style>
