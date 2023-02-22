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

      calculationHistory: ["", ""],

      calculation: "",
      correctCalculation: "",
      calculationResult: "",

      actualDescription: "",
    };
  },

  watch: {
    calculation(newVal) {
      if (newVal === "") this.calculationResult = "";
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
        } else if (button.name === "=") {
          this.getHistory();
        } else if (button.name === "%") {
          this.calculation = `${this.calculation}/100`;
        } else this.calculation = button.operation(this.calculation);

        this.transformate(this.calculation);
      } catch (error) {
        // console.error(error);
        return;
      }
    },

    hideDescription() {
      clearTimeout(this.descriptionTimer);
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

        this.descriptionTimer = setTimeout(() => {
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
        this.transformate(this.calculation);
        if (event.key === "Enter" && this.calculation !== "") this.getHistory();

        console.log("key: " + event.key);
      } catch (err) {
        // console.error(err);
        return;
      }
    },

    // разбить
    transformate(calculation) {
      this.correctCalculation = calculation;

      // avoiding error
      if (calculation === "") return;

      this.correctExpression();

      // counting the answer and rounding it to thousanths if fraction has more than 4 digits
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
      this.validateExpression();
    },

    correctExpression() {
      let trigoAndLog = ["cos", "sin", "tan", "log10", "log2", "ln"];

      this.correctCalculation = this.correctCalculation.replaceAll("^", "**");

      trigoAndLog.forEach((el) => {
        this.correctCalculation = this.correctCalculation.replaceAll(
          el,
          "Math." + el
        );
        if (el === "ln") {
          this.correctCalculation = this.correctCalculation.replaceAll(
            el,
            "log"
          );
        }
      });

      // console.log("correct calc: " + this.correctCalculation);
    },

    validateExpression() {
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
