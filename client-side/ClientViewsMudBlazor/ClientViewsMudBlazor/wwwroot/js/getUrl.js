export function getCurrentUrl() {
    const parts = window.location.href.split('/');
    return parts[parts.length - 1];
}
