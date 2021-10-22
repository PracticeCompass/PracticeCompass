namespace PracticeCompass.Common.Enums
{
    public enum TransactionHandlingMethod
    {
        PaymentWithTransaction, // C
        MakePaymentOnly, // D
        NotificationOnly, // H
        RemittanceInformationOnly, // I
        Prenotification, // P
        Split, // U
        SplitOrTogether, // X
        None, // Default
    }
}
