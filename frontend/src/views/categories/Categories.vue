<template>
  <Categories />
</template>

<script>
// @ is an alias to /src
import Categories from '@/components/categories/Categories.vue';
export default {
  name: 'CategoriesContainer',
  data() {
    return {
      loading: true,
      data: [],
      error: null
    };
  },
  components: {
    Categories
  }
};
</script>
