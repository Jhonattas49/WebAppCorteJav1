namespace MudBlazor.Client.Domain
{
    public class ResponseData<T>
    {
        public string? Message { get; set; }
        public bool Success { get; set; }
        public T? Data { get; set; }
        public string? Token { get; set; }
        public object Error { get; set; } = default!;
        public string? ErrorCode { get; set; }

        public Severity Severity { get; set; }

        // Construtor vazio para suportar a desserialização
        public ResponseData()
        {
        }
        public ResponseData(string message, bool success, string token)
        {
            Success = success;
            Message = message;
            Token = token;
        }
        // Construtor com todos os parâmetros
        public ResponseData(string message, bool success, string token, T data)
        {
            Success = success;
            Data = data;
            Message = message;
            Token = token;
        }

        // Outros construtores conforme sua necessidade
        public ResponseData(string message, bool success, T data)
        {
            Success = success;
            Data = data;
            Message = message;
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