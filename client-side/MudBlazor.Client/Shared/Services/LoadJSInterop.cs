using Microsoft.AspNetCore.Http;
using Microsoft.JSInterop;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;


namespace MudBlazor.Client.Shared.Services
{
    public class LoadJSInterop
    {
        private readonly IJSRuntime _jsRuntime;

        [Required(ErrorMessage = "Nome do documento requerido")]
        private string _nameDocument = string.Empty;

        [Required(ErrorMessage = "Nome da função requerido")]
        private string _nameFunction = string.Empty;

        private string _path = string.Empty;

        private IJSObjectReference _module = default!;

        public LoadJSInterop(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
        }

        public LoadJSInterop AddNameDocument(string nameDocument)
        {
            this._nameDocument = nameDocument;
            return this;
        }

        public LoadJSInterop AddNameFunction(string nameFunction)
        {
            this._nameFunction = nameFunction;
            return this;
        }

        public LoadJSInterop AddPath(string path)
        {
            this._path = path;
            return this;
        }

        private void ValidateParams()
        {
            if (string.IsNullOrEmpty(this._nameDocument))
            {
                throw new ArgumentException("Nome do documento requerido");
            }
            if (string.IsNullOrEmpty(this._nameFunction))
            {
                throw new ArgumentException("Nome da função requerido");
            }
        }
        
        public async Task<T> Start<T>()
        {
            ValidateParams();
            try
            {
                var dir = string.IsNullOrEmpty(this._path) ? "./js" : this._path;
                string fileName = $"{this._nameDocument}.js";
                string path = $"{dir}/{fileName}".Replace("\\", "/");

                _module = await _jsRuntime.InvokeAsync<IJSObjectReference>("import", path);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao executar a função JavaScript: {ex.Message}");
                throw new InvalidOperationException("O módulo JavaScript não foi carregado corretamente.");
            }            

            try
            {
                // Invoca a função JavaScript e retorna o resultado
                var result = await _module.InvokeAsync<T>(this._nameFunction);
                Console.WriteLine($"Resultado da função JavaScript: {result}");
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao executar a função JavaScript: {ex.Message}");
                throw new InvalidOperationException("Erro ao executar a função JavaScript.", ex);
            }
        }
    }
}




