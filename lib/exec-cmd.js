'use babel';

import { CompositeDisposable } from 'atom';

export default {

  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'exec-cmd:exec-selected': () => this.executeSelectedCommand()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
  },

  executeSelectedCommand(){
    var editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      this.execute(editor.getSelectedText().replace(/\\\n/g, ''));
    }
  },

  execute(command){
    var exec = require('child_process').exec;
    exec(command, {
      cwd: this.getFolderPathCurrentFileSelected()
    },function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }else{
        console.log(stdout);
      }
    });
  },

  getFolderPathCurrentFileSelected(){
    path = require('path');
    editor = atom.workspace.getActivePaneItem();

    return path.dirname(editor.buffer.file.path);
  }
};
