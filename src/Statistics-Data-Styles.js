import { css } from "lit-element";

export const statisticsDataStyles = css`
:host {
    display: block;
    --line-height-number: var(--line-height, 4.125rem); /* 66px */
    --line-height-text: var( --line-height-text, 1.563rem); /* 28px */
    --font-size-number: var(--font-size, 3rem); /* 48px */
    --font-size-text: var(--base-font-size, 1.125rem); /* 18px */
    --border-color: var(--main-color, #000000);
    --component-color: var(--base-color, #000000);
}
.statistics {
    display: flex;
    flex-direction: column;
    margin: 43px 0px 83px 0px;
}
.statistics__content {
    margin-bottom: 40px;
    margin-left: 10px;
}

.statistics__content-number {
    margin: 20px 0px;
    line-height: var(--line-height-number);
    color: var(--component-color);
    display: flex;
    font-size: var(--font-size-number);
    overflow: hidden;
    align-items: center;
    height: 4.125rem;
}

.statistics__content-number > span {
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 2s ease;
    transform: translateY(0);
  }
.statistics__content-number > span span {
    flex: 0 0 100%;
    height: 100%;
}

.statistics__content-text {
    margin: 0;
    padding-top: 15px;
    border-top: 4px solid var(--border-color);
    line-height: var(--line-height-text);
    letter-spacing: 1px;
    color: var(--component-color);
}
.statistics__content-text span {
    font-weight: bold;
}


@media all and (min-width: 768px) {
    .statistics {
        flex-direction: row;
        justify-content: space-between;
    }
    .statistics__content {
        margin-right: 30px;
        flex-grow: 1;
        flex-basis: 0;
    }

    .statistics__content_hidden {
        opacity: 0;
    }
    
    .statistics__animate {
        opacity: 1;
        animation: scaleMove 2s;
        transition-property: opacity;
        transition-duration: 2s ;
        transition-timing-function: ease-in-out;
    }
    @keyframes scaleMove {
        0% {
            transform: translateY(400px)
        }
        100% {
            transform: translateY(0)
        }
    }

    .stats__animate_number {
        opacity: 1;
    }
   
    .statistics__content:last-child {
        margin-right: 0px;
    }
}
`;