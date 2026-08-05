# 举棋不定

《举棋不定》双人回合制策略游戏的中文介绍网站。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## 构建

```bash
npm run build
```

项目基于 Next.js、React 与 TypeScript。

## 同步试玩版本

GitHub Release 的远程安装包完成大小与 SHA256 校验后，运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\Sync-ChessMeleeWebsiteRelease.ps1 -Version v0.1.3
```

脚本会从 `TechJoiH/Chess-Melee-Demo` 读取指定正式版本，校验 Windows x64 安装包、更新下载页数据并完成网站测试。通过后再发布网站，并在线确认 `/download` 展示相同版本。

未经过同版本校验的云盘或备用镜像不会展示在下载页，避免用户下载到旧版本。
