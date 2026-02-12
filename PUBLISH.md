# 发布指南

## 自动发布到NPM

本项目配置了GitHub Actions，当创建tag时会自动发布到NPM。

### 设置步骤

1. **获取NPM Token**
   - 登录 [npmjs.com](https://www.npmjs.com)
   - 进入 Account Settings > Access Tokens
   - 创建一个新的 **Publish** token

2. **配置GitHub Secrets**
   - 进入项目GitHub仓库
   - 点击 Settings > Secrets and variables > Actions
   - 点击 "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: 粘贴你的NPM token

3. **创建发布**
   - 更新 `package.json` 中的版本号
   - 提交更改：
     ```bash
     git add .
     git commit -m "Bump version to 1.0.0"
     git push
     ```
   - 创建tag并推送：
     ```bash
     git tag v1.0.0
     git push origin v1.0.0
     ```

4. **GitHub Actions会自动执行**
   - 构建项目
   - 发布到NPM
   - 创建GitHub Release

### 手动发布（可选）

如果需要手动发布：

```bash
npm run build
npm publish --access public
```

### 注意事项

- tag格式必须为 `v*`（如 v1.0.0, v2.1.3）
- 确保版本号符合 [semver](https://semver.org/lang/zh-CN/) 规范
- 发布前确保所有测试通过