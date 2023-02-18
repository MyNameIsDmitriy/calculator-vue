<template>
  <form class="calculation" @submit.prevent>
    <input
      class="calculation-field"
      type="text"
      autofocus
      ref="inputRef"
      @keyup="calculateInput($event)"
      @keypress="blockSomeSign($event)"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p class="calculation-result">
      {{ calculationResult || "calculate smth !" }}
    </p>
  </form>
</template>

<script>
export default {
  name: "CalcDisplay",
  props: ["calculationResult", "modelValue"], // TODO: types
  emits: ["calculateInput"],

  data() {
    return {};
  },

  methods: {
    calculateInput(event) {
      this.$emit("calculateInput", event);
    },

    blockSomeSign(event) {
      if (/[^0-9aceilnopstx+\-*.^()/]/g.test(event.key)) {
        event.preventDefault();
      }
    },
  },

  watch: {
    modelValue() {
      this.$refs.inputRef.focus();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/_variables.scss";
.calculation {
  margin: 5px 0 7px 0;

  .calculation-field {
    width: 99%;

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
</style>
