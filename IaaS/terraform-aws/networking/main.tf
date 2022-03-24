# --- networking/main.tf ---

data "aws_availability_zones" "available" {

}

resource "random_shuffle" "az_list" {
    input = data.aws_availability_zones.available.names
    result_count = var.max_subnets
}

resource "random_integer" "random" {
    min = 1
    max = 255
}

resource "aws_vpc" "fz_vpc" {
    cidr_block = var.vpc_cidr
    enable_dns_hostnames = true     
    enable_dns_support = true

    tags = {
        Name = "fz_vpc-${random_integer.random.id}"
    }

    lifecycle{
        create_before_destroy = true
    }
}

resource "aws_subnet" "fz_public_subnet" {
    count = var.public_sn_count
    vpc_id = aws_vpc.fz_vpc.id
    cidr_block = var.public_cidrs[count.index]
    map_public_ip_on_launch = true
    availability_zone = random_shuffle.az_list.result[count.index]

    tags = {
        Name = "fz_public_${count.index + 1}"
    }
}

resource "aws_route_table_association" "fz_public_association" {
    count = var.public_sn_count
    subnet_id = aws_subnet.fz_public_subnet.*.id[count.index]
    route_table_id = aws_route_table.fz_public_rt.id
}

resource "aws_subnet" "fz_private_subnet" {
    count = var.private_sn_count
    vpc_id = aws_vpc.fz_vpc.id
    cidr_block = var.private_cidrs[count.index]
    map_public_ip_on_launch = false
    availability_zone = random_shuffle.az_list.result[count.index]

    tags = {
        Name = "fz_private_${count.index + 1}"
    }
}

resource "aws_internet_gateway" "fz_internet_gateway" {
    vpc_id = aws_vpc.fz_vpc.id

    tags = {
        Name = "fz_igw"
    }
}

resource "aws_route_table" "fz_public_rt" {
    vpc_id = aws_vpc.fz_vpc.id

    tags = {
        Name = "fz_public"
    }
}

resource "aws_route" "default_route" {
    route_table_id = aws_route_table.fz_public_rt.id
    destination_cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.fz_internet_gateway.id
}

resource "aws_default_route_table" "fz_private_rt" {
    default_route_table_id = aws_vpc.fz_vpc.default_route_table_id

    tags = {
        Name = "fz_private"
    }
}

resource "aws_security_group" "fz_sg" {
    for_each = var.security_groups
    name = each.value.name
    description = each.value.description
    vpc_id = aws_vpc.fz_vpc.id
    dynamic "ingress" {
        for_each = each.value.ingress
        content {
            from_port = ingress.value.from
            to_port = ingress.value.to
            protocol = ingress.value.protocol
            cidr_blocks = ingress.value.cidr_blocks
        }
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}