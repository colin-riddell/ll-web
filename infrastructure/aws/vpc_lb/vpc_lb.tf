# VPC
resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
  }
}

# Subnets
# Internet Gateway for Public Subnet
resource "aws_internet_gateway" "ig" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name        = "${var.environment}-igw"
    Environment = var.environment
  }
}

# Elastic-IP (eip) for NAT
resource "aws_eip" "nat_eip" {
  vpc        = true
  depends_on = [aws_internet_gateway.ig]
}

# NAT
resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = element(aws_subnet.public_subnet.*.id, 0)

  tags = {
    Name        = "nat"
    Environment = "${var.environment}"
  }
}

# Public subnet
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.vpc.id
  count                   = length(var.public_subnets_cidr)
  cidr_block              = element(var.public_subnets_cidr, count.index)
  availability_zone       = element(var.availability_zones, count.index)
  map_public_ip_on_launch = true

  tags = {
    Name        = "${var.environment}-${element(var.availability_zones, count.index)}-public-subnet"
    Environment = "${var.environment}"
  }
}


# Private Subnet
resource "aws_subnet" "private_subnet" {
  vpc_id                  = aws_vpc.vpc.id
  count                   = length(var.private_subnets_cidr)
  cidr_block              = element(var.private_subnets_cidr, count.index)
  availability_zone       = element(var.availability_zones, count.index)
  map_public_ip_on_launch = false

  tags = {
    Name        = "${var.environment}-${element(var.availability_zones, count.index)}-private-subnet"
    Environment = "${var.environment}"
  }
}


# Routing tables to route traffic for Private Subnet
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name        = "${var.environment}-private-route-table"
    Environment = "${var.environment}"
  }
}

# Routing tables to route traffic for Public Subnet
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name        = "${var.environment}-public-route-table"
    Environment = "${var.environment}"
  }
}

# Route for Internet Gateway
resource "aws_route" "public_internet_gateway" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.ig.id
}

# Route for NAT
resource "aws_route" "private_nat_gateway" {
  route_table_id         = aws_route_table.private.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.nat.id
}

# Route table associations for both Public & Private Subnets
resource "aws_route_table_association" "public" {
  count          = length(var.public_subnets_cidr)
  subnet_id      = element(aws_subnet.public_subnet.*.id, count.index)
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = length(var.private_subnets_cidr)
  subnet_id      = element(aws_subnet.private_subnet.*.id, count.index)
  route_table_id = aws_route_table.private.id
}


resource "aws_security_group" "alb" {
  name        = "tcc_alb_security_group"
  description = "TCC load balancer security group"
  vpc_id      = "${aws_vpc.vpc.id}"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "tcc-alb-security-group"
  }
}

resource "aws_alb" "alb" {
  name            = "tcc-alb"
  security_groups = ["${aws_security_group.alb.id}"]
  # subnets         = ["${aws_subnet.public_subnet.*.id}"]
  subnets         = [for subnet in aws_subnet.public_subnet : subnet.id]
  tags = {
    Name = "tcc-alb"
  }
}

# # ECS compose integration creates the target group for the port set, and points it
# # at / for health, it seems
# resource "aws_alb_target_group" "group" {
#   name     = "tcc-alb-target"
#   port     = 80
#   protocol = "HTTP"
#   vpc_id   = "${aws_vpc.vpc.id}"
#   stickiness {
#     type = "lb_cookie"
#   }
#   # Alter the destination of the health check to be the login page.
#   health_check {
#     path = "/health"
#     port = 80
#   }
# }


# resource "aws_alb_listener" "listener_http" {
#   load_balancer_arn = "${aws_alb.alb.arn}"
#   port              = "80"
#   protocol          = "HTTP"

#   default_action {
#     target_group_arn = "${aws_alb_target_group.group.arn}"
#     type             = "forward"
#   }
# }

# resource "aws_alb_listener" "listener_https" {
#   load_balancer_arn = "${aws_alb.alb.arn}"
#   port              = "443"
#   protocol          = "HTTPS"
#   ssl_policy        = "ELBSecurityPolicy-2016-08"
#   certificate_arn   = "${var.certificate_arn}"
#   default_action {
#     target_group_arn = "${aws_alb_target_group.group.arn}"
#     type             = "forward"
#   }
# }

# resource "aws_route53_record" "terraform" {
#   zone_id = "${data.aws_route53_zone.zone.zone_id}"
#   name    = "terraform.${var.route53_hosted_zone_name}"
#   type    = "A"
#   alias {
#     name                   = "${aws_alb.alb.dns_name}"
#     zone_id                = "${aws_alb.alb.zone_id}"
#     evaluate_target_health = true
#   }
# }

# data "aws_route53_zone" "zone" {
#   name = "${var.route53_hosted_zone_name}"
# }