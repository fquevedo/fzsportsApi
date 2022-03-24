#--- networking/outputs.tf---

output "vpc_id" {
    value = aws_vpc.fz_vpc.id
}

output "public_sg" {
    value = aws_security_group.fz_sg["public"].id
}

output "public_subnets" {
    value = aws_subnet.fz_public_subnet.*.id
}