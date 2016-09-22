'use babel';

import ExecCmdView from './exec-cmd-view';
import { CompositeDisposable } from 'atom';

export default {

  modalPanel: null,
  subscriptions: null,

  "config": {
    "autoClipboard": {
      "title": "Auto clipboard result from exec command",
      "type": "boolean",
      "default": false
    },"timeoutConsole": {
      "title": "Time alive running process",
      "description": "",
      "type": "integer",
      "default": 0,
      "minimum": 0
    },
    "maxBufferSize": {
      "title": "Max buffer size",
      "description": "",
      "type": "integer",
      "default": 200*1024
    },"killSignal": {
      "title": "Unix signal",
      "description": "SIGTERM || SIGINT || SIGKILL",
      "type": "string",
      "default": 'SIGTERM'
    }
  },

  activate(state) {
    this.execCmdView = new ExecCmdView(state.execCmdViewState);
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.execCmdView.getElement(),
      visible: true
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-pane-container', {
      'exec-cmd:exec-selected': () => this.executeSelectedCommand()
    }));

    this.subscriptions.add(atom.commands.add('atom-pane-container', {
      'exec-cmd:exec-closeview': () => this.closeViewIfOpened()
    }));

    this.subscriptions.add(atom.commands.add('textarea', {
      'exec-cmd:exec-copy-selected-text': () => this.copySelectedText()
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

  openViewIfClosed(){
    if(!this.modalPanel.isVisible())
      this.modalPanel.show()
  },

  closeViewIfOpened(){
    if(this.modalPanel.isVisible())
      this.modalPanel.hide()
  },

  copySelectedText(){
    console.log(atom.workspace.getBottomPanels());
    atom.clipboard.write(this.execCmdView.getText());
  },

  executeSelectedCommand(){
    this.openViewIfClosed();

    var editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      this.execute(editor.getSelectedText().replace(/\\\n/g, ''));
    }
  },

  execute(command){
    var exec = require('child_process').exec;
    var self = this;

    exec(command, {
      cwd: this.getFolderPathCurrentFileSelected(),
      timeout: atom.config.get('exec-cmd.timeoutConsole') * 1000,
      maxBuffer: atom.config.get('exec-cmd.maxBufferSize'),
      killSignal: atom.config.get('exec-cmd.killSignal')
    },function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }else{
        // console.log(stdout);
        self.execCmdView.setText(stdout);
        if(atom.config.get('exec-cmd.autoClipboard')){
          atom.clipboard.write(stdout);
        }
      }
    });
  },

  getFolderPathCurrentFileSelected(){
    try{
      path   = require('path');
      editor = atom.workspace.getActivePaneItem();

      dirPath = path.dirname(editor.buffer.file.path);
    }catch(err){
      dirPath = process.env.HOME || process.env.USERPROFILE;
    }

    return dirPath;
  }
};
