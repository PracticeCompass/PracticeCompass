using System;
using System.Collections.Generic;

namespace PracticeCompass.Messaging.Models
{
    public class Segment
    {
        public string Name { set; get; }
        public List<string> Fields { set; get; }
        public string FieldSeparator { set; get; }

        public Segment()
        {
            this.Name = "";
            this.Fields = new List<string>();
            this.FieldSeparator = "*";
        }
        public string this[int i]
        {
            set
            {
                if (i > this.Fields.Count)// this to handle missing indexes in the array if not mandatory
                {
                    while (this.Fields.Count < i)
                    {
                        this.Fields.Add(string.Empty);
                    }
                }
                this.Fields[i - 1] = value;
            }
            get
            {
                if (i > this.Fields.Count)
                {
                    while (this.Fields.Count < i)
                    {
                        this.Fields.Add(string.Empty);
                    }
                }
                return this.Fields[i - 1];
            }
        }
        public string GenerateMessage()
        {
            if (this.Fields == null || this.Fields.Count == 0)
            {
                return this.Name;
            }
            string val = this.Name;
            for (int i = 0; i < this.Fields.Count; i++)
            {
                val += string.Format("{0}{1}", this.FieldSeparator, this.Fields[i]);
            }
            val = val.TrimEnd(new char[] { this.FieldSeparator[0] });
            return val;
        }
        public bool GenerateSegment(string content)
        {
            string[] fields = content.Split(new string[] { this.FieldSeparator }, StringSplitOptions.None);
            for (int i = 0; i < fields.Length; i++)
            {
                if (i == 0)
                {
                    this.Name = fields[i];
                }
                else
                {
                    this.Fields.Add(fields[i]);
                }
            }
            return !string.IsNullOrEmpty(this.Name) || this.Fields.Count > 0;
        }
    }
}
