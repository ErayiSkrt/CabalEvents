import { MainView } from "../../MainView";
import { AddCharPopup } from "../popup/AddcharPopup";

export class CharSelection {
  protected bkgr: HTMLDivElement;
  protected doc: Document;
  public selectionView: HTMLDivElement;
  protected selectedChar;
  protected charSelection: HTMLSelectElement;
  protected loadCharUrl =
    /*"http://127.0.0.1:5000/loadCharacters";*/ "https://firstservice-emyq.onrender.com/loadCharacters";
  constructor(background: HTMLDivElement, document: Document) {
    this.bkgr = background;
    this.doc = document;
    this.charSelection = this.doc.createElement("select");
    this.selectionView = this.doc.createElement("div");
    this.bkgr.appendChild(this.selectionView);
    this.selectionView.style.display = "none";
    this.selectedChar = document.createElement("option");
    this.selectedChar.id = "selectedChar";
    fetch(this.loadCharUrl)
      .then((response) => response.json())
      .then((data: Array<{ charName: string }>) => {
        this.addCharSelectElements(data);
      });
    document.addEventListener(
      "backToCharSelect",
      this.showCharSelection.bind(this)
    );
  }

  public showCharSelection(): void {
    this.selectionView.style.display = "";
  }

  protected addCharSelectElements(data: Array<{ charName: string }>): void {
    this.addTitle();
    this.horizontalLine();
    this.initSelection(data);
    this.horizontalLine();
    this.addRemoveButtons();
    this.horizontalLine();
    this.returnStartButtons();
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

  public initSelection(data: Array<{ charName: string }>): void {
    const selectionContainer = this.doc.createElement("div");
    selectionContainer.id = "eventsContainer";
    this.selectionView.appendChild(selectionContainer);
    this.charSelection.id = "charSelection";

    this.defaultSelectOption();
    data.forEach((name: { charName: string }) => {
      const createOption = this.doc.createElement("option");
      createOption.value = name.charName;
      createOption.text = name.charName;
      this.charSelection.appendChild(createOption);
    });

    selectionContainer?.appendChild(this.charSelection);

    this.charSelection.addEventListener("change", () => {
      this.selectedChar.value = this.charSelection.value;
    });
  }

  protected defaultSelectOption(): void {
    const defaultOption = this.doc.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select Char";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    this.selectedChar.value = defaultOption.value;
    this.charSelection.appendChild(defaultOption);
  }

  protected clearSelection(): void {
    while (this.charSelection.firstChild) {
      this.charSelection.removeChild(this.charSelection.firstChild);
    }
  }

  public updateCharSelection(): void {
    this.clearSelection();
    this.defaultSelectOption();
    fetch(this.loadCharUrl)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((name: { charName: string }) => {
          const createOption = this.doc.createElement("option");
          createOption.value = name.charName;
          createOption.text = name.charName;
          this.charSelection.appendChild(createOption);
        });
      });
  }

  protected addRemoveButtons(): void {
    const buttonDiv = this.doc.createElement("div");
    buttonDiv.id = "charButtons";
    this.selectionView.appendChild(buttonDiv);
    this.addCharButton();
    this.removeCharButton();
  }

  protected returnStartButtons(): void {
    const buttonDiv = this.doc.createElement("div");
    buttonDiv.id = "startReturn";
    this.selectionView.appendChild(buttonDiv);
    this.confirmButton();
    this.returnButton();
  }

  protected addCharButton(): void {
    const div = this.doc.getElementById("charButtons") as HTMLDivElement;
    const button = this.doc.createElement("div");
    button.id = "addChar";
    button.innerHTML = "Add Character";
    div.appendChild(button);

    button.addEventListener("pointerup", () => {
      new AddCharPopup(
        "Add a character",
        this.selectionView,
        "CONFIRM",
        "addCharacter",
        () => {
          this.updateCharSelection();
        },
        "adding"
      );
    });
  }

  protected removeCharButton(): void {
    const div = this.doc.getElementById("charButtons") as HTMLDivElement;
    const button = this.doc.createElement("div");
    button.id = "addChar";
    button.innerHTML = "remove Character";
    div.appendChild(button);
    button.addEventListener("pointerup", () => {
      new AddCharPopup(
        "Remove a character",
        this.selectionView,
        "DELETE",
        "removeCharacter",
        () => {
          this.updateCharSelection();
        },
        "removed"
      );
    });
  }

  protected confirmButton(): void {
    const div = this.doc.getElementById("startReturn") as HTMLDivElement;
    const button = this.doc.createElement("div");
    button.id = "startApp";
    button.innerHTML = "START APP";
    div.appendChild(button);

    button.addEventListener("pointerup", () => {
      if (this.selectedChar.value != "") {
        this.hideCharSelectionView();
        this.doc.dispatchEvent(new Event("startEvent"));
      }
    });
  }

  protected returnButton(): void {
    const div = this.doc.getElementById("startReturn") as HTMLDivElement;
    const button = this.doc.createElement("div");
    button.id = "return";
    button.innerHTML = "RETURN";
    div.appendChild(button);

    button.addEventListener("pointerup", () => {
      this.hideCharSelectionView();
      this.showMainScreen();
    });
  }

  public hideCharSelectionView(): void {
    this.selectionView.style.display = "none";
  }

  protected showMainScreen(): void {
    const mainDiv = document.getElementById("mainDiv") as HTMLDivElement;
    mainDiv.style.display = "";
  }
}

export default CharSelection;
