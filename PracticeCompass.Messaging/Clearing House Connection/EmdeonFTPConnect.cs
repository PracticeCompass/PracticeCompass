using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace PracticeCompass.Messaging.Clearing_House_Connection
{
    public class EmdeonFTPConnect
    {
        private bool EmdeonConnect()
        {
            Process process = null;
            try
            {
                process = new Process();
                process.EnableRaisingEvents = true;
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.WorkingDirectory = @"C:\PracticeCompas\Config";
                startInfo.FileName = @"C:\PracticeCompas\Config\Emdeon_connect.bat";
                startInfo.Arguments = @"C:\PracticeCompas\Config\Emdeon_send.txt";
                //startInfo.Arguments = @"C:\PracticeCompas\Config\Emdeon_download.txt";
                startInfo.UseShellExecute = false;
                startInfo.CreateNoWindow = true;
                startInfo.RedirectStandardOutput = true;
                startInfo.RedirectStandardError = true;
                startInfo.RedirectStandardInput = true;
                process.StartInfo = startInfo;
                bool success = false;
                success = process.Start();
                if (!success)
                {
                    return false;
                }
                process.StandardInput.Write("y");
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                process.WaitForExit();
                success = process.ExitCode == 0;
                return success;
            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {
                process.Close();
                process.Dispose();
            }
        }
    }
}
