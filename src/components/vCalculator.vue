<template>
  <div class="wrapper">
    <div class="calculator">
      <CalcHistory :calculationHistory="calculationHistory" />

      <CalcDisplay
        :calculationResult="calculationResult"
        :inputRef="inputRef"
        @calculateInput="calculateInput"
        v-model="calculation"
      />

      <CalcKeyboard
        :calculation="calculation"
        :inputRef="inputRef"
        @pressButton="pressButton"
        @typeDescription="typeDescription"
        @hideDescription="hideDescription"
      />

      <CalcDescription :actualDescription="actualDescription" />
    </div>
  </div>
</template>

<script>
import CalcHistory from "@/components/calc-hystory.vue";
import CalcDisplay from "@/components/calc-display.vue";
import CalcKeyboard from "@/components/calc-keyboard.vue";
import CalcDescription from "@/components/calc-description.vue";

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
      calculationHistory: [],

      calculation: "",
      correctCalculation: "",
      calculationResult: "",

      mathOperations: ["/", "*", "-", "+", "."],

      actualDescription: "",
    };
  },

  watch: {
    calculation(newCalc) {
      if (newCalc === "") this.calculationResult = "";
    },
  },

  methods: {
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

        if (label === "√") this.calculation = `(${this.calculation})^0.5`;

        if (label === "sin") this.calculation += "sin()";
        if (label === "cos") this.calculation += "cos()";
        if (label === "tan") this.calculation += "tan()";

        this.validator();

        if (label === "=") this.getHistory();
      } catch (error) {
        return;
      }
    },

    hideDescription() {
      clearTimeout(this.discriptionTimer);
      this.actualDescription = "";
    },

    typeDescription(label, timeBetween, currentPos) {
      this.hideDescription();
      this.showDescription(label, timeBetween, currentPos);
    },

    showDescription(label, timeBetween, currentPos) {
      if (currentPos < label.buttonDescription.length) {
        this.actualDescription += label.buttonDescription.charAt(currentPos);
        currentPos++;

        this.discriptionTimer = setTimeout(() => {
          this.showDescription(label, timeBetween, currentPos);
        }, timeBetween);
      }
    },

    getHistory() {
      this.calculationHistory.splice(2, 1);
      this.calculationHistory.unshift(this.calculation);
    },

    calculateInput(event) {
      try {
        this.validator();
        if (event.key === "Enter") this.getHistory();

        if (/[^0-9aceilnopstx+\-*.^()/]/g.test(event.key)) {
          event.preventDefault(); // preventDefault() is not working
        }
      } catch (err) {
        // console.log(err.name);
        // console.log(err.message);
        return;
      }
    },

    validator() {
      let trigoAndLog = ["cos", "sin", "tan", "log10", "log2", "ln"];

      this.correctCalculation = this.calculation;

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

      console.log("correct calc: " + this.correctCalculation); // comment me or delete

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
