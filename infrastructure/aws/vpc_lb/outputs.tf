output "alb_ip_address" {
    value = aws_alb.alb.dns_name
}

output "alb_arn" {
    value = aws_alb.alb.arn
}