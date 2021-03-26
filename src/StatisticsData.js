import { LitElement, html } from "lit-element";
import { statisticsDataStyles } from "./Statistics-Data-Styles";
import { HTMLChildrenMixin } from "./lib/HTMLChildrenMixin";



export class StatisticsData extends HTMLChildrenMixin(LitElement) {
  static get is() {
    return "statistics-data";
    }

  static get styles() {
    return [statisticsDataStyles];
    } 

  static get properties() {
    return {
      /**
      * Array of the properties to be displayed
      * @property
      * @type {Array}
      */
       statistics: {
        type: Array,
      },
      /**
       * Animation to view stats with counter effect
       * @property
       * @type {Boolean}
       */
       animation: {
        type: Boolean,
      },
      /**
       * the stat rises to position 
       * @property
       * @type {Boolean}
       */
       scrollPage: {
        type: Boolean,
      },
    }
    }

  constructor(){
    super();
    this.statistics = [];
    this.animation= false;
    this.scrollPage=false;
    this.getPageScroll = this.getPageScroll.bind(this);
    }

  async connectedCallback() {
    super.connectedCallback();
    this.statistics = this._HTMLChildren();
    window.onload = () => {
      if(this.animation) { this.loadAnimation() }
      if(this.scrollPage) { window.addEventListener('scroll',this.getPageScroll);}
    }
    
  }

  getPageScroll() {
    const elementeContainerPosition = this.shadowRoot.querySelector('#statistics').offsetTop;
    const animateElment = [ ...this.shadowRoot.querySelectorAll('.statistics__content') ];
    this.pageScroll = window.pageYOffset;
    if (this.pageScroll > elementeContainerPosition - 800) {
      animateElment.forEach((item, i) => {
        this.addAnimationDelay(item, i);
      });
    }
  }



  
  addAnimationDelay(item, i) {
    setTimeout(() => {
      item.classList.add('statistics__animate');
    }, i * 200);
    if(this.scrollPage || this.animation && this.scrollPage) {
      if(this.animation){this.loadAnimation()}
      window.removeEventListener('scroll', this.getPageScroll);}
  }

  loadAnimation () {
    const animationOnFocus = this.shadowRoot.querySelector('.statistics');
    const stats = this.shadowRoot.querySelectorAll('#number');
    function animatedStats() {
      
      stats.forEach((stat) => {
        const patt = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
        let result = [...patt.exec(stat.getAttribute('data-target'))];
        result.shift();
        result = result.filter((res) => res != null);
        while (stat.firstChild) {
          stat.removeChild(stat.firstChild);
        }
        for (const res of result) {
          if (isNaN(res)) {
            stat.insertAdjacentHTML('beforeend', `<span>${res}</span>`);
          } else {
            for (let i = 0; i < res.length; i++) {
              stat.insertAdjacentHTML(
                'beforeend',
                `<span data-value="${res[i]}"><span>&ndash;</span>${Array(parseInt(res[i]) + 1).join(0).split(0).map((x, j) => `
                  <span>${j}</span>`)
                  .join('')}</span>`,
              );
            }
          }
        }
  
        const ticks = [...stat.querySelectorAll('span[data-value]')];
  
        const activate = () => {
          setTimeout(() => {
            for (const tick of ticks) {
              const dist = parseInt(tick.getAttribute('data-value')) + 1;
              tick.style.transform = `translateY(-${dist * 100}%)`;
            }
          }, 500);
        };
        activate();
      });
     }
  
    const options = {
      threshold: 0.8,
    };
    /* eslint-disable-next-line */
    function callBack(entries, observer) {
      if (entries[0].isIntersecting) {
        animatedStats();
        observer.unobserve(entries[0].target);
      }
    }
  
    const observerImages = new IntersectionObserver(callBack, options);
    observerImages.observe(animationOnFocus);

    
   
  }


  animatedStats() {
    const stats = this.shadowRoot.querySelectorAll('#number');
    stats.forEach((stat) => {
      const patt = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
      let result = [...patt.exec(stat.getAttribute('data-target'))];
      result.shift();
      result = result.filter((res) => res != null);
      while (stat.firstChild) {
        stat.removeChild(stat.firstChild);
      }
      for (const res of result) {
        if (isNaN(res)) {
          stat.insertAdjacentHTML('beforeend', `<span>${res}</span>`);
        } else {
          for (let i = 0; i < res.length; i++) {
            stat.insertAdjacentHTML(
              'beforeend',
              `<span data-value="${res[i]}"><span>&ndash;</span>${Array(parseInt(res[i]) + 1).join(0).split(0).map((x, j) => `
                <span>${j}</span>`)
                .join('')}</span>`,
            );
          }
        }
      }

      const ticks = [...stat.querySelectorAll('span[data-value]')];

      const activate = () => {
        setTimeout(() => {
          for (const tick of ticks) {
            const dist = parseInt(tick.getAttribute('data-value')) + 1;
            tick.style.transform = `translateY(-${dist * 100}%)`;
          }
        }, 500);
      };
      activate();
    });
   }


    render() {
        if (this.statistics) {
              return html`
                <div id="statistics" class="statistics">
                  ${this.statistics.map((statistic) => html`
                    <div class="statistics__content">
                      <p id="number" class="statistics__content-number" 
                      part="stats-number" data-target="${statistic.number}">${statistic.number}</p>
                      <p class="statistics__content-text" part="stats-text"><span>${statistic.infoTitle}</span>${statistic.description}</p>
                    </div>
                  `)}
                </div>
              `;
            }
        return html``;
  }

}
