import { useSyncExternalStore } from 'react';
import Giscus, { GiscusProps } from '@giscus/react';

function getThemeFromDOM(): boolean {
    if (typeof document === 'undefined') return false;
    const root = document.documentElement;
    return (
        root.classList.contains('dark') ||
        root.classList.contains('rp-dark') ||
        root.getAttribute('data-theme') === 'dark' ||
        root.style.colorScheme === 'dark'
    );
}

function subscribeToTheme(callback: () => void): () => void {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'style', 'data-theme'],
    });
    return () => observer.disconnect();
}

export default function GiscusWidget(props: GiscusProps) {
    const isDark = useSyncExternalStore(subscribeToTheme, getThemeFromDOM, () => false);

    if (!props.repo) return null;

    const defaultProps: Partial<GiscusProps> = {
        id: 'comments',
        mapping: 'pathname',
        reactionsEnabled: '1',
        emitMetadata: '0',
        inputPosition: 'bottom',
        lang: 'zh-CN',
        loading: 'lazy',
    };

    const finalProps = { ...defaultProps, ...props } as GiscusProps;

    return (
        <div className="rspress-giscus-wrapper" style={{ margin: '2rem 0' }} data-theme={isDark ? 'dark' : 'light'}>
            <Giscus
                {...finalProps}
                theme={isDark ? 'noborder_dark' : 'light'}
            />
        </div>
    );
}
