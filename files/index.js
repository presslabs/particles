import _ from 'lodash'

import './styles.scss'
import particles from './resources/particles.json'

_.map(particles, particle => {
  document.write(`<i class="particle">${particle.liga}</i>`)
})
