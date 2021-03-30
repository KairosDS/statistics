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
        attribute: 'animation',
      },
      /**
       * the stat move up when viewport is on focus position 
       * @property
       * @type {Boolean}
       */
       moveStats: {
        type: Boolean,
        attribute: 'move-stats',
      },
    }
    }

  constructor(){
    super();
    this.statistics = [];
    this.animation = false;
    this.moveStats = false;
    }

  async connectedCallback() {
    super.connectedCallback();
    this.statistics = this._HTMLChildren();
    window.onload = () => {
      if(this.animation) { this.loadAnimationStats()};
      if(this.moveStats) {this.moveStatOnFocus()};
    }
  }


  loadAnimationStats () {
    const animationOnFocus = this.shadowRoot.querySelector('.statistics');
    const stats = this.shadowRoot.querySelectorAll('.statistics__content-number');
    stats.forEach((item) => item.classList.add('statistics__content_hidden'));

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
      
      threshold: window.innerWidth <  415 ? 0.2 : 0.8,

    };

    function callBack(entries, observer) {
      if (entries[0].isIntersecting) {
        stats.forEach((item) => item.classList.remove('statistics__content_hidden'));
        animatedStats();
        observer.unobserve(entries[0].target);
      }
    }
  
    const observerStats = new IntersectionObserver(callBack, options);
    observerStats.observe(animationOnFocus);

  }

  moveStatOnFocus() {
    const elementeContainerPosition = this.shadowRoot.querySelector('#statistics')
    const animateElment = [ ...this.shadowRoot.querySelectorAll('.statistics__content')];
    animateElment.forEach((item) => item.classList.add('statistics__content_hidden'));

    function addAnimationDelay(item, i) {
        setTimeout(() => {
          item.classList.add('statistics__animate');
        }, i * 200);
      }
    const options = {
        threshold: 0.8,
      };

    function callBack(entries, observer) {
        if (entries[0].isIntersecting) {
          animateElment.forEach((item, i) => {
            addAnimationDelay(item, i);
          if( this.animation && this.moveStats) {
            this.loadAnimationStats()
            }
          });
        }
      }
  
    const observerStats = new IntersectionObserver(callBack, options);
    observerStats.observe(elementeContainerPosition);

  }


  render() {
        if (this.statistics) {
              return html`
                <div id="statistics" class="statistics">
                  ${this.statistics.map((statistic, index) => html`
                    <div class="statistics__content">
                      <p id="number-${index + 1}" class="statistics__content-number" 
                      part="stats-number" data-target="${statistic.number}">${window.innerWidth <  415 && this.animation ? '' : statistic.number }</p>
                      <p class="statistics__content-text" part="stats-text">
                        <span>${statistic.infoTitle}</span>${statistic.description}</p>
                    </div>
                  `)}
                </div>
              `;
            }
        return html``;
  }

}
