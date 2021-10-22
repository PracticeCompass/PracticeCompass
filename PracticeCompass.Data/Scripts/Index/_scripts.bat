@echo off
setlocal

set scripts=%~dp0\_scripts.txt
set instance=%~1
if "%instance%" equ "" set instance=-S "%MEDSTREAMING_SQL%"

rem
rem This script will apply all SQL scripts in the order listed in
rem %scripts% rem to the database specified in %MEDSTREAMING_SQL%.
rem If any error is encountered, the script will halt, and database
rem integrity cannot be guaranteed.
rem

rem
rem Make sure the scripts file exists.
rem
if not exist %scripts% (
	echo.
	echo Scripts file "%scripts%" does not exist.
	echo.
	goto error
)

rem
rem Make sure that the number of scripts in this directory is
rem the same as the number of scripts specified in _scripts.txt.
rem
for /f "usebackq delims==" %%f in (`cat %scripts% ^| grep -v "^$" ^| wc -l`) do set filenum=%%f
for /f "usebackq delims==" %%f in (`dir /b "%~dp0\*sql" ^| wc -l`) do set dirnum=%%f
if "%filenum%" neq "%dirnum%" (
	echo.
	echo Number of scripts in directory different from "%scripts%".
	echo.
	echo !!! CAUTION !!!
	echo DATABASE CONSISTENCY IS NOT GUARANTEED
	echo.
	goto error
)
if "%filenum%" equ "      0" (
	echo.
	echo No scripts to apply.
	goto end
)

rem
rem Clean output of any previous runs
rem
if exist %~dp0\__tmp* del /q %~dp0\__tmp*

rem
rem Checking File Names Constraint
rem
echo.
echo Checking File Names Constraint
set maxLen=140
set lenErrors=%~dp0\__LenErrors__.txt
type NUL > %lenErrors%
setlocal EnableDelayedExpansion
for /f "delims==" %%x in (%scripts%) do (
	set "str=%%x"
	call :strlen len str
	IF !len! GTR %maxLen% (
		echo %%x [!len!] >> %lenErrors%
	)
)
set lenLines=
for /f "usebackq delims==" %%f in (%lenErrors%) do (
	set lenLines=!lenLines!%%f
)
if "%lenLines%" neq "" (
	echo.
	echo ERROR: Following Script Names Violate Max Length [%maxLen%]
	echo -----------------------------------------------------------
	cat %lenErrors%
	echo.
	goto :error
)

rem
rem Apply all SQL scripts in order as listed in _scripts.txt
rem
rem NOTE: if any of the script filenames contain a space, this
rem for loop will only see the 1st component of the filename,
rem and then fail (file not found).  Do not use spaces in the
rem script filename.
rem
for /f "delims==" %%x in (%scripts%) do (
	echo.
	echo Applying script %%x...

	if not exist %CD%\%%x (
		echo.
		echo ERROR: script does not exist '%CD%\%%x'
		echo.
		goto error %%x
	)

	rem
	rem Make sure script exists
	rem
	if not exist "%~dp0\%%x" (
		echo.
		echo ERROR: script does not exist '%~dp0\%%x'
		echo.
		goto error
	)

	rem
	rem Run the script, show the output on stdout and tee this to a
	rem file with the same name as the script, prefixed with __tmp_
	rem
	sqlcmd %instance% -d Medstreaming -i "%~dp0\%%x" | tee "%~dp0\__tmp_%%x.txt"
)

rem
rem Catch all find errors in any of the processed script
rem
set errors=%~dp0\__error_list.txt
grep -li "^Msg" %~dp0\__tmp_*txt > %errors%
grep -li "^HResult" %~dp0\__tmp_*txt >> %errors%
set lines=
for /f "usebackq delims==" %%f in (%errors%) do (
	set lines=!lines!%%f
)
if "%lines%" neq "" (
	echo.
	echo ERRORS encountered processing scripts:
	cat %errors%
	echo.
	goto :error
)

echo.
echo Done!
goto end

:error
echo.
endlocal
exit /b 1

:end
endlocal
exit /b 0

:strlen <resultVar> <stringVar>
(   
    setlocal EnableDelayedExpansion
    set "s=!%~2!#"
    set "len=0"
    for %%P in (4096 2048 1024 512 256 128 64 32 16 8 4 2 1) do (
        if "!s:~%%P,1!" NEQ "" ( 
            set /a "len+=%%P"
            set "s=!s:~%%P!"
        )
    )
)
( 
    endlocal
    set "%~1=%len%"
    exit /b
)