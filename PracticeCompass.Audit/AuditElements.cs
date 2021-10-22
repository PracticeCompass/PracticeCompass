using System;

namespace PracticeCompass.Audit
{
    public class AuditElements
    {
        public int UId = 0;// LoginUserInfo.Current.UserID;
        public string UName = "";// LoginUserInfo.Current.DisplayedName;
        public long? Branch = 0;

        public AuditManager Audit = new AuditManager();
        public string LocalIPAddress()
        {
            return "";//LoginUserInfo.Current.IpAdress;
        }
    }

    public enum AuditEventAction
    {
        Create = 1,
        Read = 2,
        Update = 3,
        Delete = 4,
        Execute = 5
    }
    // here we can define other Enums 
}
