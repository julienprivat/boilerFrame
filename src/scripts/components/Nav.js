import select from "dom-select"
import { gsap } from "gsap"
import event from "dom-event"
import config from "@/config"
import bind from "es6-class-bind-all"

class Nav {
    constructor() {
        bind(this)
        setTimeout(() => {
            this.cache(), this.init()
        }, 400);
    }

    cache() {

        this.resa_buttons = document.querySelectorAll(".item_reservation")
        this.items = [...document.querySelectorAll(".b-nav .b-link")]
        this.navItems = [...document.querySelectorAll('.nav_item')]

    }

    init() {

        this.initLanguageNav()
        this.addEvents("on")
        this.initOnglet()
    
    }

    initOnglet() {

        let path = window.location.pathname
		path = path.substring(1)
        console.log('nav', path)
        
        path = path.replaceAll("en", '')
        path = path.replaceAll("support-us", 'nous-soutenir')
        path = path.replaceAll("2021-edition", 'edition-2021')
        path = path.replaceAll("2022-edition", 'edition-2022')
        path = path.replaceAll("/", '')
        path = path.replaceAll("nous-soutir", 'nous-soutenir')
        path == '' ? path = 'home' : ''

        console.log('nav', path)
        const itemNavSelect = select(`.nav_item[data-slug="${path}"]`)
        const oldSelectItem = select('.select')

        if (itemNavSelect) {
            const keySelect = parseInt(itemNavSelect.dataset.key) + 1
            select('.page').setAttribute('style', `--position:${keySelect}`)
            oldSelectItem && oldSelectItem !== itemNavSelect && oldSelectItem.classList.remove('select')
            itemNavSelect && itemNavSelect.classList.add('select')
        }
    }

    addEvents(type) {
        
        event[type](select(".banner_valid"), "click", this.validBanner)

        if(config.isTwo) {

            const burgerButton = select('.b-menu')
            event[type](burgerButton, 'click', this.handlerBurger)
            console.log('items',this.navItems)
            this.items.forEach((item) => {
                event[type](item, 'click', this.handlerBurger)
            })
            event[type](select('.layout_nav'), 'click', this.handlerBurger)

        }
    }

    handlerBurger() {

        const burger_part = select(".burger_part")

        if (burger_part.classList.contains('open')) {
            console.log('hand',this.navItems)
            burger_part.classList.toggle("open")
            gsap.to(this.items, 0.3, { opacity: 0 }, 0)

        } else {
    
            burger_part.classList.toggle("open")
            gsap.timeline().staggerTo(this.items, 0.3, { opacity: 1 }, 0.1)

        }

    }
    
    validBanner() {

        localStorage.setItem("cookie", "true"), select(".banner").classList.add("hide");

    }

    initLanguageNav() {

        const headerParts = [...document.querySelectorAll('.header_part')]
        headerParts.forEach((header) => {

            const lang = select('html').getAttribute('lang') 
            if(lang == "fr") {
                header.querySelector('.lang_fr').classList.add('select')
                header.querySelector('.lang_en').classList.remove('select')
            } else {
                header.querySelector('.lang_fr').classList.remove('select') 
                header.querySelector('.lang_en').classList.add('select')
            }

        })

    }

    reload(e) {
        setTimeout(() => {
            document.location = "https://geniusloci-experience.com/reservations";
        }, 200);
    }
}
export default Nav;
