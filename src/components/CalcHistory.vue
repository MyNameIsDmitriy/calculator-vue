<template>
  <div class="calculation-history">
    <p v-if="calculationHistory.length < 3">
      {{ "calculate smth to get history" }}
    </p>
    <p v-for="history in calculationHistory" :key="history">
      {{ history }}
    </p>
  </div>
</template>

<script>
export default {
  name: "CalcHistory",
  props: {
    calculationHistory: Array,
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
