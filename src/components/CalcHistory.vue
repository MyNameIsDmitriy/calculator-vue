<template>
  <div class="calculation-history">
    <!-- TODO v-for -->
    <!-- v-if -->
    <p>{{ calculationHistory[2] || "" }}</p>
    <p>{{ calculationHistory[1] || "" }}</p>
    <p>{{ calculationHistory[0] || "calculate smth to get history" }}</p>
  </div>
</template>

<script>
export default {
  name: "CalcHistory",
  props: {
    calculationHistory: String,
  },
};
</script>

<style scoped lang="scss">
@import "@/_variables.scss";

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
</style>
