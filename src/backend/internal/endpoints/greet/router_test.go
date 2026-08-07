package greet

import (
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v3"
	"github.com/stretchr/testify/require"

	"cp-web-template-backend/internal/service"
)

func TestNewRouter(t *testing.T) {
	t.Parallel()

	router := NewRouter(&service.MockService{})
	require.NotNil(t, router)
}

func TestRouterFooBar(t *testing.T) {
	t.Parallel()

	appService := &service.MockService{}
	app := fiber.New()
	NewRouter(appService).Register(app)

	request := httptest.NewRequest(http.MethodGet, "/greet", nil)
	response, err := app.Test(request, fiber.TestConfig{Timeout: 0, FailOnTimeout: false})
	require.NoError(t, err)

	body, err := io.ReadAll(response.Body)
	require.NoError(t, err)
	require.NoError(t, response.Body.Close())

	require.Equal(t, http.StatusOK, response.StatusCode)
	require.JSONEq(t, `{"message": "Hello, friend!"}`, string(body))

}

func TestRouterGreet_ProvidedName(t *testing.T) {
	t.Parallel()

	appService := &service.MockService{}
	app := fiber.New()
	NewRouter(appService).Register(app)

	request := httptest.NewRequest(http.MethodGet, "/greet?name=Ann", nil)
	response, err := app.Test(request, fiber.TestConfig{Timeout: 0, FailOnTimeout: false})
	require.NoError(t, err)

	body, err := io.ReadAll(response.Body)
	require.NoError(t, err)
	require.NoError(t, response.Body.Close())

	require.Equal(t, http.StatusOK, response.StatusCode)
	require.JSONEq(t, `{"message": "Hello, Ann!"}`, string(body))
}
