using System;

namespace PracticeCompass.Messaging.Utilities
{
    public class ValidationEXceptions
    {
        public class InvalidSegnmentsCountException : Exception
        {
            public InvalidSegnmentsCountException(string message)
                : base(message)
            {
            }

            public InvalidSegnmentsCountException(string message, Exception innerException)
                : base(message, innerException)
            {
            }
        }
        public class NoISASegnmentFoundException : Exception
        {
            public NoISASegnmentFoundException(string message)
                : base(message)
            {
            }

            public NoISASegnmentFoundException(string message, Exception innerException)
                : base(message, innerException)
            {
            }
        }
        public class IEATrailersNotMatchHeadersException : Exception
        {
            public IEATrailersNotMatchHeadersException(string message)
                : base(message)
            {
            }

            public IEATrailersNotMatchHeadersException(string message, Exception innerException)
                : base(message, innerException)
            {
            }
        }
        public class MessageHeaderTrailersNotMatchedException : Exception
        {
            public MessageHeaderTrailersNotMatchedException(string message)
                : base(message)
            {
            }

            public MessageHeaderTrailersNotMatchedException(string message, Exception innerException)
                : base(message, innerException)
            {
            }
        }
        public class MessageTransactionHeaderTrailersNotMatchedException : Exception
        {
            public MessageTransactionHeaderTrailersNotMatchedException(string message)
                : base(message)
            {
            }

            public MessageTransactionHeaderTrailersNotMatchedException(string message, Exception innerException)
                : base(message, innerException)
            {
            }
        }
    }
}
