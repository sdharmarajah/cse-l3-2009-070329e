set WshShell = WScript.CreateObject("WScript.Shell")
set oShortCutLink = WshShell.CreateShortcut(Wscript.Arguments(1))
oShortCutLink.TargetPath = Wscript.Arguments(0)
oShortCutLink.WindowStyle = 1
oShortCutLink.Hotkey = "CTRL+SHIFT+Q"
oShortCutLink.IconLocation = Wscript.Arguments(2)
oShortCutLink.Description = "qsFOX enabled Firefox"
oShortCutLink.Save