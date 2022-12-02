﻿using System.Runtime.CompilerServices;
using System.Text;

namespace SalonML_API.Services
{
    public class EmailHandler
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public EmailHandler(
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration) 
        {
            _httpClientFactory = httpClientFactory;
            _config = configuration;
        }

        public async void SendPasswordResetLink(string email, string token)
        {
            var resetUrl = _config["AppUrl"] + "new-password/" + token;
            var resetLinkText = "Please follow this link to reset your password";
            var requestContent = $@"{{  
                ""sender"":
                {{  
                    ""name"":""Frizerski Salon ML"",
                    ""email"":""system@frizerskisalonml.com""
                }},
                ""to"":[  
                    {{  
                        ""email"":""{email}"",
                        ""name"":""Admin""
                    }}
                ],
                ""subject"":""Password reset link"",
                ""htmlContent"":""<html><head></head><body><a href=\""{resetUrl}\"">{resetLinkText}</a></body></html>""
                }}";

            var request = new HttpRequestMessage()
            {
                RequestUri = new Uri("https://api.sendinblue.com/v3/smtp/email"),
                Method = HttpMethod.Post,
                Content = new StringContent(requestContent, Encoding.UTF8, "application/json")
            };

            request.Headers.Add("Accept", "application/json");
            request.Headers.Add("api-key", _config["SendInBlue:API_Key"]);

            var httpClient = _httpClientFactory.CreateClient();

            await httpClient.SendAsync(request);
        }
    }
}