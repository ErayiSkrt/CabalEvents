import { MainView } from "../../MainView";

export class AddCharPopup {
  protected title: string;
  protected background: HTMLDivElement;
  protected _done: any;
  protected view: HTMLDivElement;
  protected buttonTxt: string;
  protected overlay: HTMLDivElement;
  protected url: string;
  protected option: string;
  constructor(
    titleText: string,
    view: HTMLDivElement,
    buttonText: string,
    url: string,
    done: () => void,
    option: string
  ) {
    this.title = titleText;
    this.view = view;
    this.buttonTxt = buttonText;
    this.url = url;
    this._done = done;
    this.option = option;
    this.background = document.createElement("div");
    this.background.id = "popupBackground";
    this.overlay = document.createElement("div");
    this.overlay.id = "overLay";
    this.overlay.appendChild(this.background);
    this.view.appendChild(this.overlay);
    this.addElements();
    this.close();
  }

  protected addElements(): void {
    const title = document.createElement("div");
    title.id = "popUpTitle";
    title.innerHTML = this.title;
    this.background.appendChild(title);
    const inputDiv = document.createElement("div");
    const input = document.createElement("input");
    input.id = "popupInput";
    //TODO set input so that no special caracters are allowed!{
    inputDiv.appendChild(input);
    this.background.appendChild(inputDiv);
    const button = document.createElement("div");
    button.id = "confirm";
    button.innerHTML = this.buttonTxt;
    this.background.appendChild(button);
    let clicked = false;
    let time: number;
    let elapsed: number;
    button.addEventListener("pointerup", () => {
      if (input.value == "") {
        alert("invalid Character Name");
        return;
      }
      if (clicked) {
        return;
      }
      clicked = true;
      const url: string =
        "https://firstservice-emyq.onrender.com/" /*"http://127.0.0.1:5000/"*/ +
        this.url +
        "/" +
        input.value;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          alert(data["0"]);
          if (data["1"] && data["1"] == this.option) {
            if (this._done) {
              this._done();
              this._done = null;
            }
            this.removeAllChildren();
          } else {
            clicked = false;
          }
        });
    });
  }

  protected close(): void {
    const button = document.createElement("div");
    button.id = "closeButton";
    button.innerHTML = "X";
    let clicked = false;
    button.addEventListener("pointerup", () => {
      if (!clicked) {
        clicked = true;
        this.removeAllChildren();
      }
    });
    this.background.appendChild(button);
  }

  protected removeAllChildren(): void {
    while (this.background.firstChild) {
      this.background.removeChild(this.background.firstChild);
    }
    this.overlay.removeChild(this.background);
    this.view.removeChild(this.overlay);
  }
}
