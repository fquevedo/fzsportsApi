terraform {
  backend "remote" {
    organization = "fz-terraform"

    workspaces {
      name = "fz-dev"
    }
  }
}