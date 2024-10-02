using System.ComponentModel.DataAnnotations;

namespace MudBlazor.Client.Shared.Models
{
    public class InputLoginRequest
    {
        [Required(ErrorMessage = "O campo E-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo Email não é um endereço de email válido.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "O campo de senha é necessária.")]
        [StringLength(30, ErrorMessage = "A senha deve ter pelo menos 8 caracteres.", MinimumLength = 8)]
        public string Password { get; set; } = string.Empty;
    
    }
}
