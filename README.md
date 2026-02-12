# rspress-plugin-giscus

Rspress 插件：在每页文章下方集成 Giscus 评论。

## 安装

```bash
pnpm add rspress-plugin-giscus
# 或本地链接
# "rspress-plugin-code-giscus": "file:../path/to/rspress-plugin-giscus"
```

## 配置

在 `rspress.config.ts` 中添加插件即可，**评论默认会出现在正文页 Footer 之前**（beforeDocFooter 位置）：

```typescript
import { defineConfig } from 'rspress/config';
import { pluginGiscus } from 'rspress-plugin-giscus'; // 或 rspress-plugin-code-giscus

export default defineConfig({
  plugins: [
    pluginGiscus({
      repo: '你的用户名/仓库名',
      repoId: 'R_kgDO...',
      category: 'Announcements',
      categoryId: 'DIC_kwDO...',
    }),
  ],
});
```

## 使用方法

### 默认：beforeDocFooter

使用插件后，评论会**自动**插入到每页正文的「DocFooter 之前」，无需自定义 Layout。

### 自定义 Layout 中手动放置

若需自己控制位置，可导入 `Giscus` 组件，在自定义主题的 Layout 里使用 `beforeDocFooter` 等插槽：

```tsx
import { BasicLayout } from '@rspress/core/theme';
import { Giscus } from 'rspress-plugin-giscus';

const Layout = () => (
  <BasicLayout
    beforeDocFooter={
      <Giscus
        repo="你的用户名/仓库名"
        repoId="R_kgDO..."
        category="Announcements"
        categoryId="DIC_kwDO..."
      />
    }
  />
);

export default Layout;
```

Giscus 的配置与 [Giscus 文档](https://giscus.app/zh-CN) 一致。

## 开发

### 本地开发

1. 克隆仓库
2. 安装依赖：`npm install`
3. 在测试项目中使用相对路径引入插件

### 构建

这是一个TypeScript项目，无需额外构建步骤。

## 故障排除

### `useThemeState is not a function or its return value is not iterable`

该报错出现在 Rspress 默认主题的 `ClientApp` 中，通常与 `@theme` 别名或多份 `@rspress/core` 有关，可按下面步骤处理：

1. **统一 @rspress/core 版本（推荐先做）**  
   在主项目根目录的 `package.json` 里增加 overrides，保证只存在一份 `@rspress/core`：

   ```json
   {
     "pnpm": {
       "overrides": {
         "@rspress/core": "^2.0.0"
       }
     }
   }
   ```

   使用 npm 时：

   ```json
   {
     "overrides": {
       "@rspress/core": "^2.0.0"
     }
   }
   ```

   然后删除 `node_modules` 和锁文件，重新安装依赖。

2. **若使用了自定义主题目录（`themeDir`）**  
   确保自定义主题的入口（如 `index.js`）把 `useThemeState` 从默认主题里再导出，例如：

   ```js
   export { useThemeState } from '@theme-original';
   // 或
   export { useThemeState } from '@rspress/core/theme';
   ```

   否则 `ClientApp` 里 `import { useThemeState } from '@theme'` 会拿不到该函数，从而报错。

3. **确认是否由本插件引起**  
   暂时从 `rspress.config.ts` 中移除本插件，重新构建并运行。若错误消失，再按 1、2 步检查依赖与主题导出后重新启用插件。

## 许可证

MIT License