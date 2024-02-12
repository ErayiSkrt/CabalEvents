export class LunarEvent {
  protected background: HTMLDivElement;
  public lunarView: HTMLDivElement;
  protected leftSide: HTMLDivElement;
  protected rightSide: HTMLDivElement;
  constructor(background: HTMLDivElement) {
    this.background = background;
    this.lunarView = document.createElement("div");
    this.background.appendChild(this.lunarView);
    this.lunarView.style.display = "none";
    this.leftSide = document.createElement("div");
    this.leftSide.id = "leftSide";
    this.rightSide = document.createElement("div");
    this.rightSide.id = "rightSide";
    this.addElements();
    document.addEventListener("startEvent", this.startEvent.bind(this));
  }

  protected addElements(): void {
    this.addTitle();
    this.addleftSide();
    this.addRightSide();
    this.line();
    this.goBack();
  }

  protected addTitle(): void {
    const titleDiv = document.createElement("div");
    this.lunarView.appendChild(titleDiv);
    const title = document.createElement("h3");
    title.id = "LunarTitle";
    title.innerHTML = "placeHolder";
    titleDiv.appendChild(title);
  }

  public line(): void {
    const line = document.createElement("div");
    line.className = "horizontalLine";
    this.lunarView.appendChild(line);
    const splitDiv = document.createElement("div");
    splitDiv.id = "splitDiv";
    splitDiv.appendChild(this.leftSide);
    splitDiv.appendChild(this.rightSide);
    this.lunarView.appendChild(splitDiv);
    const line2 = document.createElement("div");
    line2.className = "horizontalLine";
    this.lunarView.appendChild(line2);
  }

  protected addleftSide(): void {
    const div1 = document.createElement("div");
    div1.id = "leftDiv";
    const div2 = document.createElement("div");
    div2.id = "leftDiv";
    const input1 = document.createElement("input");
    input1.id = "numberInput";
    div1.appendChild(input1);
    const selection = document.createElement("select");
    selection.id = "eventSelection";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "pick a present";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selection.appendChild(defaultOption);
    div1.appendChild(selection);
    const input2 = document.createElement("input");
    input2.id = "lastInput";
    div2.appendChild(input2);
    const add = document.createElement("button");
    add.id = "addChar";
    add.innerHTML = "ADD";
    div2.appendChild(add);
    this.leftSide.appendChild(div1);
    this.leftSide.appendChild(div2);
    add.addEventListener("pointerup", () => {
      //update backend + update leftside
    });
  }

  protected addRightSide(): void {
    const h1 = document.createElement("h1");
    h1.id = "title1";
    h1.innerHTML = "already opened presents";
    this.rightSide.appendChild(h1);
    const h3 = document.createElement("h3");
    h3.id = "title1";
    h3.innerHTML = "NAN";
    this.rightSide.appendChild(h3);
    const used = document.createElement("h3");
    used.id = "title1";
    used.innerHTML = "total items used";
    this.rightSide.appendChild(used);
    const div1 = document.createElement("div");
    div1.id = "leftDiv";
    this.rightSide.appendChild(div1);
    const item1 = document.createElement("h4");
    item1.id = "title1";
    item1.innerHTML = "Dragon's Claw";
    div1.appendChild(item1);
    const item2 = document.createElement("h4");
    item2.id = "title1";
    item2.innerHTML = "Dragon's Moon";
    div1.appendChild(item2);
    const item3 = document.createElement("h4");
    item3.id = "title1";
    item3.innerHTML = "Dragon's Egg";
    div1.appendChild(item3);
    const div2 = document.createElement("div");
    div2.id = "leftDiv";
    this.rightSide.appendChild(div2);
    const item1txt = document.createElement("h4");
    item1txt.id = "title1";
    item1txt.innerHTML = "NAN";
    div2.appendChild(item1txt);
    const item2txt = document.createElement("h4");
    item2txt.id = "title1";
    item2txt.innerHTML = "NAN";
    div2.appendChild(item2txt);
    const item3txt = document.createElement("h4");
    item3txt.id = "title1";
    item3txt.innerHTML = "NAN";
    div2.appendChild(item3txt);
  }

  protected goBack(): void {
    const back = document.createElement("button");
    back.id = "return";
    back.innerHTML = "RETURN";
    this.lunarView.appendChild(back);
    back.addEventListener("pointerup", () => {
      document.dispatchEvent(new Event("backToCharSelect"));
      this.hideView();
    });
  }

  protected hideView(): void {
    this.lunarView.style.display = "none";
  }

  protected startEvent(): void {
    this.updateEventData();
  }

  protected updateEventData(): void {
    this.showLunar();
    this.updateTitle();
  }
  protected showLunar(): void {
    this.lunarView.style.display = "";
  }

  protected updateTitle(): void {
    const title = document.getElementById("LunarTitle") as HTMLHeadingElement;
    const charSelection = document.getElementById(
      "charSelection"
    ) as HTMLOptionElement;
    title.innerHTML = "Hello  " + charSelection.value;
  }
}
