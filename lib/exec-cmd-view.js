'use babel';


export default class ExecCmdView {



  constructor(serializedState) {

    this.element = document.createElement('table');
    this.element.classList.add('exec-cmd-table');
    this.element.id = 'este-es-un-aidy';

    const container = document.createElement('tr');

    const left      = document.createElement('th');
    const right     = document.createElement('th');

    container.classList.add('exec-cmd-table-border');

    left.classList.add('exec-cmd-table-border', 'exec-cmd-table-th');
    right.classList.add('exec-cmd-table-border', 'exec-cmd-table-th');

    container.appendChild(left);
    // container.appendChild(right);

    this.element.appendChild(container);

    this.one = document.createElement('textarea');
    this.two = document.createElement('textarea');

    this.one.classList.add('exec-cmd-table-item', 'exec-cmd-textarea');
    this.two.classList.add('exec-cmd-table-item', 'exec-cmd-textarea');

    this.one.readOnly = true;
    this.two.readOnly = true;

    left.appendChild(this.one);
    right.appendChild(this.two);
  }

  setText(text){
    this.one.textContent = text;
  }

  getText(){
    return this.one.textContent;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
