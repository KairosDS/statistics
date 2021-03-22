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
    }
    }

  constructor(){
    super();
    this.statistics = [];
    this.animation= false;
    }

  async connectedCallback() {
    super.connectedCallback();
    this.statistics = this._HTMLChildren();
    window.onload = () => {
      if(this.animation) {this.animatedStats();}
    }
  }



  animatedStats() {
    const stats = this.shadowRoot.querySelectorAll('#number');
    console.log('stats', stats)
    stats.forEach((stat) => {
      const patt = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
      let result = [...patt.exec(stat.getAttribute('data-target'))];
      result.shift();
      result = result.filter((res) => res != null);
      while (stat.firstChild) {
        stat.removeChild(stat.firstChild);
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const res of result) {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(res)) {
          stat.insertAdjacentHTML('beforeend', `<span>${res}</span>`);
        } else {
          // eslint-disable-next-line no-restricted-syntax
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
          // eslint-disable-next-line no-restricted-syntax
          for (const tick of ticks) {
            // eslint-disable-next-line radix
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
                <div class="statistics">
                  ${this.statistics.map((statistic) => html`
                    <div class="statistics__content">
                      <p id="number" class="statistics__content-number" 
                      part="stats-number" data-target="${statistic.number}">${this.animation ? null : statistic.number}</p>
                      <p class="statistics__content-text" part="stats-text"><span>${statistic.infoTitle}</span>${statistic.description}</p>
                    </div>
                  `)}
                </div>
              `;
            }
        return html``;
  }

}
