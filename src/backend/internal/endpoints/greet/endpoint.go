package greet

import (
	"github.com/gofiber/fiber/v3"

	"cp-web-template-backend/internal/service"
)

type Router struct {
	Service service.Service
}

func NewRouter(service service.Service) Router {
	return Router{Service: service}
}

func (r Router) greet(c fiber.Ctx) error {
	name := c.Query("name", "friend")
	return c.JSON(fiber.Map{
        "message": "Hello, " + name + "!",
	})
}