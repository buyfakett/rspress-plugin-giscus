import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { GiscusProps } from '@giscus/react';
import GiscusWidget from './Giscus';

const FOOTER_SELECTOR = '.rp-doc-footer';

export default function BeforeDocFooter(props: GiscusProps) {
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
    }, []);

    if (!container || !props.repo) return null;
    return createPortal(<GiscusWidget {...props} />, container);
}
