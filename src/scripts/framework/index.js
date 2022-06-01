import Barba from 'barba.js'
import FastClick from 'fastclick'
import css from 'dom-css'
import config from '@/config'
import sections from '@/sections'
import select from 'dom-select'
import transitionReducer from '../transitions'
import Nav from '../components/Nav'
import configQ from '../util/func/configQ'


export default class Framework {
	constructor(App) {
		this.setup()
		this.init(App)
	}
	setup() {

		config.isDevice && FastClick.attach(config.body)
	
	}
	init(App) {

		this.aboutButton = select('.button__mobile')

		this.app = new App()
		this.addEvents()
		this.initBarba()
		this.onResize()
		new Nav

	}

	addEvents() {

		window.addEventListener('resize', this.onResize)
		Barba.Dispatcher.on('linkClicked', this.onLinkClicked)
		Barba.Dispatcher.on('initStateChange', this.onInitStateChange)
		Barba.Dispatcher.on('newPageReady', this.onNewPageReady)
		Barba.Dispatcher.on('transitionCompleted', this.onTransitionCompleted)

	}

	initBarba() {

		sections.map(view => view.barba.init())
		Barba.Prefetch.init()
		Barba.Pjax.Dom.wrapperId = 'content'
		Barba.Pjax.Dom.containerClass = 'page'
		Barba.Pjax.getTransition = transitionReducer
		Barba.Pjax.start()

	}

	onResize = () => {
		config.width = window.innerWidth
		config.height = window.innerHeight
		this.traverse('onResize', config.width, config.height)
	}

	onLinkClicked = (...args) => {
		this.traverseApp('onLinkClicked', ...args)
	}

	onInitStateChange = (...args) => {
		css(config.html, {
			pointerEvents: 'none'
		})
		this.traverseApp('onInitStateChange', ...args)
	}

	onNewPageReady = (currentStatus, ...args) => {

		this.updateBodyClass()
		this.traverseApp('onNewPageReady', ...args)

		if (!document.querySelector('.pass')) {

			// Set active links in Nav
			const namespace = select(`section[data-namespace="${currentStatus.namespace}"]`).dataset.menu
			const navigation = document.querySelector('.header')
			const navigationLinks = [...navigation.querySelectorAll('.menu_item')]
			const navigationLinkIsActive = navigation.querySelector(`.item_${namespace}`)

			navigationLinks.forEach((navigationLink) => {
				navigationLink.classList.contains('menu_item--is-active') && navigationLink.classList.remove('menu_item--is-active')
				if (navigationLinkIsActive !== null && navigationLinkIsActive.closest('.menu_item') == select(`.item_${namespace}`)) {
					select(`.item_${namespace}`).classList.add('menu_item--is-active')
				}
			})

		}

	}

	onTransitionCompleted = (...args) => {
		css(config.html, {
			pointerEvents: 'auto'
		})
		this.traverseApp('onTransitionCompleted', ...args)
	}

	updateBodyClass() {
		config.body.classList.add(
			`is-${Barba.Pjax.History.currentStatus().namespace}`,
		)
		if (Barba.Pjax.History.prevStatus()) {
			config.body.classList.remove(
				`is-${Barba.Pjax.History.prevStatus().namespace}`,
			)
		}
	}

	traverseApp = (fn, ...args) => {
		typeof this.app[fn] === 'function' && this.app[fn](...args)
	}

	traverseViews = (fn, ...args) => {
		sections
			.filter(
				view =>
					Barba.HistoryManager.currentStatus() &&
				view.barba.namespace === Barba.HistoryManager.currentStatus().namespace,
			)
			.map(view => typeof view.barba[fn] === 'function' && view.barba[fn](...args))
	}

	traverse = (fn, ...args) => {
		this.traverseApp(fn, ...args)
		this.traverseViews(fn, ...args)
	}
}