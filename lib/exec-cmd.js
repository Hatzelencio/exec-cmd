'use babel';

import { CompositeDisposable } from 'atom';

export default {

  modalPanel: null,
  subscriptions: null,

  "config": {
    "timeoutConsole": {
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
      cwd: this.getFolderPathCurrentFileSelected(),
      timeout: atom.config.get('exec-cmd.timeoutConsole') * 1000,
      maxBuffer: atom.config.get('exec-cmd.maxBufferSize'),
      killSignal: atom.config.get('exec-cmd.killSignal')
    },function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }else{
        console.log(stdout);
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
