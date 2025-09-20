variable "cognito_pool_id" {
  description = "The name of the Cognito User Pool"
  type        = string
  default     = "auth-api-user-pool"
}

variable "cognito_client_id" {
  description = "The domain for the Cognito User Pool"
  type        = string
  default     = "auth-api-user-pool-domain"
}
