data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# a repository should, apparently, be created per image!!! aws is weird
resource "aws_ecr_repository" "aws-ecr" {
  name = "${var.name}"
  tags = {
    Name        = "${var.name}"
    Environment = var.environment
  }
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "${var.name}-execution-task-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
  tags = {
    Name        = "${var.name}-iam-role"
    Environment = var.environment
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

variable "logs_retention_in_days" {
  type        = number
  default     = 90
  description = "Specifies the number of days you want to retain log events"
}

resource "aws_cloudwatch_log_group" "logs" {
  name              = "/fargate/service/${var.name}-${var.environment}"
  retention_in_days = var.logs_retention_in_days
}

resource "aws_ecs_task_definition" "main" {
  family             = var.name
  task_role_arn = aws_iam_role.task_role.arn
  execution_role_arn = aws_iam_role.main_ecs_tasks.arn
  network_mode       = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu    = var.fargate_cpu
  memory = var.fargate_memory
  container_definitions = jsonencode([
    {
      name : var.name,
      image :  "${aws_ecr_repository.aws-ecr.repository_url}:latest",
      environment: [
        { name: "BOT_TOKEN", value: var.bot_token }
      ]
      cpu : var.fargate_cpu,
      memory : var.fargate_memory,
      networkMode : "awsvpc",
      portMappings : [
        {
          containerPort : var.app_port
          protocol : "tcp",
          hostPort : var.app_port
        }
      ]
      logConfiguration: {
        logDriver: "awslogs",
        options: {
          awslogs-group: "/fargate/service/${var.name}-${var.environment}",
          awslogs-region: "${var.region}",
          awslogs-stream-prefix: "ecs"
        }
    }
    }
  ])
}