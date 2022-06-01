import config from '@/config'
export default (w) => {
    w < 800 || document.querySelector('html').classList.contains('mobile')
        ? config.isSmall = true
        : config.isSmall = false

    w < 800
        ? config.isOne = true
        : config.isOne = false

    w < 1000
        ? config.isTwo = true
        : config.isTwo = false

    document.querySelector('html').classList.contains('mobile') || document.querySelector('html').classList.contains('tablet')
        ? config.isTouch = true
        : config.isTouch = false

    document.querySelector('.pass')
    ? config.pass = true
    : config.pass = false

    console.log(document.querySelector('.pass'))

    return config.isTwo
}