import select from "dom-select"
import { gsap } from "gsap"

export default function transM(oldContainer, newContainer, done) {

	newContainer.style.position = 'absolute'
	const heightW = window.innerHeight
	newContainer.style.top= `${heightW}px`
	newContainer.style.visibility = 'visible'
	const headerMention = select('.mentions .header_part')
	headerMention.style.opacity = 0

	gsap.timeline()
	.to(newContainer, { duration: 0.5, top: 0, ease: "power2.out"})
	.to(headerMention, { duration: 0.3, opacity: 1})
	.call(() => {done()})

	const oldSelectItem = select('.nav_item.select')
	setTimeout(() => {oldSelectItem && oldSelectItem.querySelector('.background_part').scrollTo(0,0)},900)

	// setTimeout(() => {

	// 	done()

	// },500)

}