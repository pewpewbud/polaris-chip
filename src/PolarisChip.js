import { LitElement, html, css } from 'lit';

export class PolarisChip extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      tile: { type: String },
      backgroundImage: { type: String },
      link: { type: String },
      clickable: { type: Boolean },
      multiline: { type: Boolean, reflect: true },
      additionalText: { type: String },
      buttonBottom: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      :host([buttonBottom]) .button {
        position: absolute;
        bottom: 15px;
        right: 15px;
        width: 24px;
        height: 24px;
        background-image: url('https://static-00.iconduck.com/assets.00/external-link-icon-2048x2048-wo7lfgrz.png');
        background-size: cover;
        transition: transform 0.2s;
      }

      .tile.white-on-picture:hover .button {
        transform: scale(1.3);
      }

      .tile.clickable:hover {
        cursor: pointer;
      }

      .tile {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 281px;
        width: 336px;
        font-family: Roboto, 'Franklin Gothic Medium', Tahoma, sans-serif;
        font-size: 32px;
        color: white;
        box-shadow: rgba(0, 3, 33, 0.1) 0px 8px 16px 0px;
        position: relative;
      }
      .splitspacer {
        width: 242px;
        margin: auto;
      }
      .split-line {
        margin: 0 0 16px 0;
        border: 16px;
        height: 3px;
        background-color: rgb(0, 30, 68);
      }
      .additionalText {
        font-family: Tahoma;
        display: block;
        color: rgb(0, 30, 68);
        font-size: 18px;
        font-weight: normal;
        margin: 0 0 20px 0;
        border: 0;
        padding: 0 47px;
      }
      .name {
        margin: 0 0 16px 0;
        border: 0;
        padding: 0 47px;
        margin-bottom: 18px;
      }
      .white-on-navy {
        background-color: rgb(0, 30, 68);
      }
      .white-on-blue {
        background-color: rgb(30, 64, 124);
      }
      .white-on-gradient-blue {
        background-color: rgba(0, 0, 0, 0);
        background-image: linear-gradient(rgb(30, 64, 124) 0%, rgb(0, 30, 68) 65%, rgb(0, 30, 68) 100%);
      }
      .white-on-picture {
        background-blend-mode: multiply;
        background-color: rgba(0, 3, 33, 0.5);
        background-position: 50% 50%;
        background-size: cover;
      }
      .navy-on-white {
        background-color: rgb(255, 255, 255);
        color: rgb(0, 30, 68);
      }
    `;
  }

  constructor() {
    super();
    this.name = "default";
    this.backgroundImage = '';
    this.link = '';
    this.clickable = false;
    this.additionalText = "default";
    this.multiline = false;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.clickable) {
      this.addEventListener('click', () => {
        if (this.link) {
          window.open(this.link, '_blank');
        }
      });
    }
  }

  render() {
    return html`
      <div class="tile ${this.tile} ${this.multiline ? '' : this.clickable ? 'clickable' : ''}">
        ${this.multiline
          ? html`
            <div class="content">
              <div class="name">
                ${this.name}
              </div>
              <div class="splitspacer">
                <hr class="split-line" />
              </div>
              <div class="additionalText">
                ${this.additionalText}
              </div>
            </div>`
          : html`
            <div class="name">
              ${this.name}
            </div>
            <div class="button"></div>`
        }
        ${this.tile === 'white-on-picture' ? html`
          <style>
            .tile.white-on-picture {
              background-image: url(${this.backgroundImage});
            }
          </style>` : ''}
      </div>
    `;
  }
}

customElements.define('polaris-chip', PolarisChip);
