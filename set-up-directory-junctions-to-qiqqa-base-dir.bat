rem make sure the active current directory is our own:
cd /d %~dp0

rem go to the Qiqqa data base directory
cd ..\base\

mklink /j INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA           %~dp0\INTRANET-EVIL-PDF-SAMPLES-FOR-QIQQA
mklink /j INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07 %~dp0\INTRANET_E57B9774-4712-430E-93E0-E67433F7DF07

rem when you run this for Windows Explorer by right-mouse --: Run As Administrator,
rem you surely would like to ascertain that this thing did what's advertised on the can.
rem Hence wait for user keypress - after heshe's done reviewing the cmd output.
pause
