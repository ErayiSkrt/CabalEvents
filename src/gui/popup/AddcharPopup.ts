import { MainView } from "../../MainView";

export class AddCharPopup {
  protected title: string;
  protected withInput: boolean;
  protected background: HTMLDivElement;
  protected _done: any;
  protected view: HTMLDivElement;
  protected buttonTxt: string;
  protected overlay: HTMLDivElement;
  protected charList: Array<string>;
  constructor(
    titleText: string,
    view: HTMLDivElement,
    buttonText: string,
    withInput: boolean,
    done: () => void,
    chars: Array<string> = []
  ) {
    this.title = titleText;
    this.view = view;
    this.buttonTxt = buttonText;
    this._done = done;
    this.charList = chars;
    this.withInput = withInput;
    this.background = document.createElement("div");
    this.background.id = "popupBackground";
    this.overlay = document.createElement("div");
    this.overlay.id = "overLay";
    this.overlay.appendChild(this.background);
    this.view.appendChild(this.overlay);
    this.addElements();
  }

  protected addElements(): void {
    const title = document.createElement("div");
    title.innerHTML = this.title;
    this.background.appendChild(title);
    const input = document.createElement("input");
    input.id = "popupInput";
    if (this.withInput) {
      this.background.appendChild(input);
    }
    const button = document.createElement("button");
    button.id = "start";
    button.innerHTML = this.buttonTxt;
    this.background.appendChild(button);
    let clicked = false;
    let time: number;
    let elapsed: number;
    button.addEventListener("pointerup", () => {
      if (clicked) {
        elapsed = new Date().getTime() / 1000;
        const calculate = elapsed - time;
        if (calculate > 3) {
          clicked = false;
        }
        return;
      }
      clicked = true;
      time = new Date().getTime() / 1000;
      if (this.withInput) {
        this.charList;
        let addChar = true;
        if (this.charList) {
          this.charList.forEach((char: string) => {
            if (char.toLocaleLowerCase() == input.value.toLocaleLowerCase()) {
              addChar = false;
            }
          });
        }
        if (addChar && input.value != "") {
          const url: string =
            "https://firstservice-emyq.onrender.com/addCharacter/" +
            input.value;
          fetch(url)
            .then((response) => response.json())
            .then(() => {
              this._done();
              alert("Character Added");
              this.removeAllChildren();
            });
        } else {
          if (input.value != "") {
            alert("charcter with this name already exists");
            input.value = "";
          } else {
            alert("invalid character name");
          }
        }
      }
    });
  }

  protected removeAllChildren(): void {
    while (this.background.firstChild) {
      this.background.removeChild(this.background.firstChild);
    }
    this.overlay.removeChild(this.background);
    this.view.removeChild(this.overlay);
    this._done();
  }
}
