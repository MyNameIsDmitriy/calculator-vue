<template>
  <div class="keyboard">
    <span
      class="keyboard__button"
      @mouseover="typeDescription(button.description, 10, 0)"
      @mouseleave="hideDescription()"
      @click="pressButton(button, $event)"
      v-for="button in buttons"
      :key="button"
    >
      {{ button.name }}
    </span>
  </div>

  <div class="keyboard-mobile-button">
    <span
      class="keyboard__button"
      @click="pressButton(button.name, $event)"
      v-for="button in mobileButtons"
      :key="button"
    >
      {{ button.name }}
    </span>
  </div>

  <div class="keyboard-mobile-func-button">
    <span
      class="keyboard__button"
      @click="pressButton(button.name, $event)"
      v-for="button in mobileFuncButtons"
      :key="button"
    >
      {{ button.name }}
    </span>
  </div>
</template>

<script>
import { buttons } from "@/buttons";
import { mobileButtons } from "@/mobile-buttons";
import { mobileFuncButtons } from "@/mobile-func-buttons";

export default {
  name: "CalcKeyboard",
  props: {
    calculation: [Function, String],
  },
  emits: ["pressButton", "typeDescription", "hideDescription"],

  data() {
    return {
      buttons: buttons,
      mobileButtons: mobileButtons,
      mobileFuncButtons: mobileFuncButtons,
    };
  },

  methods: {
    pressButton(buttonObj, event) {
      this.$emit("pressButton", buttonObj, event);
    },

    typeDescription(buttonDescription, timeBetween, currentPos) {
      this.$emit("typeDescription", buttonDescription, timeBetween, currentPos);
    },

    hideDescription() {
      this.$emit("hideDescription");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/_variables.scss";

.keyboard,
.keyboard-mobile-button,
.keyboard-mobile-func-button {
  display: grid;
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

  .keyboard__button:active {
    text-decoration: underline $color-white;
    transition: all 0.05ms ease-in 0s;

    cursor: pointer;
  }
}
.keyboard {
  grid-template-columns: repeat(7, 1fr);

  .keyboard__button:hover {
    color: $color-purple;
    cursor: pointer;
  }
}

.keyboard-mobile-button {
  grid-template-columns: repeat(4, 1fr);
}

.keyboard-mobile-func-button {
  grid-template-columns: repeat(3, 1fr);
}

@media screen and (max-width: $mobile-big-width) {
  .keyboard {
    display: none;
  }
}

@media screen and (min-width: $mobile-big-width) {
  .keyboard-mobile-button,
  .keyboard-mobile-func-button {
    display: none;
  }
}
</style>
