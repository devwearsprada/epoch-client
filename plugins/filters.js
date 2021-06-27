import Vue from 'vue'

Vue.filter('formatDate', (dateStr) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const date = new Date(dateStr).toLocaleString('en-US', options)
  const hour = new Date(dateStr).toLocaleTimeString('nl-NL')
  return `${date} at ${hour}`
})
