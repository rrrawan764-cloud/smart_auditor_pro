provider "aws" {
  region = "me-central-1"
}

resource "aws_s3_bucket" "justice_vault" {
  bucket = "rwaq-justice-vault-2026"
}
