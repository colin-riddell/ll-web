resource "aws_vpc" "custom_vpc" {
  cidr_block       = var.vpc_cidr_block
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.vpc_tag_name}-${var.environment}"
  }
}

### VPC Network Setup

# Create the private subnets
resource "aws_subnet" "private_subnet" {
  # count = var.number_of_private_subnets
  vpc_id            = "${aws_vpc.custom_vpc.id}"
  cidr_block = var.private_subnet_cidr_block
  availability_zone = "${element(var.availability_zones, 1)}"

  tags = {
    Name = "${var.private_subnet_tag_name}-${var.environment}"
  }
}

# Create the private subnets
resource "aws_subnet" "public_subnet" {
  # count = var.number_of_private_subnets
  vpc_id            = "${aws_vpc.custom_vpc.id}"
  cidr_block = "10.0.4.0/24"
  availability_zone = "${element(var.availability_zones, 0)}"
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.private_subnet_tag_name}-${var.environment}"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.custom_vpc.id
}

resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.custom_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

resource "aws_route_table_association" "r" {
  subnet_id = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.route_table.id
  
}


resource "aws_eip" "eip" {
  vpc = true
}


resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.eip.id
  subnet_id = aws_subnet.public_subnet.id
  depends_on = [
    aws_internet_gateway.gw
  ]
}

resource "aws_route_table" "r_nat" {
  vpc_id = aws_vpc.custom_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_nat_gateway.nat_gw.id
  }
}

# resource "aws_route_table_association" "nat_private" {
#   subnet_id = aws_subnet.private_subnet.id
#   route_table_id = aws_route_table.r_nat.id
# }
### Security Group Setup

# ALB Security group (If you want to use ALB instead of NLB. NLB doesn't use Security Groups)
resource "aws_security_group" "lb" {
  name        = "${var.security_group_lb_name}-${var.environment}"
  description = var.security_group_lb_description
  vpc_id      = "${aws_vpc.custom_vpc.id}"

  ingress {
    protocol    = "tcp"
    from_port   = 8080
    to_port     = 8080
    cidr_blocks = ["0.0.0.0/0"]
  }

    egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

# Traffic to the ECS Cluster should only come from the ALB
# or AWS services through an AWS PrivateLink
resource "aws_security_group" "ecs_tasks" {
  name        = "${var.security_group_ecs_tasks_name}-${var.environment}"
  description = var.security_group_ecs_tasks_description
  vpc_id      = "${aws_vpc.custom_vpc.id}"

  ingress {
    protocol    = "tcp"
    from_port   = var.app_port
    to_port     = var.app_port
    cidr_blocks = [var.vpc_cidr_block]
  }

  ingress {
    protocol        = "tcp"
    from_port       = 443
    to_port         = 443
    cidr_blocks = [var.vpc_cidr_block]
  }

  egress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    prefix_list_ids = [
      aws_vpc_endpoint.s3.prefix_list_id
    ]
  }

  egress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    cidr_blocks = [var.vpc_cidr_block]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

# Route table and subnet associations
resource "aws_route_table_association" "subnet_route_assoc" {
  # count = var.number_of_private_subnets
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_vpc.custom_vpc.default_route_table_id
}