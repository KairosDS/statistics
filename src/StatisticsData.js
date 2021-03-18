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
    }
    }

  constructor(){
    super();
    this.statistics = [];
    }

  async connectedCallback() {
    super.connectedCallback();
    this.statistics = this._HTMLChildren();
    console.log('statictics', this.statistics);
  }


    render() {
        if (this.statistics) {
              return html`
                <div class="statistics">
                  ${this.statistics.map((statistic) => html`
                    <div class="statistics__content">
                      <p class="statistics__content-number">${statistic.number}</p>
                      <p class="statistics__content-text">${statistic.infoTitle}<span>${statistic.description}</span></p>
                    </div>
                  `)}
                </div>
              `;
            }
        return html``;
  }

}
