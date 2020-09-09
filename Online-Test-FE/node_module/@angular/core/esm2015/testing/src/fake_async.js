/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { discardPeriodicTasksFallback, fakeAsyncFallback, flushFallback, flushMicrotasksFallback, resetFakeAsyncZoneFallback, tickFallback } from './fake_async_fallback';
const _Zone = typeof Zone !== 'undefined' ? Zone : null;
const fakeAsyncTestModule = _Zone && _Zone[_Zone.__symbol__('fakeAsyncTest')];
/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * @publicApi
 */
export function resetFakeAsyncZone() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.resetFakeAsyncZone();
    }
    else {
        return resetFakeAsyncZoneFallback();
    }
}
/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @param fn
 * @returns The function wrapped to be executed in the fakeAsync zone
 *
 * @publicApi
 */
export function fakeAsync(fn) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.fakeAsync(fn);
    }
    else {
        return fakeAsyncFallback(fn);
    }
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @param millis, the number of millisecond to advance the virtual timer
 * @param tickOptions, the options of tick with a flag called
 * processNewMacroTasksSynchronously, whether to invoke the new macroTasks, by default is
 * false, means the new macroTasks will be invoked
 *
 * For example,
 *
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick();
 *   expect(nestedTimeoutInvoked).toBe(true);
 * }));
 *
 * in this case, we have a nested timeout (new macroTask), when we tick, both the
 * funcWithNestedTimeout and the nested timeout both will be invoked.
 *
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick(0, {processNewMacroTasksSynchronously: false});
 *   expect(nestedTimeoutInvoked).toBe(false);
 * }));
 *
 * if we pass the tickOptions with processNewMacroTasksSynchronously to be false, the nested timeout
 * will not be invoked.
 *
 *
 * @publicApi
 */
export function tick(millis = 0, tickOptions = {
    processNewMacroTasksSynchronously: true
}) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.tick(millis, tickOptions);
    }
    else {
        return tickFallback(millis, tickOptions);
    }
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone by
 * draining the macrotask queue until it is empty. The returned value is the milliseconds
 * of time that would have been elapsed.
 *
 * @param maxTurns
 * @returns The simulated time elapsed, in millis.
 *
 * @publicApi
 */
export function flush(maxTurns) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flush(maxTurns);
    }
    else {
        return flushFallback(maxTurns);
    }
}
/**
 * Discard all remaining periodic tasks.
 *
 * @publicApi
 */
export function discardPeriodicTasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.discardPeriodicTasks();
    }
    else {
        discardPeriodicTasksFallback();
    }
}
/**
 * Flush any pending microtasks.
 *
 * @publicApi
 */
export function flushMicrotasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flushMicrotasks();
    }
    else {
        return flushMicrotasksFallback();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZV9hc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvZmFrZV9hc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsNEJBQTRCLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFFLDBCQUEwQixFQUFFLFlBQVksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRXhLLE1BQU0sS0FBSyxHQUFRLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDN0QsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUU5RTs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxrQkFBa0I7SUFDaEMsSUFBSSxtQkFBbUIsRUFBRTtRQUN2QixPQUFPLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFLENBQUM7S0FDakQ7U0FBTTtRQUNMLE9BQU8sMEJBQTBCLEVBQUUsQ0FBQztLQUNyQztBQUNILENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FBQyxFQUFZO0lBQ3BDLElBQUksbUJBQW1CLEVBQUU7UUFDdkIsT0FBTyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDMUM7U0FBTTtRQUNMLE9BQU8saUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDOUI7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0RHO0FBQ0gsTUFBTSxVQUFVLElBQUksQ0FDaEIsU0FBaUIsQ0FBQyxFQUFFLGNBQTREO0lBQzlFLGlDQUFpQyxFQUFFLElBQUk7Q0FDeEM7SUFDSCxJQUFJLG1CQUFtQixFQUFFO1FBQ3ZCLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUN0RDtTQUFNO1FBQ0wsT0FBTyxZQUFZLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQzFDO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sVUFBVSxLQUFLLENBQUMsUUFBaUI7SUFDckMsSUFBSSxtQkFBbUIsRUFBRTtRQUN2QixPQUFPLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM1QztTQUFNO1FBQ0wsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsSUFBSSxtQkFBbUIsRUFBRTtRQUN2QixPQUFPLG1CQUFtQixDQUFDLG9CQUFvQixFQUFFLENBQUM7S0FDbkQ7U0FBTTtRQUNMLDRCQUE0QixFQUFFLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxlQUFlO0lBQzdCLElBQUksbUJBQW1CLEVBQUU7UUFDdkIsT0FBTyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUM5QztTQUFNO1FBQ0wsT0FBTyx1QkFBdUIsRUFBRSxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtkaXNjYXJkUGVyaW9kaWNUYXNrc0ZhbGxiYWNrLCBmYWtlQXN5bmNGYWxsYmFjaywgZmx1c2hGYWxsYmFjaywgZmx1c2hNaWNyb3Rhc2tzRmFsbGJhY2ssIHJlc2V0RmFrZUFzeW5jWm9uZUZhbGxiYWNrLCB0aWNrRmFsbGJhY2t9IGZyb20gJy4vZmFrZV9hc3luY19mYWxsYmFjayc7XG5cbmNvbnN0IF9ab25lOiBhbnkgPSB0eXBlb2YgWm9uZSAhPT0gJ3VuZGVmaW5lZCcgPyBab25lIDogbnVsbDtcbmNvbnN0IGZha2VBc3luY1Rlc3RNb2R1bGUgPSBfWm9uZSAmJiBfWm9uZVtfWm9uZS5fX3N5bWJvbF9fKCdmYWtlQXN5bmNUZXN0JyldO1xuXG4vKipcbiAqIENsZWFycyBvdXQgdGhlIHNoYXJlZCBmYWtlIGFzeW5jIHpvbmUgZm9yIGEgdGVzdC5cbiAqIFRvIGJlIGNhbGxlZCBpbiBhIGdsb2JhbCBgYmVmb3JlRWFjaGAuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRGYWtlQXN5bmNab25lKCk6IHZvaWQge1xuICBpZiAoZmFrZUFzeW5jVGVzdE1vZHVsZSkge1xuICAgIHJldHVybiBmYWtlQXN5bmNUZXN0TW9kdWxlLnJlc2V0RmFrZUFzeW5jWm9uZSgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXNldEZha2VBc3luY1pvbmVGYWxsYmFjaygpO1xuICB9XG59XG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBpbiB0aGUgZmFrZUFzeW5jIHpvbmU6XG4gKiAtIG1pY3JvdGFza3MgYXJlIG1hbnVhbGx5IGV4ZWN1dGVkIGJ5IGNhbGxpbmcgYGZsdXNoTWljcm90YXNrcygpYCxcbiAqIC0gdGltZXJzIGFyZSBzeW5jaHJvbm91cywgYHRpY2soKWAgc2ltdWxhdGVzIHRoZSBhc3luY2hyb25vdXMgcGFzc2FnZSBvZiB0aW1lLlxuICpcbiAqIElmIHRoZXJlIGFyZSBhbnkgcGVuZGluZyB0aW1lcnMgYXQgdGhlIGVuZCBvZiB0aGUgZnVuY3Rpb24sIGFuIGV4Y2VwdGlvbiB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBDYW4gYmUgdXNlZCB0byB3cmFwIGluamVjdCgpIGNhbGxzLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3Rlc3RpbmcvdHMvZmFrZV9hc3luYy50cyByZWdpb249J2Jhc2ljJ31cbiAqXG4gKiBAcGFyYW0gZm5cbiAqIEByZXR1cm5zIFRoZSBmdW5jdGlvbiB3cmFwcGVkIHRvIGJlIGV4ZWN1dGVkIGluIHRoZSBmYWtlQXN5bmMgem9uZVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZha2VBc3luYyhmbjogRnVuY3Rpb24pOiAoLi4uYXJnczogYW55W10pID0+IGFueSB7XG4gIGlmIChmYWtlQXN5bmNUZXN0TW9kdWxlKSB7XG4gICAgcmV0dXJuIGZha2VBc3luY1Rlc3RNb2R1bGUuZmFrZUFzeW5jKGZuKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFrZUFzeW5jRmFsbGJhY2soZm4pO1xuICB9XG59XG5cbi8qKlxuICogU2ltdWxhdGVzIHRoZSBhc3luY2hyb25vdXMgcGFzc2FnZSBvZiB0aW1lIGZvciB0aGUgdGltZXJzIGluIHRoZSBmYWtlQXN5bmMgem9uZS5cbiAqXG4gKiBUaGUgbWljcm90YXNrcyBxdWV1ZSBpcyBkcmFpbmVkIGF0IHRoZSB2ZXJ5IHN0YXJ0IG9mIHRoaXMgZnVuY3Rpb24gYW5kIGFmdGVyIGFueSB0aW1lciBjYWxsYmFja1xuICogaGFzIGJlZW4gZXhlY3V0ZWQuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvdGVzdGluZy90cy9mYWtlX2FzeW5jLnRzIHJlZ2lvbj0nYmFzaWMnfVxuICpcbiAqIEBwYXJhbSBtaWxsaXMsIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmQgdG8gYWR2YW5jZSB0aGUgdmlydHVhbCB0aW1lclxuICogQHBhcmFtIHRpY2tPcHRpb25zLCB0aGUgb3B0aW9ucyBvZiB0aWNrIHdpdGggYSBmbGFnIGNhbGxlZFxuICogcHJvY2Vzc05ld01hY3JvVGFza3NTeW5jaHJvbm91c2x5LCB3aGV0aGVyIHRvIGludm9rZSB0aGUgbmV3IG1hY3JvVGFza3MsIGJ5IGRlZmF1bHQgaXNcbiAqIGZhbHNlLCBtZWFucyB0aGUgbmV3IG1hY3JvVGFza3Mgd2lsbCBiZSBpbnZva2VkXG4gKlxuICogRm9yIGV4YW1wbGUsXG4gKlxuICogaXQgKCd0ZXN0IHdpdGggbmVzdGVkIHNldFRpbWVvdXQnLCBmYWtlQXN5bmMoKCkgPT4ge1xuICogICBsZXQgbmVzdGVkVGltZW91dEludm9rZWQgPSBmYWxzZTtcbiAqICAgZnVuY3Rpb24gZnVuY1dpdGhOZXN0ZWRUaW1lb3V0KCkge1xuICogICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICAgICAgbmVzdGVkVGltZW91dEludm9rZWQgPSB0cnVlO1xuICogICAgIH0pO1xuICogICB9O1xuICogICBzZXRUaW1lb3V0KGZ1bmNXaXRoTmVzdGVkVGltZW91dCk7XG4gKiAgIHRpY2soKTtcbiAqICAgZXhwZWN0KG5lc3RlZFRpbWVvdXRJbnZva2VkKS50b0JlKHRydWUpO1xuICogfSkpO1xuICpcbiAqIGluIHRoaXMgY2FzZSwgd2UgaGF2ZSBhIG5lc3RlZCB0aW1lb3V0IChuZXcgbWFjcm9UYXNrKSwgd2hlbiB3ZSB0aWNrLCBib3RoIHRoZVxuICogZnVuY1dpdGhOZXN0ZWRUaW1lb3V0IGFuZCB0aGUgbmVzdGVkIHRpbWVvdXQgYm90aCB3aWxsIGJlIGludm9rZWQuXG4gKlxuICogaXQgKCd0ZXN0IHdpdGggbmVzdGVkIHNldFRpbWVvdXQnLCBmYWtlQXN5bmMoKCkgPT4ge1xuICogICBsZXQgbmVzdGVkVGltZW91dEludm9rZWQgPSBmYWxzZTtcbiAqICAgZnVuY3Rpb24gZnVuY1dpdGhOZXN0ZWRUaW1lb3V0KCkge1xuICogICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICAgICAgbmVzdGVkVGltZW91dEludm9rZWQgPSB0cnVlO1xuICogICAgIH0pO1xuICogICB9O1xuICogICBzZXRUaW1lb3V0KGZ1bmNXaXRoTmVzdGVkVGltZW91dCk7XG4gKiAgIHRpY2soMCwge3Byb2Nlc3NOZXdNYWNyb1Rhc2tzU3luY2hyb25vdXNseTogZmFsc2V9KTtcbiAqICAgZXhwZWN0KG5lc3RlZFRpbWVvdXRJbnZva2VkKS50b0JlKGZhbHNlKTtcbiAqIH0pKTtcbiAqXG4gKiBpZiB3ZSBwYXNzIHRoZSB0aWNrT3B0aW9ucyB3aXRoIHByb2Nlc3NOZXdNYWNyb1Rhc2tzU3luY2hyb25vdXNseSB0byBiZSBmYWxzZSwgdGhlIG5lc3RlZCB0aW1lb3V0XG4gKiB3aWxsIG5vdCBiZSBpbnZva2VkLlxuICpcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aWNrKFxuICAgIG1pbGxpczogbnVtYmVyID0gMCwgdGlja09wdGlvbnM6IHtwcm9jZXNzTmV3TWFjcm9UYXNrc1N5bmNocm9ub3VzbHk6IGJvb2xlYW59ID0ge1xuICAgICAgcHJvY2Vzc05ld01hY3JvVGFza3NTeW5jaHJvbm91c2x5OiB0cnVlXG4gICAgfSk6IHZvaWQge1xuICBpZiAoZmFrZUFzeW5jVGVzdE1vZHVsZSkge1xuICAgIHJldHVybiBmYWtlQXN5bmNUZXN0TW9kdWxlLnRpY2sobWlsbGlzLCB0aWNrT3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRpY2tGYWxsYmFjayhtaWxsaXMsIHRpY2tPcHRpb25zKTtcbiAgfVxufVxuXG4vKipcbiAqIFNpbXVsYXRlcyB0aGUgYXN5bmNocm9ub3VzIHBhc3NhZ2Ugb2YgdGltZSBmb3IgdGhlIHRpbWVycyBpbiB0aGUgZmFrZUFzeW5jIHpvbmUgYnlcbiAqIGRyYWluaW5nIHRoZSBtYWNyb3Rhc2sgcXVldWUgdW50aWwgaXQgaXMgZW1wdHkuIFRoZSByZXR1cm5lZCB2YWx1ZSBpcyB0aGUgbWlsbGlzZWNvbmRzXG4gKiBvZiB0aW1lIHRoYXQgd291bGQgaGF2ZSBiZWVuIGVsYXBzZWQuXG4gKlxuICogQHBhcmFtIG1heFR1cm5zXG4gKiBAcmV0dXJucyBUaGUgc2ltdWxhdGVkIHRpbWUgZWxhcHNlZCwgaW4gbWlsbGlzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZsdXNoKG1heFR1cm5zPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKGZha2VBc3luY1Rlc3RNb2R1bGUpIHtcbiAgICByZXR1cm4gZmFrZUFzeW5jVGVzdE1vZHVsZS5mbHVzaChtYXhUdXJucyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZsdXNoRmFsbGJhY2sobWF4VHVybnMpO1xuICB9XG59XG5cbi8qKlxuICogRGlzY2FyZCBhbGwgcmVtYWluaW5nIHBlcmlvZGljIHRhc2tzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2NhcmRQZXJpb2RpY1Rhc2tzKCk6IHZvaWQge1xuICBpZiAoZmFrZUFzeW5jVGVzdE1vZHVsZSkge1xuICAgIHJldHVybiBmYWtlQXN5bmNUZXN0TW9kdWxlLmRpc2NhcmRQZXJpb2RpY1Rhc2tzKCk7XG4gIH0gZWxzZSB7XG4gICAgZGlzY2FyZFBlcmlvZGljVGFza3NGYWxsYmFjaygpO1xuICB9XG59XG5cbi8qKlxuICogRmx1c2ggYW55IHBlbmRpbmcgbWljcm90YXNrcy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbHVzaE1pY3JvdGFza3MoKTogdm9pZCB7XG4gIGlmIChmYWtlQXN5bmNUZXN0TW9kdWxlKSB7XG4gICAgcmV0dXJuIGZha2VBc3luY1Rlc3RNb2R1bGUuZmx1c2hNaWNyb3Rhc2tzKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZsdXNoTWljcm90YXNrc0ZhbGxiYWNrKCk7XG4gIH1cbn1cbiJdfQ==