import select from "dom-select"
import { gsap } from "gsap"

export default function transB(oldContainer, newContainer, done) {

	oldContainer.style.position = 'absolute'
	const heightW = window.innerHeight
	oldContainer.style.top= '0px'
	const headerMention = select('.mentions .header_part')
	headerMention.style.opacity = 0

	select('#l_association').classList.add('select')

	gsap.timeline()
	.to(headerMention, { duration: 0.2, opacity: 0})
	.to(oldContainer, { duration: 0.5, top: heightW, ease: "power2.out"})
	.call(() => {done()})

	const oldSelectItem = select('.nav_item.select')
	setTimeout(() => {oldSelectItem && oldSelectItem.querySelector('.background_part').scrollTo(0,0)},900)

	// setTimeout(() => {

	// 	done()

	// },500)

}