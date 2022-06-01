import Barba from 'barba.js'
import css from 'dom-css'
import config from '@/config'
import instant from './instant'
import fade from './fade'
import transM from './transM'
import transB from './transB'


const map = {
	default: fade,
	// Define different transitions using previous and current namespaces
	edition2021: {
		mentions: transM,
	},
	edition2022: {
		mentions: transM,
	},
	home: {
		mentions: transM,
	},
	soutenir: {
		mentions: transM,
	},
	mentions: {
		home: transB,
	},
	
}

export default function transitionReducer() {
	return Barba.BaseTransition.extend({
		start() {
			css(config.html, {
				cursor: 'wait'
			})
			this.newContainerLoading.then(() => {
				css(config.html, {
					cursor: 'default'
				})
				const from = Barba.Pjax.History.prevStatus().namespace
				const to = Barba.Pjax.History.currentStatus().namespace
				return ((map[from] && map[from][to]) || map.default)(
					this.oldContainer,
					this.newContainer,
					this.done.bind(this),
					window.scrollTo(0,0)
				)
			})
		},
	})
}