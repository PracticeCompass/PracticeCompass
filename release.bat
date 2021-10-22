@echo on
set back=%cd%
cd %back%\TechnoMedic.API\
dotnet publish -r win-x64 -c Release /p:EnvironmentName=Production
cd %back%\TechnoMedic.UI\
dotnet publish -r win-x64 -c Release /p:EnvironmentName=Production
del /q %back%\Publish\*
for /d %%x in (%back%\Publish\*) do @rd /s /q "%%x"
cd %back%\TechnoMedic.API\bin\Release\netcoreapp3.1\win-x64\
move "publish" "%back%\Publish"
cd %back%\Publish
Rename publish TechnoMedicAPI
cd %back%\TechnoMedic.UI\ClientApp\
move "dist" "%back%\Publish"
cd %back%\Publish
Rename dist TechnoMedicUI
cd %back%