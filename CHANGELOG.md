# 0.2.0 - First Release

- Creación de `exec-cmd`

# 0.2.1 - Fix folder-dir current file

- Se corrigió la ruta donde se ejecutan los comandos. Ahora los comandos se ejecutan a partir del archivo fuente.
- Se agregaron nuevos tags

# 0.2.2 - When a command is executed within a new file, fails

- Se corrigió problema, cuando se ejecuta un comando dentro de un nuevo archivo; este fallaba dado que no encuentra una ruta po defecto. Se agregó un try-catch para solucionar el problema y devolver $HOME

# 0.2.4 - Add settings params

- Se agregaron parametros por defectos al `settings` del packete.

# 0.3.0 - Se agregó panel inferior para mostrar los resultados

- Se agregó panel para mostrar el resultado del comando ejecutado. `alt + r`
- El panel se cierra si es presionado `Esc` dentro del _atom-workspace_
- Se eliminaron menús que no eran útiles.
- Se agregó boolean para la configuración del paquete; permite guardar el resultado del comando ejecutado en el _clipboard_
- Se corrigió el README.md
