export class CharSelection {
  protected bkgr: HTMLDivElement;
  protected doc: Document;
  public selectionView: HTMLDivElement;
  protected selectedChar: string = "";
  protected charList: Array<string> = [];
  constructor(background: HTMLDivElement, document: Document) {
    this.bkgr = background;
    this.doc = document;
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
    this.charList = ["char1", "char2", "char2"];
    const selectionContainer = this.doc.createElement("div");
    selectionContainer.id = "charContainer";
    this.selectionView.appendChild(selectionContainer);
    this.addSelectonText(selectionContainer);
    const CharSelection = this.doc.createElement("select");
    CharSelection.id = "charSelection";

    const defaultOption = this.doc.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select Char";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    CharSelection.appendChild(defaultOption);

    for (const option in this.charList) {
      const createOption = this.doc.createElement("option");
      createOption.value = this.charList[option].toUpperCase();
      createOption.text = this.charList[option].toUpperCase();
      CharSelection.appendChild(createOption);
    }

    selectionContainer?.appendChild(CharSelection);

    CharSelection.addEventListener("change", () => {
      this.selectedChar = CharSelection.value;
    });
  }

  protected addCharButton(): void {
    const button = this.doc.createElement("div");
    button.id = "addchar";
    button.innerHTML = "Add Character";
    this.selectionView.appendChild(button);

    button.addEventListener("pointerup", () => {});
  }

  protected confirmButton(): void {
    const button = this.doc.createElement("div");
    button.id = "start";
    button.innerHTML = "START APP";
    this.selectionView.appendChild(button);

    button.addEventListener("pointerup", () => {
      this.hideCharSelectionView();
    });
  }

  public hideCharSelectionView(): void {
    this.selectionView.style.display = "none";
  }
}
