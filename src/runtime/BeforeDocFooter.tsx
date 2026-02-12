import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from '@rspress/core/runtime';
import type { GiscusProps } from '@giscus/react';
import GiscusWidget from './Giscus';

const FOOTER_SELECTOR = '.rp-doc-footer';

export default function BeforeDocFooter(props: GiscusProps) {
    const location = useLocation();
    const pathname = (location as any)?.pathname || '';

    // 使用 pathname 作为 key 强制整个内部组件在切换页面时销毁并重建
    return <GiscusInternal key={pathname} {...props} />;
}

function GiscusInternal(props: GiscusProps) {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const place = (): HTMLDivElement | null => {
            const footer = document.querySelector(FOOTER_SELECTOR);
            if (!footer?.parentElement) return null;
            const wrapper = document.createElement('div');
            wrapper.className = 'rspress-giscus-before-footer';
            wrapper.setAttribute('style', 'margin: 2rem 0;');
            footer.parentElement.insertBefore(wrapper, footer);
            wrapperRef.current = wrapper;
            setContainer(wrapper);
            return wrapper;
        };

        let el: HTMLDivElement | null = place();
        if (!el) {
            const observer = new MutationObserver(() => {
                if (!wrapperRef.current) place();
            });
            observer.observe(document.body, { childList: true, subtree: true });
            const t = setTimeout(() => {
                observer.disconnect();
                if (!wrapperRef.current) place();
            }, 3000);
            return () => {
                clearTimeout(t);
                observer.disconnect();
                wrapperRef.current?.remove();
                wrapperRef.current = null;
                setContainer(null);
            };
        }
        return () => {
            wrapperRef.current?.remove();
            wrapperRef.current = null;
            setContainer(null);
        };
    }, []); // 这里的依赖数组可以为空，因为父组件的 key 变化已经保证了它的重新挂载

    if (!container || !props.repo) return null;

    return createPortal(<GiscusWidget {...props} />, container);
}
