import select from 'dom-select'

export default (item_key) => {

    const nav = select('.nav')
    const items = [...document.querySelectorAll('.nav_item')]

    items.forEach((item, key) => {

        if (item_key > key && !item.classList.contains('on_left')) {

            item.classList.add('on_left')

        }

    })

}