import { ɵɵdefineInjectable, ɵɵinject, PLATFORM_ID, Injectable, Inject, InjectionToken } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

// This service is based on the `ng2-cookies` package which sadly is not a service and does
class CookieService {
    constructor(
    // The type `Document` may not be used here. Although a fix is on its way,
    // we will go with `any` for now to support Angular 2.4.x projects.
    // Issue: https://github.com/angular/angular/issues/12631
    // Fix: https://github.com/angular/angular/pull/14894
    document, 
    // Get the `PLATFORM_ID` so we can check if we're in a browser.
    platformId) {
        this.document = document;
        this.platformId = platformId;
        this.documentIsAccessible = isPlatformBrowser(this.platformId);
    }
    /**
     * @param name Cookie name
     * @returns boolean - whether cookie with specified name exists
     */
    check(name) {
        if (!this.documentIsAccessible) {
            return false;
        }
        name = encodeURIComponent(name);
        const regExp = this.getCookieRegExp(name);
        const exists = regExp.test(this.document.cookie);
        return exists;
    }
    /**
     * @param name Cookie name
     * @returns property value
     */
    get(name) {
        if (this.documentIsAccessible && this.check(name)) {
            name = encodeURIComponent(name);
            const regExp = this.getCookieRegExp(name);
            const result = regExp.exec(this.document.cookie);
            return this.safeDecodeURIComponent(result[1]);
        }
        else {
            return '';
        }
    }
    /**
     * @returns all the cookies in json
     */
    getAll() {
        if (!this.documentIsAccessible) {
            return {};
        }
        const cookies = {};
        const document = this.document;
        if (document.cookie && document.cookie !== '') {
            document.cookie.split(';').forEach((currentCookie) => {
                const [cookieName, cookieValue] = currentCookie.split('=');
                cookies[this.safeDecodeURIComponent(cookieName.replace(/^ /, ''))] = this.safeDecodeURIComponent(cookieValue);
            });
        }
        return cookies;
    }
    /**
     * @param name     Cookie name
     * @param value    Cookie value
     * @param expires  Number of days until the cookies expires or an actual `Date`
     * @param path     Cookie path
     * @param domain   Cookie domain
     * @param secure   Secure flag
     * @param sameSite OWASP samesite token `Lax`, `None`, or `Strict`. Defaults to `Lax`
     */
    set(name, value, expires, path, domain, secure, sameSite = 'Lax') {
        if (!this.documentIsAccessible) {
            return;
        }
        let cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        if (expires) {
            if (typeof expires === 'number') {
                const dateExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                cookieString += 'expires=' + dateExpires.toUTCString() + ';';
            }
            else {
                cookieString += 'expires=' + expires.toUTCString() + ';';
            }
        }
        if (path) {
            cookieString += 'path=' + path + ';';
        }
        if (domain) {
            cookieString += 'domain=' + domain + ';';
        }
        if (secure === false && sameSite === 'None') {
            secure = true;
            console.warn(`[ngx-cookie-service] Cookie ${name} was forced with secure flag because sameSite=None.` +
                `More details : https://github.com/stevermeister/ngx-cookie-service/issues/86#issuecomment-597720130`);
        }
        if (secure) {
            cookieString += 'secure;';
        }
        cookieString += 'sameSite=' + sameSite + ';';
        this.document.cookie = cookieString;
    }
    /**
     * @param name   Cookie name
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    delete(name, path, domain, secure, sameSite = 'Lax') {
        if (!this.documentIsAccessible) {
            return;
        }
        this.set(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path, domain, secure, sameSite);
    }
    /**
     * @param path   Cookie path
     * @param domain Cookie domain
     */
    deleteAll(path, domain, secure, sameSite = 'Lax') {
        if (!this.documentIsAccessible) {
            return;
        }
        const cookies = this.getAll();
        for (const cookieName in cookies) {
            if (cookies.hasOwnProperty(cookieName)) {
                this.delete(cookieName, path, domain, secure, sameSite);
            }
        }
    }
    /**
     * @param name Cookie name
     * @returns property RegExp
     */
    getCookieRegExp(name) {
        const escapedName = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');
        return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
    }
    safeDecodeURIComponent(encodedURIComponent) {
        try {
            return decodeURIComponent(encodedURIComponent);
        }
        catch (_a) {
            // probably it is not uri encoded. return as is
            return encodedURIComponent;
        }
    }
}
CookieService.ɵprov = ɵɵdefineInjectable({ factory: function CookieService_Factory() { return new CookieService(ɵɵinject(DOCUMENT), ɵɵinject(PLATFORM_ID)); }, token: CookieService, providedIn: "root" });
CookieService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CookieService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: InjectionToken, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];

/*
 * Public API Surface of ngx-cookie-service
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CookieService };
//# sourceMappingURL=ngx-cookie-service.js.map
