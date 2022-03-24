# --- loadbalancing/mains.tf ---

resource "aws_lb" "fz_lb" {
    name = "fz-loadbalancer"
    load_balancer_type = "application"
    subnets = var.public_subnets
    security_groups = [var.public_sg]
    idle_timeout = 500
}

resource "aws_lb_target_group" "fz_tg" {
    name = "fz-lb-tg-${substr(uuid(), 0, 3)}"
    port = var.tg_port
    protocol = var.tg_protocol
    vpc_id = var.vpc_id
    health_check {
        healthy_threshold = var.lb_healthy_threshold
        unhealthy_threshold = var.lb_unhealthy_threshold
        timeout = var.lb_timeout
        interval = var.lb_interval
    }
}

resource "aws_lb_listener" "fz_lb" {
    load_balancer_arn = aws_lb.fz_lb.arn
    port = var.listener_port
    protocol = var.listener_protocol
    default_action {
        type = "fixed-response"
        fixed_response {
            content_type = "text/plain"
            message_body = "Hola FzSports!"
            status_code  = "200"
        }
    }
}