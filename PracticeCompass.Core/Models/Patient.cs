using System;
using System.Collections.Generic;
using System.Text;

namespace PracticeCompass.Core.Models
{
    public class Patient
    {
        public Patient()
        {
        }

        #region Generated Properties
        public int totalCount { get; set; }
        public string PatientgridID { get; set; }
        public int? PersonID { get; set; }
        public string PersonNumber { get; set; }
        public int? PatientID { get; set; }
        public string DNLastName { get; set; }
        public string DNFirstName { get; set; }
        public DateTime? Dndob { get; set; }
        public string Dob { get; set; }
        public string Balance { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Email { get; set; }
        public string NextAppt { get; set; }
        public int? PracticeID { get; set; }
        public string practiceName { get; set; }

        #endregion

    }
}
