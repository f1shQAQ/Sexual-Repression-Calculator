# Vercel 部署指南

## 部署步骤

### 方式一：通过 Vercel CLI 部署

1. 安装 Vercel CLI：
```bash
npm install -g vercel
```

2. 登录 Vercel：
```bash
vercel login
```

3. 部署项目：
```bash
vercel
```

### 方式二：通过 Vercel 网站部署

1. 访问 [Vercel](https://vercel.com)
2. 点击 "Import Project"
3. 导入你的 GitHub/GitLab/Bitbucket 仓库
4. Vercel 会自动检测项目配置（已经配置好了 `vercel.json`）
5. 点击 "Deploy"

## 项目配置说明

### 构建设置

- **Build Command**: `rsbuild build -c rsbuild.config.vercel.ts`
- **Output Directory**: `dist/web`
- **Install Command**: `npm install`

这些配置已经在 `vercel.json` 中设置好了。

**注意**：项目使用单独的 `rsbuild.config.vercel.ts` 配置文件用于 Vercel 部署，该配置不包含开发服务器相关的依赖，避免在生产构建时出错。

### 环境变量

如果你的项目需要环境变量，在 Vercel 项目设置中添加：
1. 进入项目设置页面
2. 选择 "Environment Variables"
3. 添加所需的环境变量

### API 路由

API 路由已经配置为 Serverless Functions：
- API 入口文件：`api/index.ts`
- 所有 `/api/*` 路由会被路由到 serverless function
- 使用 Hono 框架处理 API 请求

### 客户端路由

项目使用 React Router，所有非 API 路由都会被重写到 `index.html`，确保 SPA 路由正常工作。

## 注意事项

1. **Node.js 版本**：确保 Vercel 使用的 Node.js 版本 >= 22.0.0（在 `package.json` 中已指定）
2. **静态资源**：静态资源路径 `/static/*` 和 `/favicon.svg` 会被正确处理
3. **API 路由**：当前 API 路由为空，项目主要使用客户端本地数据处理
4. **自动部署**：连接 GitHub 后，每次 push 到主分支都会自动触发部署

## 本地预览生产构建

```bash
# 构建客户端（Vercel 配置）
npm run build:vercel

# 或者直接使用
rsbuild build -c rsbuild.config.vercel.ts

# 使用 vercel dev 本地测试（需要安装 Vercel CLI）
vercel dev
```

## 故障排查

### 部署失败
- 检查构建日志
- 确保所有依赖都在 `dependencies` 中（不是 `devDependencies`）

### 构建错误："Cannot find module './src/server/app.dev'"
- 确保使用 `rsbuild.config.vercel.ts` 配置文件
- 该配置文件不包含开发服务器相关的导入，专门用于生产构建

### 路由配置错误
- 不要同时使用 `rewrites` 和 `routes`，只使用 `rewrites`
- Vercel 会自动处理静态文件，不需要额外配置

### 路由问题
- 检查 `vercel.json` 中的 rewrites 配置
- 确保 API 路由以 `/api` 开头

### 404 错误
- 检查 `outputDirectory` 是否正确
- 确保静态文件正确生成在 `dist/web` 目录

## 更多资源

- [Vercel 文档](https://vercel.com/docs)
- [Vercel CLI 文档](https://vercel.com/docs/cli)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

