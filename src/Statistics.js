import { LitElement, html } from "lit-element";
import { statisticsStyles } from "./Statistics-styles";
import { HTMLChildrenMixin } from "./lib/HTMLChildrenMixin";



export class Statistics extends HTMLChildrenMixin(LitElement) {
  static get is() {
    return "statistics";
    }

  static get styles() {
    return [statisticsStyles];
    } 

  static get properties() {
    return {

    }
    }

  constructor(){

    }


    render() {
        return html`

        `;
    }

}
