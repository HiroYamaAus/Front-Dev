class ScrollObserver {
  constructor(els, cb, options) {//コンストラクターの中にはthisのプロパティに値を設定し格納 複雑な処理は外に出す
    this.els = document.querySelectorAll(els);
    const defaultOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
      once: true
    };
    this.cb = cb;
    this.options = Object.assign(defaultOptions, options);
    this.once = this.options.once;
    this._init();
  }

  _init() {//初期化処理
    const callback = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.cb(entry.target, true);//ここのthisはScrollObserverのthis 監視しているDOM交差しているかいないか　true false
          if (this.once) {
            observer.unobserve(entry.target);
          }
        } else {
          this.cb(entry.target, false);
        }
      });
    };

    this.io = new IntersectionObserver(callback.bind(this), this.options);
    this.io.POLL_INTERVAL = 100;
    this.els.forEach(el => this.io.observe(el));


  }

  destroy() {
    this.io.disconnect();
  }

}
