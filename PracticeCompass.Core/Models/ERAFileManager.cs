using System;

namespace PracticeCompass.Core.Models
{
    public class ERAFileManager
    {
        public int FileID { get; set; }
        public string FileName { get; set; }
        public DateTime FileDate { get; set; }
        public bool? IsProcessed { get; set; }
        public string Notes { get; set; }
    }
}
