import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API QUẢN LÝ XẾP HÀNG",
      version: "1.0.0",
      description: "Xem chi tiết các API của dự án QUẢN LÝ XẾP HÀNG",
    },
    servers: [
      {
        // Tự động lấy BASE_URL từ Vercel, nếu không có thì dùng localhost:5003
        url: process.env.BASE_URL || "http://localhost:5003",
        description: "API Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // Sử dụng path.join để tránh lỗi đường dẫn khi chạy trên Vercel
  apis: [path.join(process.cwd(), "src/routes/*.js")],
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  // Thêm uiOptions để load CSS từ CDN (Tránh lỗi trang trắng trên Vercel)
  const uiOptions = {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
    ],
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, uiOptions));
  console.log(`Swagger active tại: ${process.env.BASE_URL || "http://localhost:5003"}/api-docs`);
};