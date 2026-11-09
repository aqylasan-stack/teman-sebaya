@echo off
title FigCraft Live GUI Sync (Port 7979)
echo Menjalankan FigCraft dengan Live Control di Port 7979...

start "" "C:\Users\Fhazar\AppData\Local\Programs\ArtCraft\FigCraft\figcraft.exe" --control 7979 "c:\Users\Fhazar\Fhazar_Workspace\02_PROJECTS\teman-sebaya\teman-sebaya.figcraft"

echo Selesai! FigCraft siap menerima perintah live dari Antigravity di port 7979.
ping 127.0.0.1 -n 3 >nul
