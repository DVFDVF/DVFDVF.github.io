const fs = require("fs");

// 检查文件是否存在
fs.access("./a.html", fs.constants.F_OK, (err) => {
  if (err) {
    if (err.code === "ENOENT") {
      // 生成 HTML 字符串
      const htmlContent = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>导航</title>
      </head>
      <body>
        跳转到其他网站
      </body>
      </html>
      <script>
        setTimeout(() => {
          location.href="https://w.between777.com/#/"
        }, 2000);
      </script>
      `;

      // 将 HTML 字符串写入到文件中
      fs.writeFile("./a.html", htmlContent, (err) => {
        if (err) {
          console.error("Error writing HTML file:", err);
          return;
        }
        console.log("HTML 文件已生成");
      });
    } else {
      console.error("Error checking file existence:", err);
    }
  } else {
    console.log("HTML 文件已存在");
  }
});

// 检查文件是否存在
fs.access("./b.json", fs.constants.F_OK, (err) => {
  if (err) {
    if (err.code === "ENOENT") {
      // 生成 HTML 字符串
      // 定义 JSON 对象
      const manifestJson = {
        name: "BETWEEN",
        short_name: "BETWEENa",
        start_url: "./redirect.html",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#3eaf7c",
        icons: [
          {
            src: "/logo.png",
            sizes: "200x200",
            type: "image/png",
          },
        ],
      };
      // 将 JSON 对象转换为字符串
      const jsonString = JSON.stringify(manifestJson, null, 2);
      // 将 HTML 字符串写入到文件中
      fs.writeFile("./b.json", jsonString, (err) => {
        if (err) {
          console.error("Error writing HTML file:", err);
          return;
        }
        console.log("HTML 文件已生成");
      });
    } else {
      console.error("Error checking file existence:", err);
    }
  } else {
    console.log("HTML 文件已存在");
  }
});
