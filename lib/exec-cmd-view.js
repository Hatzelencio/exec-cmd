'use babel';

export default class ExecCmdView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('exec-cmd-main-element');

    const left  = document.createElement('div');
    const right = document.createElement('div');

    left.classList.add('exec-cmd-container', 'exec-cmd-box');
    right.classList.add('exec-cmd-container', 'exec-cmd-box');

    this.resultArea = document.createElement('textarea');
    this.resultArea.classList.add('exec-cmd-textarea');
    // this.resultArea.textContent = 'Este es un testo de prueba';

    this.testillo = document.createElement('p');
    // this.testillo.textContent = 'Este es un testo de prueba';

    left.appendChild(this.resultArea);
    right.appendChild(this.testillo);

    this.element.appendChild(left);
    this.element.appendChild(right);
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
