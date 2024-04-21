const express = require("express");
const readLastLines = require("read-last-lines");
const app = express();
const PORT = 3001;

app.get("/logs", async (req, res) => {
  const filePath = "./nohup.out"; // 日志文件路径
  const logs = await readLastLines.read(filePath, 500);
  res.json({
    logs: logs.reverse(), // 重新反转日志，以正确顺序显示
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
