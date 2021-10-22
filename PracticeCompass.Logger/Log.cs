using NLog;
using System;
using System.Collections;
using System.ComponentModel;
using System.IO;
using System.Text;

namespace PracticeCompass.Logger
{
    public static class Log
    {
        private static readonly ILogger Logger = LogManager.GetCurrentClassLogger();
        static Log()
        {
            MappedDiagnosticsLogicalContext.Set("UserName", "Practice Compass");
        }
        public static void LogError(string message, string customerName, string filetype)
        {
            Logger.Error(message, "PracticeCompass");

        }

        public static void LogErrorStack(string message, Exception ex, string customerName, string filetype)
        {
            //writeLine("Error: " + message, customerName, filetype);
        }
        public static void LogErrorStack(string message, string customerName, string filetype)
        {
            //writeLine("Error: " + message, customerName, filetype);
            //writeLine("StackTrace: " + Environment.StackTrace, customerName, filetype);
        }

        public static void LogWarning(string message, string customerName, string filetype)
        {
            Logger.Warn(message, "PracticeCompass");
        }

        public static void LogInfo(string message, string customerName, string filetype)
        {
            Logger.Info(message, "PracticeCompass");
        }
        public static void LogInfoAlways(string message, string customerName, string filetype)
        {
            //writeLine("Info: " + message, customerName, filetype);
        }

        public static void LogInfoStack(string message, string customerName, string filetype)
        {

            //writeLine("Info: " + message, customerName, filetype);
            //writeLine("StackTrace: " + Environment.StackTrace, customerName, filetype);
        }
        public static void LogTiming(string message, string customerName, string filetype)
        {
            //writeLine("[Timing]: " + message, customerName, filetype);
        }

        public static void LogTimingAlways(string message, string customerName, string filetype)
        {
            //writeLine("[Timing]: " + message, customerName, filetype);
        }
        public static void LogInfo(string msg, byte[] data, string customerName, string filetype)
        {
        }     

    }
    public enum TechnoMedicLogFiles
    {
        [Description("API")]
        API = 1,
        [Description("Data")]
        Data = 2
    }
}
