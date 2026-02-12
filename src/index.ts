import path from 'node:path';
import type { RspressPlugin } from '@rspress/core';
import type { GiscusProps } from '@giscus/react';

// 用于在自定义 Layout 的 beforeDocFooter 等位置使用（需自行传入配置）
export { default as Giscus } from './runtime/Giscus';

export type PluginOptions = Pick<GiscusProps, 'repo' | 'repoId' | 'category' | 'categoryId'> &
    Partial<Omit<GiscusProps, 'repo' | 'repoId' | 'category' | 'categoryId'>>;

export function pluginGiscus(options: PluginOptions): RspressPlugin {
    return {
        name: 'rspress-plugin-giscus',
        globalUIComponents: [
            [
                path.join(__dirname, '..', 'src', 'runtime', 'BeforeDocFooter.tsx'),
                options
            ],
        ],
    };
}
