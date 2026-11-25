// Giscus renders in a separate document. Map the resolved site palette to its theme.
const colors = {
    '--rp-c-bg': ['canvas-default', 'canvas-overlay', 'segmented-control-button-bg'],
    '--rp-c-bg-soft': ['canvas-inset', 'canvas-subtle', 'btn-bg', 'segmented-control-bg'],
    '--rp-c-bg-mute': ['btn-hover-bg', 'btn-active-bg', 'btn-selected-bg', 'action-list-item-default-hover-bg', 'neutral-muted'],
    '--rp-c-text-1': ['fg-default', 'btn-text'],
    '--rp-c-text-2': ['fg-muted', 'fg-subtle'],
    '--rp-c-divider': ['border-default', 'btn-border', 'btn-hover-border', 'segmented-control-button-selected-border'],
    '--rp-c-divider-light': ['border-muted'],
    '--rp-c-link': ['accent-fg', 'accent-emphasis', 'btn-primary-bg'],
    '--rp-c-brand-darker': ['btn-primary-hover-bg', 'btn-primary-selected-bg'],
    '--rp-c-brand-tint': ['accent-muted', 'accent-subtle'],
};

export function getLightTheme(host = 'https://giscus.app'): string {
    const style = getComputedStyle(document.documentElement);
    const declarations: string[] = [];
    for (const [variable, targets] of Object.entries(colors)) {
        const color = style.getPropertyValue(variable).trim();
        if (CSS.supports('color', color)) {
            for (const target of targets) {
                declarations.push(`--color-${target}:${color}`);
            }
        }
    }
    if (!declarations.length) return 'light';

    // Keep Giscus' defaults for syntax highlighting, statuses and other unmapped colors.
    let stylesheet: string;
    try {
        stylesheet = new URL('/themes/light.css', host).href;
    } catch {
        return 'light';
    }
    const css = `@import url("${stylesheet}");main{${declarations.join(';')}}`;
    return `data:text/css;charset=utf-8,${encodeURIComponent(css)}`;
}
