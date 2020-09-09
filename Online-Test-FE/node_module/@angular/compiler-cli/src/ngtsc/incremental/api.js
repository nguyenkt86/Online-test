/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/incremental/api", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9pbmNyZW1lbnRhbC9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtBYnNvbHV0ZUZzUGF0aH0gZnJvbSAnLi4vZmlsZV9zeXN0ZW0nO1xuXG4vKipcbiAqIEludGVyZmFjZSBvZiB0aGUgaW5jcmVtZW50YWwgYnVpbGQgZW5naW5lLlxuICpcbiAqIGBBbmFseXNpc1RgIGlzIGEgZ2VuZXJpYyB0eXBlIHJlcHJlc2VudGluZyBhIHVuaXQgb2Ygd29yay4gVGhpcyBpcyBnZW5lcmljIHRvIGF2b2lkIGEgY3ljbGljXG4gKiBkZXBlbmRlbmN5IGJldHdlZW4gdGhlIGluY3JlbWVudGFsIGVuZ2luZSBBUEkgZGVmaW5pdGlvbiBhbmQgaXRzIGNvbnN1bWVyKHMpLlxuICogYEZpbGVUeXBlQ2hlY2tEYXRhVGAgaXMgYSBnZW5lcmljIHR5cGUgcmVwcmVzZW50aW5nIHRlbXBsYXRlIHR5cGUtY2hlY2tpbmcgZGF0YSBmb3IgYSBwYXJ0aWN1bGFyXG4gKiBpbnB1dCBmaWxlLCB3aGljaCBpcyBnZW5lcmljIGZvciB0aGUgc2FtZSByZWFzb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5jcmVtZW50YWxCdWlsZDxBbmFseXNpc1QsIEZpbGVUeXBlQ2hlY2tEYXRhVD4ge1xuICAvKipcbiAgICogUmV0cmlldmUgdGhlIHByaW9yIGFuYWx5c2lzIHdvcmssIGlmIGFueSwgZG9uZSBmb3IgdGhlIGdpdmVuIHNvdXJjZSBmaWxlLlxuICAgKi9cbiAgcHJpb3JXb3JrRm9yKHNmOiB0cy5Tb3VyY2VGaWxlKTogQW5hbHlzaXNUW118bnVsbDtcblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIHByaW9yIHR5cGUtY2hlY2tpbmcgd29yaywgaWYgYW55LCB0aGF0J3MgYmVlbiBkb25lIGZvciB0aGUgZ2l2ZW4gc291cmNlIGZpbGUuXG4gICAqL1xuICBwcmlvclR5cGVDaGVja2luZ1Jlc3VsdHNGb3IoZmlsZVNmOiB0cy5Tb3VyY2VGaWxlKTogRmlsZVR5cGVDaGVja0RhdGFUfG51bGw7XG5cbiAgLyoqXG4gICAqIFJlcG9ydHMgdGhhdCB0ZW1wbGF0ZSB0eXBlLWNoZWNraW5nIGhhcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LCB3aXRoIGEgbWFwIG9mIHR5cGUtY2hlY2tpbmdcbiAgICogZGF0YSBmb3IgZWFjaCB1c2VyIGZpbGUgd2hpY2ggY2FuIGJlIHJldXNlZCBpbiBhIGZ1dHVyZSBpbmNyZW1lbnRhbCBpdGVyYXRpb24uXG4gICAqL1xuICByZWNvcmRTdWNjZXNzZnVsVHlwZUNoZWNrKHJlc3VsdHM6IE1hcDxBYnNvbHV0ZUZzUGF0aCwgRmlsZVR5cGVDaGVja0RhdGFUPik6IHZvaWQ7XG59XG5cbi8qKlxuICogVHJhY2tzIGRlcGVuZGVuY2llcyBiZXR3ZWVuIHNvdXJjZSBmaWxlcyBvciByZXNvdXJjZXMgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERlcGVuZGVuY3lUcmFja2VyPFQgZXh0ZW5kcyB7ZmlsZU5hbWU6IHN0cmluZ30gPSB0cy5Tb3VyY2VGaWxlPiB7XG4gIC8qKlxuICAgKiBSZWNvcmQgdGhhdCB0aGUgZmlsZSBgZnJvbWAgZGVwZW5kcyBvbiB0aGUgZmlsZSBgb25gLlxuICAgKi9cbiAgYWRkRGVwZW5kZW5jeShmcm9tOiBULCBvbjogVCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlY29yZCB0aGF0IHRoZSBmaWxlIGBmcm9tYCBkZXBlbmRzIG9uIHRoZSByZXNvdXJjZSBmaWxlIGBvbmAuXG4gICAqL1xuICBhZGRSZXNvdXJjZURlcGVuZGVuY3koZnJvbTogVCwgb246IEFic29sdXRlRnNQYXRoKTogdm9pZDtcblxuICAvKipcbiAgICogUmVjb3JkIHRoYXQgdGhlIGZpbGUgYGZyb21gIGRlcGVuZHMgb24gdGhlIGZpbGUgYG9uYCBhcyB3ZWxsIGFzIGBvbmAncyBkaXJlY3QgZGVwZW5kZW5jaWVzLlxuICAgKlxuICAgKiBUaGlzIG9wZXJhdGlvbiBpcyByZWlmaWVkIGltbWVkaWF0ZWx5LCBzbyBpZiBmdXR1cmUgZGVwZW5kZW5jaWVzIGFyZSBhZGRlZCB0byBgb25gIHRoZXkgd2lsbFxuICAgKiBub3QgYXV0b21hdGljYWxseSBiZSBhZGRlZCB0byBgZnJvbWAuXG4gICAqL1xuICBhZGRUcmFuc2l0aXZlRGVwZW5kZW5jeShmcm9tOiBULCBvbjogVCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlY29yZCB0aGF0IHRoZSBmaWxlIGBmcm9tYCBkZXBlbmRzIG9uIHRoZSByZXNvdXJjZSBkZXBlbmRlbmNpZXMgb2YgYHJlc291cmNlc09mYC5cbiAgICpcbiAgICogVGhpcyBvcGVyYXRpb24gaXMgcmVpZmllZCBpbW1lZGlhdGVseSwgc28gaWYgZnV0dXJlIHJlc291cmNlIGRlcGVuZGVuY2llcyBhcmUgYWRkZWQgdG9cbiAgICogYHJlc291cmNlc09mYCB0aGV5IHdpbGwgbm90IGF1dG9tYXRpY2FsbHkgYmUgYWRkZWQgdG8gYGZyb21gLlxuICAgKi9cbiAgYWRkVHJhbnNpdGl2ZVJlc291cmNlcyhmcm9tOiBULCByZXNvdXJjZXNPZjogVCk6IHZvaWQ7XG59XG4iXX0=