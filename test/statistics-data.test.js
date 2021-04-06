import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import "../statistics-data";


describe("Statistics-data", () => {
    it("should have the basic template", async () => {
          const el = await fixture(
          html`
            <statistics-data>
                <div>
                    <p id="number" >67.7%</p>
                    <p id="infoTitle" > JavaScript :</p>
                    <span id="description"> often abbreviated as JS, is a programming language that conforms to the ECMAScript specification</span>
                </div>
                <div>
                    <p id="number" >63.1%</p>
                    <p id="infoTitle" >HTML/CSS :</p>
                    <span id="description"> HTML is the standard markup language for documents designed to be displayed in a web browser and CSS is a style sheet language used for describing the presentation of a document written</span>
                </div>
                <div>
                    <p id="number" >54.7%</p>
                    <p id="infoTitle" >SQL :</p>
                    <span id="description"> Structured Query Language is a domain-specific language used in programming and designed </span>
                </div>
                <div>
                    <p id="number" >44.1%</p>
                    <p id="infoTitle" >Python :</p>
                    <span id="description"> is an interpreted, high-level and general-purpose programming language</span>
                </div>
        </statistics-data>
          `
          );

    const base = el.shadowRoot.querySelector('.statistics');

    expect(base).not.to.be.null;
    });

    it("should have the template with property", async () => {
        const el = await fixture(
        html`
          <statistics-data animation="true">
              <div>
                  <p id="number" >67.7%</p>
                  <p id="infoTitle" > JavaScript :</p>
                  <span id="description"> often abbreviated as JS, is a programming language that conforms to the ECMAScript specification</span>
              </div>
              <div>
                  <p id="number" >63.1%</p>
                  <p id="infoTitle" >HTML/CSS :</p>
                  <span id="description"> HTML is the standard markup language for documents designed to be displayed in a web browser and CSS is a style sheet language used for describing the presentation of a document written</span>
              </div>
              <div>
                  <p id="number" >54.7%</p>
                  <p id="infoTitle" >SQL :</p>
                  <span id="description"> Structured Query Language is a domain-specific language used in programming and designed </span>
              </div>
              <div>
                  <p id="number" >44.1%</p>
                  <p id="infoTitle" >Python :</p>
                  <span id="description"> is an interpreted, high-level and general-purpose programming language</span>
              </div>
      </statistics-data>
        `
        );

        const base = el.shadowRoot.querySelector('.statistics');

        expect(base).not.to.be.null;
        });

    it("Should is active loadAnimation", async () => {
        window.innerWidth = 372;
        const el = await fixture(
        html`
          <statistics-data animation="true">
              <div>
                  <p id="number" >67.7%</p>
                  <p id="infoTitle" > JavaScript :</p>
                  <span id="description"> often abbreviated as JS, is a programming language that conforms to the ECMAScript specification</span>
              </div>
              <div>
                  <p id="number" >63.1%</p>
                  <p id="infoTitle" >HTML/CSS :</p>
                  <span id="description"> HTML is the standard markup language for documents designed to be displayed in a web browser and CSS is a style sheet language used for describing the presentation of a document written</span>
              </div>
              <div>
                  <p id="number" >54.7%</p>
                  <p id="infoTitle" >SQL :</p>
                  <span id="description"> Structured Query Language is a domain-specific language used in programming and designed </span>
              </div>
              <div>
                  <p id="number" >44.1%</p>
                  <p id="infoTitle" >Python :</p>
                  <span id="description"> is an interpreted, high-level and general-purpose programming language</span>
              </div>
      </statistics-data>
        `
        );

        const spy = sinon.spy();
        el.loadAnimationStats();
        const stat = el.shadowRoot.querySelector('p[id=number-1]');

        expect(spy.called)
        expect(stat.dataset.target).to.equal('67.7%');
    


    });


    it("Should is active moveStatOnFocus", async () => {
        const el = await fixture(
        html`
          <statistics-data  moveStats="true">
              <div>
                  <p id="number" >67.7%</p>
                  <p id="infoTitle" > JavaScript :</p>
                  <span id="description"> often abbreviated as JS, is a programming language that conforms to the ECMAScript specification</span>
              </div>
              <div>
                  <p id="number" >63.1%</p>
                  <p id="infoTitle" >HTML/CSS :</p>
                  <span id="description"> HTML is the standard markup language for documents designed to be displayed in a web browser and CSS is a style sheet language used for describing the presentation of a document written</span>
              </div>
              <div>
                  <p id="number" >54.7%</p>
                  <p id="infoTitle" >SQL :</p>
                  <span id="description"> Structured Query Language is a domain-specific language used in programming and designed </span>
              </div>
              <div>
                  <p id="number" >44.1%</p>
                  <p id="infoTitle" >Python :</p>
                  <span id="description"> is an interpreted, high-level and general-purpose programming language</span>
              </div>
      </statistics-data>
        `
        );

        const spy = sinon.spy();
        el.moveStatOnFocus(); 
        expect(spy.called)

    });

    it("Should is active combined properties", async () => {

        const el = await fixture(
        html`
          <statistics-data animation="true" moveStats="true">
              <div>
                  <p id="number" >67.7%</p>
                  <p id="infoTitle" > JavaScript :</p>
                  <span id="description"> often abbreviated as JS, is a programming language that conforms to the ECMAScript specification</span>
              </div>
              <div>
                  <p id="number" >63.1%</p>
                  <p id="infoTitle" >HTML/CSS :</p>
                  <span id="description"> HTML is the standard markup language for documents designed to be displayed in a web browser and CSS is a style sheet language used for describing the presentation of a document written</span>
              </div>
              <div>
                  <p id="number" >54.7%</p>
                  <p id="infoTitle" >SQL :</p>
                  <span id="description"> Structured Query Language is a domain-specific language used in programming and designed </span>
              </div>
              <div>
                  <p id="number" >44.1%</p>
                  <p id="infoTitle" >Python :</p>
                  <span id="description"> is an interpreted, high-level and general-purpose programming language</span>
              </div>
      </statistics-data>
        `
        );

        const spy = sinon.spy();
        el.moveStatOnFocus();
        el.loadAnimationStats() 
        expect(spy.called)
        const stat = el.shadowRoot.querySelector('#number-4');
        expect(stat.dataset.target).to.equal('44.1%');

    });
    
});