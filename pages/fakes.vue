<template>
  <div class="container w-full">
    <div
      v-for="(fake, i) in fakes"
      :key="`${i}-dataset`"
      class="grid pb-8 pt-4"
    >
      <div>@{{ fake.account }}</div>
      <figure>
        <img class="w-full" :src="api + fake.image.data" />
      </figure>
      <div>{{ dataset.date | formatDate }}</div>
      <div>{{ dataset.caption }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dataset',
  data() {
    return {
      api: this.$config.baseURL,
      fakes: [],
      fetchInterval: null,
      scrollTimeout: null,
    }
  },
  mounted() {
    // get posts
    this.fetchDatasets()
    this.fetchInterval = setInterval(() => {
      this.fetchDatasets()
    }, 1000 * 60 * 15) // 15 minutes

    const scrollQuery = this.$route.query.scroll
    if (scrollQuery && (scrollQuery === 'true' || scrollQuery === true)) {
      // query ?scroll=true enables auto scrolling
      this.pageScroll()
    }
  },
  methods: {
    async fetchDatasets() {
      const response = await this.$axios.$get('/generated')
      // sort on date
      this.fakes = response.sort((a, b) => -a.date.localeCompare(b.date))
    },
    pageScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // reset to top
        window.scrollTo(0, 0)
      } else {
        // scroll down 1 pixel
        window.scrollBy(0, 1)
      }
      this.scrollTimeout = setTimeout(this.pageScroll, 1000)
    },
  },
}
</script>
