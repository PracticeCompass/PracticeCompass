@echo off
setlocal
echo.
goto :checkArgs

:usage
echo %0 [/remote]
echo.
echo    /remote - executes scripts againts remote sql instance
echo.
goto end

rem ::::: Command-line Arguments ::::
:checkArgs
if /I "%1" == "/remote" set remote=true
if /I "%1" == "/?" goto usage
if "%2" neq "" shift & goto checkArgs

set instance=-S "%MEDSTREAMING_SQL%"

if "%remote%" neq "true" goto :skip_remote
if "%REMOTE_MEDSTREAMING_SQL%" neq "" if "%REMOTE_LOGINNAME%" neq "" if "%REMOTE_LOGINPASSWORD%" neq "" (
set instance=-S "%REMOTE_MEDSTREAMING_SQL%" -U "%REMOTE_LOGINNAME%" -P "%REMOTE_LOGINPASSWORD%"
)
if "%REMOTE_MEDSTREAMING_SQL%" neq "" if "%REMOTE_LOGINNAME%" equ "" if "%REMOTE_LOGINPASSWORD%" equ "" (
set instance=-S "%REMOTE_MEDSTREAMING_SQL%"
)
:skip_remote
cd .\PracticeCompass.Data\Scripts\
echo Applying Scripts.
call _scripts.bat "%instance%"
if "%errorlevel%" neq "0" (
	echo.
	echo sql\_scripts.bat FAILED
	echo.
	endlocal
	exit /b 1
)
cd ..

:end
endlocal
