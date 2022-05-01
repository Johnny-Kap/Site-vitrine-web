/**
* Template Name: Tempo - v4.7.0
* Template URL: https://bootstrapmade.com/tempo-free-onepage-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

})()

/**
 * Permet de rajouter la navigation tactile pour le carousel
 */
 class CarouselTouchPlugin {
 
  /**
   * @param {Carousel} carousel
   */
  constructor(carousel) {
      carousel.container.addEventListener('dragstart', e => e.preventDefault())
      carousel.container.addEventListener('mousedown', this.startDrag.bind(this))
      carousel.container.addEventListener('touchstart', this.startDrag.bind(this))
      window.addEventListener('mousemove', this.drag.bind(this))
      window.addEventListener('touchmove', this.drag.bind(this))
      window.addEventListener('touchend', this.endDrag.bind(this))
      window.addEventListener('mouseup', this.endDrag.bind(this))
      window.addEventListener('touchcancel', this.endDrag.bind(this))
      this.carousel = carousel
  }

  /**
   * Démarre le déplacement au touché
   * @param {MouseEvent|TouchEvent} e
   */
  startDrag(e) {
      if (e.touches) {
          if (e.touches.length > 1) {
              return
          } else {
              e = e.touches[0]
          }
      }
      this.origin = { x: e.screenX, y: e.screenY }
      this.width = this.carousel.containerWidth
      this.carousel.disableTransition()
  }

  /**
   * Déplacement
   * @param {MouseEvent|TouchEvent} e
   */
  drag(e) {
      if (this.origin) {
          let point = e.touches ? e.touches[0] : e
          let translate = { x: point.screenX - this.origin.x, y: point.screenY - this.origin.y }
          if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
              e.preventDefault()
              e.stopPropagation()
          }
          let baseTranslate = this.carousel.currentItem * -100 / this.carousel.items.length
          this.lastTranslate = translate
          this.carousel.translate(baseTranslate + 100 * translate.x / this.width)
      }
  }

  /**
   * Fin du déplacement
   * @param {MouseEvent|TouchEvent} e
   */
  endDrag(e) {
      if (this.origin && this.lastTranslate) {
          this.carousel.enableTransition()
          if (Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2) {
              if (this.lastTranslate.x < 0) {
                  this.carousel.next()
              } else {
                  this.carousel.prev()
              }
          } else {
              this.carousel.gotoItem(this.carousel.currentItem)
          }
      }
      this.origin = null
  }


}

class Carousel {
  /**
   * This callback type is called `requestCallback` and is displayed as a global symbol.
   *
   * @callback moveCallback
   * @param {number} index
   */

  /**
   * @param {HTMLElement} element
   * @param {Object} options
   * @param {Object} [options.slidesToScroll=1] Nombre d'éléments à faire défiler
   * @param {Object} [options.slidesVisible=1] Nombre d'éléments visible dans un slide
   * @param {boolean} [options.loop=false] Doit-t-on boucler en fin de carousel
   * @param {boolean} [options.infinite=false]
   * @param {boolean} [options.pagination=false]
   * @param {boolean} [options.navigation=true]
   */
  constructor(element, options = {}) {
      this.element = element
      this.options = Object.assign({}, {
          slidesToScroll: 1,
          slidesVisible: 1,
          loop: false,
          pagination: false,
          navigation: true,
          infinite: false
      }, options)
      if (this.options.loop && this.options.infinite) {
          throw new Error('Un carousel ne peut être à la fois en boucle et en infinie')
      }
      let children = [].slice.call(element.children)
      this.isMobile = false
      this.currentItem = 0
      this.moveCallbacks = []
      this.offset = 0

      // Modification du DOM
      this.root = this.createDivWithClass('carousel')
      this.container = this.createDivWithClass('carousel__container')
      this.root.setAttribute('tabindex', '0')
      this.root.appendChild(this.container)
      this.element.appendChild(this.root)
      this.items = children.map((child) => {
          let item = this.createDivWithClass('carousel__item')
          item.appendChild(child)
          return item
      })
      if (this.options.infinite) {
          this.offset = this.options.slidesVisible + this.options.slidesToScroll
          if (this.offset > children.length) {
              console.error("Vous n'avez pas assez d'élément dans le carousel", element)
          }
          this.items = [
              ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
              ...this.items,
              ...this.items.slice(0, this.offset).map(item => item.cloneNode(true)),
          ]
          this.gotoItem(this.offset, false)
      }
      this.items.forEach(item => this.container.appendChild(item))
      this.setStyle()
      if (this.options.navigation) {
          this.createNavigation()
      }
      if (this.options.pagination) {
          this.createPagination()
      }

      // Evenements
      this.moveCallbacks.forEach(cb => cb(this.currentItem))
      this.onWindowResize()
      window.addEventListener('resize', this.onWindowResize.bind(this))
      this.root.addEventListener('keyup', e => {
          if (e.key === 'ArrowRight' || e.key === 'Right') {
              this.next()
          } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
              this.prev()
          }
      })
      if (this.options.infinite) {
          this.container.addEventListener('transitionend', this.resetInfinite.bind(this))
      }
      new CarouselTouchPlugin(this)
  }

  /**
   * Applique les bonnes dimensions aux éléments du carousel
   */
  setStyle() {
      let ratio = this.items.length / this.slidesVisible
      this.container.style.width = (ratio * 100) + "%"
      this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
  }

  /**
   * Crée les flêches de navigation dans le DOM
   */
  createNavigation() {
      let nextButton = this.createDivWithClass('carousel__next')
      let prevButton = this.createDivWithClass('carousel__prev')
      this.root.appendChild(nextButton)
      this.root.appendChild(prevButton)
      nextButton.addEventListener('click', this.next.bind(this))
      prevButton.addEventListener('click', this.prev.bind(this))
      if (this.options.loop === true) {
          return
      }
      this.onMove(index => {
          if (index === 0) {
              prevButton.classList.add('carousel__prev--hidden')
          } else {
              prevButton.classList.remove('carousel__prev--hidden')
          }
          if (this.items[this.currentItem + this.slidesVisible] === undefined) {
              nextButton.classList.add('carousel__next--hidden')
          } else {
              nextButton.classList.remove('carousel__next--hidden')
          }
      })
  }

  /**
   * Crée la pagination dans le DOM
   */
  createPagination() {
      let pagination = this.createDivWithClass('carousel__pagination')
      let buttons = []
      this.root.appendChild(pagination)
      for (let i = 0; i < (this.items.length - 2 * this.offset); i = i + this.options.slidesToScroll) {
          let button = this.createDivWithClass('carousel__pagination__button')
          button.addEventListener('click', () => this.gotoItem(i + this.offset))
          pagination.appendChild(button)
          buttons.push(button)
      }
      this.onMove(index => {
          let count = this.items.length - 2 * this.offset
          let activeButton = buttons[Math.floor(((index - this.offset) % count) / this.options.slidesToScroll)]
          if (activeButton) {
              buttons.forEach(button => button.classList.remove('carousel__pagination__button--active'))
              activeButton.classList.add('carousel__pagination__button--active')
          }
      })
  }

  translate(percent) {
      this.container.style.transform = 'translate3d(' + percent + '%, 0, 0)'
  }

  /**
   *
   */
  next() {
      this.gotoItem(this.currentItem + this.slidesToScroll)
  }

  prev() {
      this.gotoItem(this.currentItem - this.slidesToScroll)
  }

  /**
   * Déplace le carousel vers l'élément ciblé
   * @param {number} index
   * @param {boolean} [animation = true]
   */
  gotoItem(index, animation = true) {
      if (index < 0) {
          if (this.options.loop) {
              index = this.items.length - this.slidesVisible
          } else {
              return
          }
      } else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)) {
          if (this.options.loop) {
              index = 0
          } else {
              return
          }
      }
      let translateX = index * -100 / this.items.length
      if (animation === false) {
          this.disableTransition()
      }
      this.translate(translateX)
      this.container.offsetHeight // force repaint
      if (animation === false) {
          this.enableTransition()
      }
      this.currentItem = index
      this.moveCallbacks.forEach(cb => cb(index))
  }

  /**
   * Déplace le container pour donner l'impression d'un slide infini
   */
  resetInfinite() {
      if (this.currentItem <= this.options.slidesToScroll) {
          this.gotoItem(this.currentItem + (this.items.length - 2 * this.offset), false)
      } else if (this.currentItem >= this.items.length - this.offset) {
          this.gotoItem(this.currentItem - (this.items.length - 2 * this.offset), false)
      }
  }

  /**
   * Rajoute un écouteur qui écoute le déplacement du carousel
   * @param {moveCallback} cb
   */
  onMove(cb) {
      this.moveCallbacks.push(cb)
  }

  /**
   * Ecouteur pour le redimensionnement de la fenêtre
   */
  onWindowResize() {
      let mobile = window.innerWidth < 800
      if (mobile !== this.isMobile) {
          this.isMobile = mobile
          this.setStyle()
          this.moveCallbacks.forEach(cb => cb(this.currentItem))
      }
  }

  /**
   * Helper pour créer une div avec une classe
   * @param {string} className
   * @returns {HTMLElement}
   */
  createDivWithClass(className) {
      let div = document.createElement('div')
      div.setAttribute('class', className)
      return div
  }

  disableTransition() {
      this.container.style.transition = 'none'
  }

  enableTransition() {
      this.container.style.transition = ''
  }

  /**
   * @returns {number}
   */
  get slidesToScroll() {
      return this.isMobile ? 1 : this.options.slidesToScroll
  }

  /**
   * @returns {number}
   */
  get slidesVisible() {
      return this.isMobile ? 1 : this.options.slidesVisible
  }

  /**
   * @returns {number}
   */
  get containerWidth() {
      return this.container.offsetWidth
  }

  /**
   * @returns {number}
   */
  get carouselWidth() {
      return this.root.offsetWidth
  }

}

let onReady = function() {

  new Carousel(document.querySelector('#carousel'), {
      slidesVisible: 3,
      slidesToScroll: 3,
      infinite: true,
      pagination: true
  })
}

if (document.readyState !== 'loading') {
  onReady()
}
document.addEventListener('DOMContentLoaded', onReady)