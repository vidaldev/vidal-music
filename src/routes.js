import Search from '@/components/Search.vue'
import About from '@/components/About.vue'
import TrackDetail from '@/components/TrackDetail.vue'

const routes = [
  { path: '/vidal-music/', component: Search, name: 'search' },
  { path: '/vidal-music/about/', component: About, name: 'about' },
  { path: '/vidal-music/track/:id', component: TrackDetail, name: 'track' }
]

export default routes
