<template>
  <div class="w-full">
    <div v-for="(fake, i) in fakes" :key="`${i}-dataset`" class="grid pb-8">
      <div class="flex space-x-4 p-2">
        <div v-if="fake.avatar">
          <img
            class="w-16 h-16 object-cover object-center rounded-full"
            :src="api + fake.avatar.data"
          />
        </div>
        <div v-else>
          <img
            v-if="fake.account === 'gymshark'"
            class="w-16 h-16 object-cover object-center rounded-full"
            src="~/assets/images/gymshark-generated-profile.png"
          />
          <img
            v-if="fake.account === 'patmcgrathreal'"
            class="w-16 h-16 object-cover object-center rounded-full"
            src="~/assets/images/patmcgrath-generated-profile.png"
          />
          <img
            v-if="fake.account === 'tunameltsmyheart'"
            class="w-16 h-16 object-cover object-center rounded-full"
            src="~/assets/images/tunameltsmyheart-generated-profile.png"
          />
        </div>
        <div class="flex-grow flex flex-col justify-center">
          <div class="text-3xl font-bold leading-snug font-secondary-regular">
            {{ fake.account }}.fake
          </div>
          <div class="leading-snug">{{ fake.date | formatDate }}</div>
        </div>
      </div>
      <figure>
        <img class="w-full" :src="api + fake.image.data" />
      </figure>
      <div class="p-2">
        <span class="text-3xl font-bold font-secondary-regular mr-1">
          {{ fake.account }}.fake
        </span>
        {{ fake.caption }}
      </div>
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
      moving: false,
    }
  },
  mounted() {
    // get posts
    this.fetchDatasets()
    this.fetchInterval = setInterval(() => {
      this.fetchDatasets()
    }, 1000 * 60 * 5) // 15 minutes

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
        this.moving = true
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        setTimeout(() => {
          this.moving = false
        }, 1000)
      } else if (!this.moving) {
        // scroll down 1 pixel
        window.scrollBy({ top: 1, left: 0 })
      }

      this.scrollTimeout = setTimeout(this.pageScroll, 100)
    },
  },
}
</script>
