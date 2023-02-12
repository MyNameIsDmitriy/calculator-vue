<template>
  <div class="keyboard-description">
    <p>
      {{ actualDescription || "hover your mouse over any of the buttons" }}
    </p>
  </div>
</template>

<script>
export default {
  name: "CalcDescription",
  props: ["actualDescription"],
};
</script>

<style scoped lang="scss">
@import "@/_variables.scss";

.keyboard-description p {
  color: $color-black;
  font-size: 1.6rem;
  font-family: $font-2;
  margin-bottom: 5px;
}

@media screen and (max-width: $tablet-width) {
  .keyboard-description {
    display: none;
  }
}
</style>
