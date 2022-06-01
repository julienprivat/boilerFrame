import select from "dom-select"

export default function fade(oldContainer, newContainer, done) {
	
	newContainer.style.display = 'none'
	
	let path = window.location.pathname
		path = path.substring(1)

		path = path.replaceAll("en", '')
        path = path.replaceAll("support-us", 'nous-soutenir')
        path = path.replaceAll("2021-edition", 'edition-2021')
        path = path.replaceAll("2022-edition", 'edition-2022')
        path = path.replaceAll("/", '')
        path = path.replaceAll("nous-soutir", 'nous-soutenir')

	let itemNavSelect = select(`.nav_item[data-slug="${path}"]`)
	console.log(!itemNavSelect,itemNavSelect )
	!itemNavSelect ? itemNavSelect = select("#l_association") : ''
	const oldSelectItem = select('.nav_item.select')

	itemNavSelect && itemNavSelect.classList.add('select')
	oldSelectItem && oldSelectItem.classList.remove('select')

	setTimeout(() => {oldSelectItem && oldSelectItem.querySelector('.background_part').scrollTo(0,0)},900)

	setTimeout(() => {

		done()

	},800)

}