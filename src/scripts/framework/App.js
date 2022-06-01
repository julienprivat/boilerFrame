import Component from '@/framework/component'

export default class App extends Component {
	constructor() {
		super()
	}
	onResize = (width, height) => {}

	onLinkClicked = (el, ev) => {}
	onInitStateChange = currentStatus => {}
	onNewPageReady = (currentStatus, prevStatus, container, html) => {}
	onTransitionCompleted = (currentStatus, prevStatus) => {}

	didUpdate(prevState) {}
}