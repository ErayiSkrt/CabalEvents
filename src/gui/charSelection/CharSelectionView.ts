import { MainView } from "../../MainView";
import { AddCharPopup } from "../popup/AddcharPopup";

export class CharSelection {
  protected bkgr: HTMLDivElement;
  protected doc: Document;
  public selectionView: HTMLDivElement;
  protected selectedChar: string = "";
  protected charSelection: HTMLSelectElement;
  protected characterList: Array<string>;
  constructor(
    background: HTMLDivElement,
    chars: Array<any>,
    document: Document
  ) {
    this.bkgr = background;
    this.doc = document;
    this.characterList = chars;
    this.charSelection = this.doc.createElement("select");
    this.selectionView = this.doc.createElement("div");
    this.bkgr.appendChild(this.selectionView);
    this.selectionView.style.display = "none";
    this.addCharSelectElements();
  }

  public showCharSelection(): void {
    this.selectionView.style.display = "";
  }

  protected addCharSelectElements(): void {
    this.addTitle();
    this.horizontalLine();
    this.initSelection();
    this.horizontalLine();
    this.addCharButton();
    this.confirmButton();
  }

  protected addTitle(): void {
    const titleDiv = this.doc.createElement("div");
    this.selectionView.appendChild(titleDiv);
    const title = this.doc.createElement("h1");
    title.id = "title";
    title.innerHTML = "SELECT Character";
    titleDiv.appendChild(title);
  }
  public horizontalLine(): void {
    const line = this.doc.createElement("div");
    line.className = "horizontalLine";
    this.selectionView.appendChild(line);
  }

  public addSelectonText(div: HTMLDivElement): void {
    const text = this.doc.createElement("h2");
    text.id = "selectText";
    text.innerHTML = "SELECT Character";
    div.appendChild(text);
  }

  public initSelection(): void {
    const selectionContainer = this.doc.createElement("div");
    selectionContainer.id = "eventsContainer";
    this.selectionView.appendChild(selectionContainer);
    this.addSelectonText(selectionContainer);
    this.charSelection.id = "eventSelection";

    const defaultOption = this.doc.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select Char";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    this.selectedChar = defaultOption.value;
    this.charSelection.appendChild(defaultOption);

    const charList = this.characterList;
    for (const option in charList) {
      const createOption = this.doc.createElement("option");
      createOption.value = charList[option].toUpperCase();
      createOption.text = charList[option].toUpperCase();
      this.charSelection.appendChild(createOption);
    }

    selectionContainer?.appendChild(this.charSelection);

    this.charSelection.addEventListener("change", () => {
      this.selectedChar = this.charSelection.value;
    });
  }

  public updateCharSelection(): void {
    const url = "https://firstservice-emyq.onrender.com/loadCharacters";
    this.charSelection.innerHTML = "";
    this.characterList = [];
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((name: string) => {
          this.characterList.push(name);
        });
        const chars = this.characterList;
        for (const option in this.characterList) {
          const createOption = this.doc.createElement("option");
          createOption.value = this.characterList[option].toUpperCase();
          createOption.text = this.characterList[option].toUpperCase();
          this.charSelection.appendChild(createOption);
        }
      });
  }

  protected addCharButton(): void {
    const button = this.doc.createElement("div");
    button.id = "start";
    button.innerHTML = "Add Character";
    this.selectionView.appendChild(button);

    button.addEventListener("pointerup", () => {
      new AddCharPopup(
        "Add a character",
        this.selectionView,
        "CONFIRM",
        true,
        () => {
          this.updateCharSelection();
        },
        this.characterList
      );
    });
  }

  protected confirmButton(): void {
    const button = this.doc.createElement("div");
    button.id = "start";
    button.innerHTML = "START APP";
    this.selectionView.appendChild(button);

    button.addEventListener("pointerup", () => {
      if (this.selectedChar != "") {
        this.hideCharSelectionView();
      }
    });
  }

  public hideCharSelectionView(): void {
    this.selectionView.style.display = "none";
  }
}

export default CharSelection;
