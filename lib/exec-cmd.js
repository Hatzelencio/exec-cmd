'use babel';

import ExecCmdView from './exec-cmd-view';
import { CompositeDisposable } from 'atom';

export default {

  execCmdView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.execCmdView = new ExecCmdView(state.execCmdViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.execCmdView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'exec-cmd:exec-selected': () => this.executeSelectedCommand()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.execCmdView.destroy();
  },

  serialize() {
    return {
      execCmdViewState: this.execCmdView.serialize()
    };
  },

  executeSelectedCommand(){
    var editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      this.execute(editor.getSelectedText().replace(/\\\n/g, ''));
    }
  },

  execute(command){
    var exec = require('child_process').exec;
    exec(command, function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }else{
        console.log(stdout);
      }
    });
  }
};
