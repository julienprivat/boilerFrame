import Default from './default'
import select from 'dom-select'
import event from 'dom-event'
import config from '@/config'

class Home extends Default {
	constructor() {
		super('home')
	}

	mounted() {

        this.init()

    }

	init() {

		this.addEvent('on')

	}

	addEvent(type) {

        const partBall = select('#l_association')
        !config.isTouch && event[type](partBall, 'mousemove', this.cursorHandler)

    }
  
    cursorHandler(e) {

        const ball = select('.ball')
        const bullHalfHeight = ball.offsetHeight / 2
        const bullHalfWidth = ball.offsetWidth / 2

        ball.style.left = `${e.clientX - bullHalfHeight}px`
        ball.style.top = `${e.clientY - bullHalfWidth}px`

    }

	beforeDestroy() {

		this.addEvent('off')

	}

    resize() {

        

    }


}

export default Home