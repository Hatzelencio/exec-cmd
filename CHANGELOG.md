# 0.2.0 - First Release

- Creación de `exec-cmd`

# 0.2.1 - Fix folder-dir current file

- Se corrigió la ruta donde se ejecutan los comandos. Ahora los comandos se ejecutan a partir del archivo fuente.
- Se agregaron nuevos tags

# 0.2.2 - When a command is executed within a new file, fails

- Se corrigió problema, cuando se ejecuta un comando dentro de un nuevo archivo; este fallaba dado que no encuentra una ruta po defecto. Se agregó un try-catch para solucionar el problema y devolver $HOME

# 0.2.4 - Add settings params

- Se agregaron parametros por defectos al `settings` del packete.
