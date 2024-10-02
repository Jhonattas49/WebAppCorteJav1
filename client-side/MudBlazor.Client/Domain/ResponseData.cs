namespace MudBlazor.Client.Domain
{
    public class ResponseData<T>
    {
        public string? Message { get; set; }
        public bool Success { get; set; }
        public T? Data { get; set; }
        public object Error { get; set; } = default!;
        public string? ErrorCode { get; set; }

        public Severity Severity { get; set; }

        // Construtor vazio para suportar a desserialização
        public ResponseData()
        {
        }
        public ResponseData(string message, bool success)
        {
            Success = success;
            Message = message;
        }
        

        // Outros construtores conforme sua necessidade
        public ResponseData(string message, bool success, T data)
        {
            Message = message;
            Success = success;
            Data = data;

        }

        public ResponseData(string message, object error)
        {
            Success = false;
            Message = message;
            Error = error;
        }

        public ResponseData(string message, object error, string errorCode)
        {
            Success = false;
            Message = message;
            Error = error;
            ErrorCode = errorCode;
        }
    }
}