import '../style/theme.css'
import '../style/main.scss'
import domready from 'domready'
import Framework from './framework'
import App from './framework/App'
import device from 'current-device'
import config from './config'


// General Config Global
config.device = device
config.isTouch = device.mobile() || device.tablet()
config.isMobile = device.mobile()

// Require Bouncer (form valiation)
// window.Bouncer = require('@/libs/bouncer/')


domready(() => {
	new Framework(App)
})