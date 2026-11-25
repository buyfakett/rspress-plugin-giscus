import { useSyncExternalStore } from 'react';
import Giscus, { GiscusProps } from '@giscus/react';
import { getLightTheme } from './lightTheme';

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
    const siteTheme = useSyncExternalStore(
        subscribeToTheme,
        () => getThemeFromDOM() ? 'noborder_dark' : getLightTheme(props.host),
        () => 'light',
    );

    if (!props.repo) return null;

    const defaultProps: Partial<GiscusProps> = {
        id: 'comments',
        mapping: 'pathname',
        reactionsEnabled: '1',
        emitMetadata: '0',
        inputPosition: 'bottom',
        lang: 'zh-CN',
        loading: 'eager',
    };

    const finalProps = { ...defaultProps, ...props, theme: props.theme ?? siteTheme } as GiscusProps;

    return (
        <div className="rspress-giscus-wrapper" style={{ margin: '2rem 0' }} data-theme={siteTheme === 'noborder_dark' ? 'dark' : 'light'}>
            <Giscus
                {...finalProps}
            />
        </div>
    );
}
