using MudBlazor.Client.Shared.Attributes;
using System.ComponentModel.DataAnnotations;

namespace MudBlazor.Client.Shared.Entities
{
    public class ApplicationUser
    {
        [Display(Name = "Senha")]
        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "A senha deve ter no mínimo 8 caracteres.")]
        public string Password { get; set; } = string.Empty;

        [Display(Name = "Confirmação de Senha")]
        [Required(ErrorMessage = "A confirmação da senha é obrigatória.")]
        [Compare(nameof(Password))]
        public string Password2 { get; set; } = string.Empty;

        [Display(Name = "Nome")]
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [MaxLength(30, ErrorMessage = "O nome não pode ter mais de 30 caracteres.")]
        public string Name { get; set; } = string.Empty;

        [Display(Name = "Email")]
        [Required(ErrorMessage = "O email é obrigatório.")]
        [EmailAddress(ErrorMessage = "Insira um endereço de email válido.")]
        public string Email { get; set; } = string.Empty;

        [Display(Name = "Contatos")]
        [NotEmptyList(ErrorMessage = "Pelo menos um contato é obrigatório.")]
        public List<Contact>? Contacts { get; set; } = new List<Contact>()!;
    }
}
