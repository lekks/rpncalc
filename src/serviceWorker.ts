// Retire any worker left by the old Create React App deployment so it cannot
// keep serving an outdated application after the migration to Vite.
export function unregister() {
    if ('serviceWorker' in navigator) {
        const appUrl = new URL(import.meta.env.BASE_URL, window.location.href);
        navigator.serviceWorker.getRegistration(appUrl.href)
            .then(registration => {
                if (registration?.scope === appUrl.href) {
                    return registration.unregister();
                }
            })
            .catch(error => console.warn('Could not unregister the legacy service worker', error));
    }
}
