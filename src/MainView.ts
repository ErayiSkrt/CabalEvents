import { CharSelection } from "./gui/charSelection/CharSelectionView";

export class MainView {
  protected doc: Document;
  protected background: HTMLDivElement;
  protected selectedOption = "";
  protected mainDiv: HTMLDivElement;
  protected selectionUrl: string;
  protected selectOptions: Array<string>;
  public characterList: Array<string>;
  public charSelectView!: CharSelection;
  protected clicked = false;

  constructor() {
    this.selectOptions = [];
    this.selectionUrl =
      /*"http://127.0.0.1:5000/loadEvents"; */ "https://firstservice-emyq.onrender.com/loadEvents";
    this.doc = document;
    this.background = this.doc.createElement("div");
    this.background.id = "background";
    this.doc.body.appendChild(this.background);
    this.background.style.background = "url('images/background.png')";
    this.mainDiv = this.doc.createElement("div");
    this.mainDiv.id = "mainDiv";
    this.background.appendChild(this.mainDiv);
    this.characterList = [];
    fetch(this.selectionUrl)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((name: { eventName: string }) => {
          this.selectOptions.push(name.eventName);
        });
        this.addMainDivElements();
      });

    this.charSelectView = this.addCharSelection();
  }

  protected addCharSelection(): CharSelection {
    return new CharSelection(this.background, this.doc);
  }

  public addMainDivElements(): void {
    this.addTitle();
    this.horizontalLine();
    this.initSelection();
    this.horizontalLine();
    this.confirmButton();
  }

  public addTitle(): void {
    const titleDiv = this.doc.createElement("div");
    this.mainDiv.appendChild(titleDiv);

    const title = this.doc.createElement("h1");
    title.id = "title";
    title.innerHTML = "CABAL EVENTS";
    titleDiv.appendChild(title);
  }

  public horizontalLine(): void {
    const line = this.doc.createElement("div");
    line.className = "horizontalLine";
    this.mainDiv.appendChild(line);
  }

  public addSelectonText(div: HTMLDivElement): void {
    const text = this.doc.createElement("h2");
    text.id = "selectText";
    text.innerHTML = "SELECT EVENT";
    div.appendChild(text);
  }

  public initSelection(): void {
    const selectionContainer = this.doc.createElement("div");
    selectionContainer.id = "eventsContainer";
    this.mainDiv.appendChild(selectionContainer);
    this.addSelectonText(selectionContainer);
    const eventSelection = this.doc.createElement("select");
    eventSelection.id = "eventSelection";

    const defaultOption = this.doc.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select Event";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    eventSelection.appendChild(defaultOption);

    let count = 0;
    for (const option in this.selectOptions) {
      count++;
      const createOption = this.doc.createElement("option");
      createOption.value = this.selectOptions[option].toUpperCase();
      createOption.text = this.selectOptions[option].toUpperCase();
      eventSelection.appendChild(createOption);
    }

    selectionContainer?.appendChild(eventSelection);

    eventSelection.addEventListener("change", () => {
      this.selectedOption = eventSelection.value;
    });
  }

  public confirmButton(): void {
    const button = this.doc.createElement("div");
    button.id = "start";
    button.innerHTML = "START APP";
    this.mainDiv.appendChild(button);
    button.addEventListener("pointerup", () => {
      if (this.clicked) return;
      if (this.selectedOption != "") {
        this.clicked = true;
        this.afterClick();
        this.hideCabalEventsScreen();
      }
    });
  }

  async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async afterClick() {
    await this.delay(1000);
    this.clicked = false;
  }

  public hideCabalEventsScreen(): void {
    this.mainDiv.style.display = "none";
    this.charSelectView.showCharSelection();
  }
}

export default MainView;
