using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace MudBlazor.Client.Shared.Attributes
{
    public class NotEmptyList : ValidationAttribute
    {
        public string ErrorMessager { get; set; } = string.Empty;
        public bool Error { get; set; }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is IList list && list.Count > 0)
            {
                Error = false;
                return ValidationResult.Success;
            }
            Error = true;
            return new ValidationResult(ErrorMessage ?? "A lista deve conter pelo menos um valor.");
        }
    }
}
