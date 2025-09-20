variable "api_id" {
  description = "ID of the API Gateway REST API"
  type        = string
}

variable "api_resource_id" {
  description = "ID of the parent API Gateway Resource"
  type        = string
}

variable "path_part" {
  description = "Path segment for this API resource"
  type        = string
}

variable "http_method" {
  description = "HTTP method for the API endpoint"
  type        = string
}

variable "lambda_function_name" {
  description = "Name of the Lambda function"
  type        = string
}

variable "lambda_source_dir" {
  description = "Directory containing the Lambda function code"
  type        = string
}

variable "handler" {
  description = "Lambda function handler"
  type        = string
  default     = "index.handler"
}

variable "runtime" {
  description = "Lambda function runtime"
  type        = string
  default     = "nodejs18.x"
}

variable "memory_size" {
  description = "Lambda function memory size"
  type        = number
  default     = 128
}

variable "timeout" {
  description = "Lambda function timeout"
  type        = number
  default     = 10
}

variable "environment_variables" {
  description = "Environment variables for the Lambda function"
  type        = map(string)
  default     = {}
}
