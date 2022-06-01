import Barba from 'barba.js'
import bind from 'es6-class-bind-all'
import select from 'dom-select'
import config from '@/config'
import choozy from 'choozy'
import event from 'dom-event'
import { detect } from 'detect-browser'
import configQ from '../util/func/configQ'
import saveCol from '../util/func/saveCol'
import { gsap } from "gsap"
import {
	watchViewport,
	unwatchViewport,
	getViewportState
} from 'tornis'


class Default {
	constructor(opt = {}) {
		this.barba = Barba.BaseView.extend({
			namespace: opt,
			onEnter: () => this.onEnter(),
			onEnterCompleted: () => this.onEnterCompleted(),
			onLeave: () => this.onLeave(),
			onLeaveCompleted: () => this.onLeaveCompleted(),
			onResize: (w, h) => this.onResize(w, h)
		})
		bind(this)
	}

	onEnter() {

		this.refs = choozy(this.barba.container)
		this.beforeMount && this.beforeMount()
		this.browser = detect()
		configQ(window.innerWidth)

	}

	startTornis() {

		const updateValues = ({
			size,
			scroll,
			mouse,
			orientation
		}) => {
			if (scroll.changed) {
				this.onSmoothScroll && this.onSmoothScroll(scroll.top)
			}
		}
		watchViewport(updateValues)
	}

	onEnterCompleted() {

			this.mounted && this.mounted()
	
			localStorage.getItem("cookie") && select(".banner").classList.add("hide")

			this.setHeightMobile()
			this.addE("on")
			this.startTornis()

    }

    addE(type) {

        event[type](window, 'scroll', this.initMonitor)

    }

    setHeightMobile() {

		let vh = window.innerHeight * 0.01
		select('html').style.setProperty('--vh', `${vh}px`)

	}
	
    onLeave() {

		this.beforeDestroy && this.beforeDestroy()

	}

	onLeaveCompleted() {

		this.destroyed && this.destroyed()

	}

	onResize(w, h) {

		this.resize && this.resize(w, h)
		this.setHeightMobile()
		configQ(w)
		saveCol(w)

	}

	onSmoothScroll(value) {

		this.onScroll && this.onScroll(value)

	}
}
export default Default;
