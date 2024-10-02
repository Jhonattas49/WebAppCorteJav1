using MudBlazor.Client.Domain;
using MudBlazor.Client.Shared.Models;
using System.Data;
using System.Text;
using System.Text.Json;

namespace MudBlazor.Client.Services.Repository
{
    public class RoleService
    {
        private readonly HttpClient _httpClient;
        private readonly AuthService _authService;

        public RoleService(AuthService authService, HttpClient httpClient)
        {
            _authService = authService;
            _httpClient = httpClient;
        }

        public async Task<ResponseData<(SourceRole Roles, SourcePermission Permission)>> IndexAsync()
        {
            try
            {
                var rolesResponse = await _httpClient.GetAsync("Roles");
                var permissionsResponse = await _httpClient.GetAsync("Permissions");

                if (rolesResponse.IsSuccessStatusCode && permissionsResponse.IsSuccessStatusCode)
                {
                    var rolesJson = await rolesResponse.Content.ReadFromJsonAsync<ResponseData<SourceRole>>();
                    var permissionsJson = await permissionsResponse.Content.ReadFromJsonAsync<ResponseData<SourcePermission>>();

                    if (rolesJson != null && permissionsJson != null)
                    {
                        // Combine the results into a tuple and wrap it in a ResponseData object
                        var combinedResult = new ResponseData<(SourceRole, SourcePermission)>
                        {
                            Data = (rolesJson?.Data!, permissionsJson?.Data! ?? null!),
                            Success = true,
                            Message = "Roles and Permissions fetched successfully."
                        };

                        return combinedResult;
                    }
                }

                // Handle the case where one or both responses are not successful
                return new ResponseData<(SourceRole, SourcePermission)>
                {
                    Data = default,
                    Success = false,
                    Message = "Failed to fetch Roles and/or Permissions."
                };
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during the HTTP requests
                return new ResponseData<(SourceRole, SourcePermission)>
                {
                    Data = default,
                    Success = false,
                    Message = $"An error occurred: {ex.Message}"
                };
            }
        }

        public async Task<ResponseData<ApplicationRole>> PostRolesPermissionAsync(ApplicationRole role)
        {
            try
            {
                // Convertendo o objeto role para JSON
                var roleJson = new StringContent(JsonSerializer.Serialize(role), Encoding.UTF8, "application/json");

                // Fazendo a requisição PUT para a API Node.js
                var response = await _httpClient.PostAsync("/Roles", roleJson);

                // Verificando se a requisição foi bem-sucedida
                if (response.IsSuccessStatusCode)
                {
                    // Lendo o conteúdo da resposta como JSON
                    var rolesJson = await response.Content.ReadFromJsonAsync<ResponseData<ApplicationRole>>();
                    return rolesJson!;
                }

                // Caso a resposta não tenha sido bem-sucedida ou os dados sejam nulos
                return new ResponseData<ApplicationRole>
                {
                    Data = default,
                    Success = false,
                    Message = "Falha ao atualizar Roles e/ou Permissions."
                };
            }
            catch (Exception ex)
            {
                // Retornando falha em caso de exceção
                return new ResponseData<ApplicationRole>
                {
                    Data = default,
                    Success = false,
                    Message = $"Ocorreu um erro: {ex.Message}"
                };
            }
        }

        public async Task<ResponseData<ApplicationRole>> UpdateRolesPermissionAsync(ApplicationRole role)
        {
            try
            {
                // Convertendo o objeto role para JSON
                var roleJson = new StringContent(JsonSerializer.Serialize(role), Encoding.UTF8, "application/json");

                // Fazendo a requisição PUT para a API Node.js
                var response = await _httpClient.PutAsync("/Roles", roleJson);

                // Verificando se a requisição foi bem-sucedida
                if (response.IsSuccessStatusCode)
                {
                    // Lendo o conteúdo da resposta como JSON
                    var rolesJson = await response.Content.ReadFromJsonAsync<ResponseData<ApplicationRole>>();
                    return rolesJson!;
                }

                // Caso a resposta não tenha sido bem-sucedida ou os dados sejam nulos
                return new ResponseData<ApplicationRole>
                {
                    Data = default,
                    Success = false,
                    Message = "Falha ao atualizar Roles e/ou Permissions."
                };
            }
            catch (Exception ex)
            {
                // Retornando falha em caso de exceção
                return new ResponseData<ApplicationRole>
                {
                    Data = default,
                    Success = false,
                    Message = $"Ocorreu um erro: {ex.Message}"
                };
            }
        }

        public async Task<ResponseData<ApplicationRole>> DeleteRoleAsync(string roleId)
        {
            try
            {
                // Criando o conteúdo JSON com o roleId
                var jsonContent = new StringContent(JsonSerializer.Serialize(new { roleId }), Encoding.UTF8, "application/json");

                // Fazendo a requisição DELETE para a API Node.js
                var request = new HttpRequestMessage(HttpMethod.Delete, "/Roles")
                {
                    Content = jsonContent
                };

                var response = await _httpClient.SendAsync(request);

                // Verificando se a requisição foi bem-sucedida
                if (response.IsSuccessStatusCode)
                {
                    // Lendo o conteúdo da resposta como JSON
                    var rolesJson = await response.Content.ReadFromJsonAsync<ResponseData<ApplicationRole>>();
                    return rolesJson!;
                }

                // Caso a resposta não tenha sido bem-sucedida ou os dados sejam nulos
                return new ResponseData<ApplicationRole>
                {
                    Data = default,
                    Success = false,
                    Message = "Falha ao deletar o Role."
                };
            }
            catch (Exception ex)
            {
                // Retornando falha em caso de exceção
                return new ResponseData<ApplicationRole>
                {
                    Data = default,
                    Success = false,
                    Message = $"Ocorreu um erro: {ex.Message}"
                };
            }
        }
    }
}

