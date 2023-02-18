<template>
  <vCalculator />
</template>

<script>
import vCalculator from "./components/VCalculator.vue";

export default {
  name: "App",
  components: {
    vCalculator,
  },
};
</script>

<style lang="scss">
@import "@/_variables.scss";

* {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

body {
  * {
    margin: 0;
    padding: 0;
  }

  background-image: linear-gradient(45deg, #33ccff, #ff66ff);
  background-repeat: no-repeat;
}

#app {
  height: 100%;

  display: flex;

  font-size: 1.6rem;
}
</style>
