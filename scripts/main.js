document.addEventListener('DOMContentLoaded', function () {

  const main = new Main();

  // const hero = new HeroSlider('.swiper');
  // hero.start({ delay: 2000 });

  // setTimeout(() => {
  //   hero.stop();
  // }, 5000);

  // const cb = function (el, isIntersecting) {
  //   if (isIntersecting) {

  //     const ta = new TweenTextAnimation(el);
  //     ta.animate();
  //   }
  // }

  // const so = new ScrollObserver('.tween-animate-title', cb);

  // const _inviewAnimation = function (el, inview) {
  //   if (inview) {
  //     el.classList.add('inview');
  //   } else {
  //     el.classList.remove('inview');
  //   }
  // }


  // const so2 = new ScrollObserver('.cover-slide', _inviewAnimation);


  // const header = document.querySelector('.header');

  // const _navAnimation = function (el, inview) {
  //   if (inview) {
  //     header.classList.remove('triggered');
  //   } else {
  //     header.classList.add('triggered');
  //   }
  // }


  // const so3 = new ScrollObserver('.nav-trigger', _navAnimation, { once: false });




});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this.sides = document.querySelectorAll('.side');
    this._observers = [];
    this._init();
  }

  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _init() {
    new MobileMenu();
    this.hero = new HeroSlider('.swiper');
    Pace.on('done', this._paceDone.bind(this));
    // this._scrollInit();
  }

  _paceDone() {
    this._scrollInit();
  }

  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  }

  _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove('triggered');
    } else {
      this.header.classList.add('triggered');
    }
  }

  _sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach(side => side.classList.add('inview'));
    } else {
      this.sides.forEach(side => side.classList.remove('inview'));
    }
  }


  _textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _destroyObservers() {
    this.observers.forEach(ob => {
      ob.destroy();
    });
  }

  destroy() {
    this._destroyObservers();
  }


  _scrollInit() {
    this.observers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), { once: false });
    this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);


    // this._observers.push(
    //   new ScrollObserver('.cover-slide', this._inviewAnimation)
    // );

    this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation);


    this.observers = new ScrollObserver('.swiper', this._toggleSlideAnimation.bind(this), { once: false, rootMargin: "-200px 0px" });
    this.observers = new ScrollObserver('.appear', this._inviewAnimation);
    this.observers = new ScrollObserver('#main-content', this._sideAnimation.bind(this), { once: false, rootMargin: "-300px 0px" });



  }
}
