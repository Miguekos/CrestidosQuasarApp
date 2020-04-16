<template>
  <Tabs />
</template>

<script>
export default {
  name: "PageIndex",
  components: {
    Tabs: () => import("../layouts/Tabs")
    // Search: () => import("../components/Search")
  }
};
</script>
