import { css } from "lit-element";

export const statisticsDataStyles = css`
:host {
    display: block;
    --line-height-number: var(--line-height-l, 4.125rem); /* 66px */
    --line-height-text: 1.563rem; /* 28px */
    --font-size-number: var(--font-size-xl, 3rem); /* 48px */
    --font-size-text: var(--base-font-size, 1.125rem); /* 18px */
    --border-color: var(--main-color, #000000);
    --component-color: var(--dark-grey, #000000);
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
    margin: 0;
    font-size: var(--font-size-number);
    line-height: var(--line-height-number);
    color: var(--component-color);
}
.statistics__content-text {
    margin: 0;
    padding-top: 15px;
    border-top: 4px solid var(--border-color);
    font-size: var(--font-size-text);
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
    .statistics__content:last-child {
        margin-right: 0px;
    }
}
`;