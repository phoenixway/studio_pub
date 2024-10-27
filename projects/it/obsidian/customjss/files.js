class DvFiles {
    list(app, dv) {
       
      let parentFolder = dv.current().file.folder

      if (parentFolder == "") parentFolder = "/"

      const lsFiles = app.vault.getFiles()
        // file or folder-note in cur folder
        .filter(
        // a file in cur folder
        file => file.parent.path == parentFolder
        || // or a folder-note in parent folder
        ( file.parent.parent != null // not at root
          && file.parent.parent.path == parentFolder
         && file.name == file.parent.name +".md")
        )
        // exclude cur folder-note itself
        .filter(file =>
          file.name != parentFolder.split("/").at(-1)+".md")
        .map(file => dv.fileLink(file.path))
        .sort()

        dv.list(lsFiles)
    }
}
