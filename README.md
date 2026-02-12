# rspress-plugin-giscus

Rspress 插件：在每页文章下方集成 Giscus 评论。

## 安装

```bash
pnpm add rspress-plugin-giscus
```

## 配置

在 `rspress.config.ts` 中添加插件即可，**评论默认会出现在正文页 Footer 之前**（beforeDocFooter 位置）：

```typescript
import { defineConfig } from 'rspress/config';
import { pluginGiscus } from 'rspress-plugin-giscus';

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

Giscus 的配置与 [Giscus 文档](https://giscus.app/zh-CN) 一致。
