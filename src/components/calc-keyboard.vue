<template>
  <div class="keyboard">
    <span
      class="keyboard__button"
      @mouseover="typeDescription(label, 10, 0)"
      @mouseleave="hideDescription()"
      @click="pressButton(label.buttonName, $event)"
      v-for="label in buttons"
      :key="label"
    >
      {{ label.buttonName }}
    </span>
  </div>

  <div class="keyboard-mobile-button">
    <span
      class="keyboard__button"
      @click="pressButton(label.buttonName, $event)"
      v-for="label in mobileButtons"
      :key="label"
    >
      {{ label.buttonName }}
    </span>
  </div>

  <div class="keyboard-mobile-func-button">
    <span
      class="keyboard__button"
      @click="pressButton(label.buttonName, $event)"
      v-for="label in mobileFuncButtons"
      :key="label"
    >
      {{ label.buttonName }}
    </span>
  </div>
</template>

<script>
import { buttons } from "@/buttons";
import { mobileButtons } from "@/mobile-buttons";
import { mobileFuncButtons } from "@/mobile-func-buttons";

export default {
  name: "CalcKeyboard",
  emits: ["pressButton", "typeDescription", "hideDescription"],

  data() {
    return {
      buttons: buttons,
      mobileButtons: mobileButtons,
      mobileFuncButtons: mobileFuncButtons,
    };
  },

  methods: {
    pressButton(label, event) {
      this.$emit("pressButton", label, event);
    },

    typeDescription(label, timeBetween, currentPos) {
      this.$emit("typeDescription", label, timeBetween, currentPos);
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
    background-color: rgba(255, 10, 255, 0.25);
    cursor: pointer;
    transition: all 0.2s ease-in;
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
