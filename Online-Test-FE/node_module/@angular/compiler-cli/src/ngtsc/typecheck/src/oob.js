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
        define("@angular/compiler-cli/src/ngtsc/typecheck/src/oob", ["require", "exports", "tslib", "typescript", "@angular/compiler-cli/src/ngtsc/diagnostics", "@angular/compiler-cli/src/ngtsc/typecheck/src/diagnostics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OutOfBandDiagnosticRecorderImpl = void 0;
    var tslib_1 = require("tslib");
    var ts = require("typescript");
    var diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
    var diagnostics_2 = require("@angular/compiler-cli/src/ngtsc/typecheck/src/diagnostics");
    var OutOfBandDiagnosticRecorderImpl = /** @class */ (function () {
        function OutOfBandDiagnosticRecorderImpl(resolver) {
            this.resolver = resolver;
            this._diagnostics = [];
        }
        Object.defineProperty(OutOfBandDiagnosticRecorderImpl.prototype, "diagnostics", {
            get: function () {
                return this._diagnostics;
            },
            enumerable: false,
            configurable: true
        });
        OutOfBandDiagnosticRecorderImpl.prototype.missingReferenceTarget = function (templateId, ref) {
            var mapping = this.resolver.getSourceMapping(templateId);
            var value = ref.value.trim();
            var errorMsg = "No directive found with exportAs '" + value + "'.";
            this._diagnostics.push(diagnostics_2.makeTemplateDiagnostic(templateId, mapping, ref.valueSpan || ref.sourceSpan, ts.DiagnosticCategory.Error, diagnostics_1.ngErrorCode(diagnostics_1.ErrorCode.MISSING_REFERENCE_TARGET), errorMsg));
        };
        OutOfBandDiagnosticRecorderImpl.prototype.missingPipe = function (templateId, ast) {
            var mapping = this.resolver.getSourceMapping(templateId);
            var errorMsg = "No pipe found with name '" + ast.name + "'.";
            var sourceSpan = this.resolver.toParseSourceSpan(templateId, ast.nameSpan);
            if (sourceSpan === null) {
                throw new Error("Assertion failure: no SourceLocation found for usage of pipe '" + ast.name + "'.");
            }
            this._diagnostics.push(diagnostics_2.makeTemplateDiagnostic(templateId, mapping, sourceSpan, ts.DiagnosticCategory.Error, diagnostics_1.ngErrorCode(diagnostics_1.ErrorCode.MISSING_PIPE), errorMsg));
        };
        OutOfBandDiagnosticRecorderImpl.prototype.illegalAssignmentToTemplateVar = function (templateId, assignment, target) {
            var mapping = this.resolver.getSourceMapping(templateId);
            var errorMsg = "Cannot use variable '" + assignment
                .name + "' as the left-hand side of an assignment expression. Template variables are read-only.";
            var sourceSpan = this.resolver.toParseSourceSpan(templateId, assignment.sourceSpan);
            if (sourceSpan === null) {
                throw new Error("Assertion failure: no SourceLocation found for property binding.");
            }
            this._diagnostics.push(diagnostics_2.makeTemplateDiagnostic(templateId, mapping, sourceSpan, ts.DiagnosticCategory.Error, diagnostics_1.ngErrorCode(diagnostics_1.ErrorCode.WRITE_TO_READ_ONLY_VARIABLE), errorMsg, {
                text: "The variable " + assignment.name + " is declared here.",
                span: target.valueSpan || target.sourceSpan,
            }));
        };
        OutOfBandDiagnosticRecorderImpl.prototype.duplicateTemplateVar = function (templateId, variable, firstDecl) {
            var mapping = this.resolver.getSourceMapping(templateId);
            var errorMsg = "Cannot redeclare variable '" + variable.name + "' as it was previously declared elsewhere for the same template.";
            // The allocation of the error here is pretty useless for variables declared in microsyntax,
            // since the sourceSpan refers to the entire microsyntax property, not a span for the specific
            // variable in question.
            //
            // TODO(alxhub): allocate to a tighter span once one is available.
            this._diagnostics.push(diagnostics_2.makeTemplateDiagnostic(templateId, mapping, variable.sourceSpan, ts.DiagnosticCategory.Error, diagnostics_1.ngErrorCode(diagnostics_1.ErrorCode.DUPLICATE_VARIABLE_DECLARATION), errorMsg, {
                text: "The variable '" + firstDecl.name + "' was first declared here.",
                span: firstDecl.sourceSpan,
            }));
        };
        OutOfBandDiagnosticRecorderImpl.prototype.requiresInlineTcb = function (templateId, node) {
            this._diagnostics.push(makeInlineDiagnostic(templateId, diagnostics_1.ErrorCode.INLINE_TCB_REQUIRED, node.name, "This component requires inline template type-checking, which is not supported by the current environment."));
        };
        OutOfBandDiagnosticRecorderImpl.prototype.requiresInlineTypeConstructors = function (templateId, node, directives) {
            var message;
            if (directives.length > 1) {
                message =
                    "This component uses directives which require inline type constructors, which are not supported by the current environment.";
            }
            else {
                message =
                    "This component uses a directive which requires an inline type constructor, which is not supported by the current environment.";
            }
            this._diagnostics.push(makeInlineDiagnostic(templateId, diagnostics_1.ErrorCode.INLINE_TYPE_CTOR_REQUIRED, node.name, message, directives.map(function (dir) { return diagnostics_1.makeRelatedInformation(dir.name, "Requires an inline type constructor."); })));
        };
        return OutOfBandDiagnosticRecorderImpl;
    }());
    exports.OutOfBandDiagnosticRecorderImpl = OutOfBandDiagnosticRecorderImpl;
    function makeInlineDiagnostic(templateId, code, node, messageText, relatedInformation) {
        return tslib_1.__assign(tslib_1.__assign({}, diagnostics_1.makeDiagnostic(code, node, messageText, relatedInformation)), { componentFile: node.getSourceFile(), templateId: templateId });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib29iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy90eXBlY2hlY2svc3JjL29vYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7O0lBR0gsK0JBQWlDO0lBRWpDLDJFQUFpRztJQUlqRyx5RkFBaUc7SUF3RGpHO1FBR0UseUNBQW9CLFFBQWdDO1lBQWhDLGFBQVEsR0FBUixRQUFRLENBQXdCO1lBRjVDLGlCQUFZLEdBQXlCLEVBQUUsQ0FBQztRQUVPLENBQUM7UUFFeEQsc0JBQUksd0RBQVc7aUJBQWY7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBRUQsZ0VBQXNCLEdBQXRCLFVBQXVCLFVBQXNCLEVBQUUsR0FBcUI7WUFDbEUsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzRCxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRS9CLElBQU0sUUFBUSxHQUFHLHVDQUFxQyxLQUFLLE9BQUksQ0FBQztZQUNoRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxvQ0FBc0IsQ0FDekMsVUFBVSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFDakYseUJBQVcsQ0FBQyx1QkFBUyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQscURBQVcsR0FBWCxVQUFZLFVBQXNCLEVBQUUsR0FBZ0I7WUFDbEQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FB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QixFQUFFLFVBQThCO1lBQ2hGLElBQUksT0FBZSxDQUFDO1lBQ3BCLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU87b0JBQ0gsNEhBQTRILENBQUM7YUFDbEk7aUJBQU07Z0JBQ0wsT0FBTztvQkFDSCwrSEFBK0gsQ0FBQzthQUNySTtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUN2QyxVQUFVLEVBQUUsdUJBQVMsQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFDbkUsVUFBVSxDQUFDLEdBQUcsQ0FDVixVQUFBLEdBQUcsSUFBSSxPQUFBLG9DQUFzQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsc0NBQXNDLENBQUMsRUFBeEUsQ0FBd0UsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RixDQUFDO1FBQ0gsc0NBQUM7SUFBRCxDQUFDLEFBN0ZELElBNkZDO0lBN0ZZLDBFQUErQjtJQStGNUMsU0FBUyxvQkFBb0IsQ0FDekIsVUFBc0IsRUFBRSxJQUF1RSxFQUMvRixJQUFhLEVBQUUsV0FBNkMsRUFDNUQsa0JBQXNEO1FBQ3hELDZDQUNLLDRCQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsa0JBQWtCLENBQUMsS0FDOUQsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFDbkMsVUFBVSxZQUFBLElBQ1Y7SUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QmluZGluZ1BpcGUsIFByb3BlcnR5V3JpdGUsIFRtcGxBc3RSZWZlcmVuY2UsIFRtcGxBc3RWYXJpYWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7RXJyb3JDb2RlLCBtYWtlRGlhZ25vc3RpYywgbWFrZVJlbGF0ZWRJbmZvcm1hdGlvbiwgbmdFcnJvckNvZGV9IGZyb20gJy4uLy4uL2RpYWdub3N0aWNzJztcbmltcG9ydCB7Q2xhc3NEZWNsYXJhdGlvbn0gZnJvbSAnLi4vLi4vcmVmbGVjdGlvbic7XG5pbXBvcnQge1RlbXBsYXRlSWR9IGZyb20gJy4uL2FwaSc7XG5cbmltcG9ydCB7bWFrZVRlbXBsYXRlRGlhZ25vc3RpYywgVGVtcGxhdGVEaWFnbm9zdGljLCBUZW1wbGF0ZVNvdXJjZVJlc29sdmVyfSBmcm9tICcuL2RpYWdub3N0aWNzJztcblxuXG5cbi8qKlxuICogQ29sbGVjdHMgYHRzLkRpYWdub3N0aWNgcyBvbiBwcm9ibGVtcyB3aGljaCBvY2N1ciBpbiB0aGUgdGVtcGxhdGUgd2hpY2ggYXJlbid0IGRpcmVjdGx5IHNvdXJjZWRcbiAqIGZyb20gVHlwZSBDaGVjayBCbG9ja3MuXG4gKlxuICogRHVyaW5nIHRoZSBjcmVhdGlvbiBvZiBhIFR5cGUgQ2hlY2sgQmxvY2ssIHRoZSB0ZW1wbGF0ZSBpcyB0cmF2ZXJzZWQgYW5kIHRoZVxuICogYE91dE9mQmFuZERpYWdub3N0aWNSZWNvcmRlcmAgaXMgY2FsbGVkIHRvIHJlY29yZCBjYXNlcyB3aGVuIGEgY29ycmVjdCBpbnRlcnByZXRhdGlvbiBmb3IgdGhlXG4gKiB0ZW1wbGF0ZSBjYW5ub3QgYmUgZm91bmQuIFRoZXNlIG9wZXJhdGlvbnMgY3JlYXRlIGB0cy5EaWFnbm9zdGljYHMgd2hpY2ggYXJlIHN0b3JlZCBieSB0aGVcbiAqIHJlY29yZGVyIGZvciBsYXRlciBkaXNwbGF5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE91dE9mQmFuZERpYWdub3N0aWNSZWNvcmRlciB7XG4gIHJlYWRvbmx5IGRpYWdub3N0aWNzOiBSZWFkb25seUFycmF5PFRlbXBsYXRlRGlhZ25vc3RpYz47XG5cbiAgLyoqXG4gICAqIFJlcG9ydHMgYSBgI3JlZj1cInRhcmdldFwiYCBleHByZXNzaW9uIGluIHRoZSB0ZW1wbGF0ZSBmb3Igd2hpY2ggYSB0YXJnZXQgZGlyZWN0aXZlIGNvdWxkIG5vdCBiZVxuICAgKiBmb3VuZC5cbiAgICpcbiAgICogQHBhcmFtIHRlbXBsYXRlSWQgdGhlIHRlbXBsYXRlIHR5cGUtY2hlY2tpbmcgSUQgb2YgdGhlIHRlbXBsYXRlIHdoaWNoIGNvbnRhaW5zIHRoZSBicm9rZW5cbiAgICogcmVmZXJlbmNlLlxuICAgKiBAcGFyYW0gcmVmIHRoZSBgVG1wbEFzdFJlZmVyZW5jZWAgd2hpY2ggY291bGQgbm90IGJlIG1hdGNoZWQgdG8gYSBkaXJlY3RpdmUuXG4gICAqL1xuICBtaXNzaW5nUmVmZXJlbmNlVGFyZ2V0KHRlbXBsYXRlSWQ6IFRlbXBsYXRlSWQsIHJlZjogVG1wbEFzdFJlZmVyZW5jZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlcG9ydHMgdXNhZ2Ugb2YgYSBgfCBwaXBlYCBleHByZXNzaW9uIGluIHRoZSB0ZW1wbGF0ZSBmb3Igd2hpY2ggdGhlIG5hbWVkIHBpcGUgY291bGQgbm90IGJlXG4gICAqIGZvdW5kLlxuICAgKlxuICAgKiBAcGFyYW0gdGVtcGxhdGVJZCB0aGUgdGVtcGxhdGUgdHlwZS1jaGVja2luZyBJRCBvZiB0aGUgdGVtcGxhdGUgd2hpY2ggY29udGFpbnMgdGhlIHVua25vd25cbiAgICogcGlwZS5cbiAgICogQHBhcmFtIGFzdCB0aGUgYEJpbmRpbmdQaXBlYCBpbnZvY2F0aW9uIG9mIHRoZSBwaXBlIHdoaWNoIGNvdWxkIG5vdCBiZSBmb3VuZC5cbiAgICovXG4gIG1pc3NpbmdQaXBlKHRlbXBsYXRlSWQ6IFRlbXBsYXRlSWQsIGFzdDogQmluZGluZ1BpcGUpOiB2b2lkO1xuXG4gIGlsbGVnYWxBc3NpZ25tZW50VG9UZW1wbGF0ZVZhcihcbiAgICAgIHRlbXBsYXRlSWQ6IFRlbXBsYXRlSWQsIGFzc2lnbm1lbnQ6IFByb3BlcnR5V3JpdGUsIHRhcmdldDogVG1wbEFzdFZhcmlhYmxlKTogdm9pZDtcblxuICAvKipcbiAgICogUmVwb3J0cyBhIGR1cGxpY2F0ZSBkZWNsYXJhdGlvbiBvZiBhIHRlbXBsYXRlIHZhcmlhYmxlLlxuICAgKlxuICAgKiBAcGFyYW0gdGVtcGxhdGVJZCB0aGUgdGVtcGxhdGUgdHlwZS1jaGVja2luZyBJRCBvZiB0aGUgdGVtcGxhdGUgd2hpY2ggY29udGFpbnMgdGhlIGR1cGxpY2F0ZVxuICAgKiBkZWNsYXJhdGlvbi5cbiAgICogQHBhcmFtIHZhcmlhYmxlIHRoZSBgVG1wbEFzdFZhcmlhYmxlYCB3aGljaCBkdXBsaWNhdGVzIGEgcHJldmlvdXNseSBkZWNsYXJlZCB2YXJpYWJsZS5cbiAgICogQHBhcmFtIGZpcnN0RGVjbCB0aGUgZmlyc3QgdmFyaWFibGUgZGVjbGFyYXRpb24gd2hpY2ggdXNlcyB0aGUgc2FtZSBuYW1lIGFzIGB2YXJpYWJsZWAuXG4gICAqL1xuICBkdXBsaWNhdGVUZW1wbGF0ZVZhcihcbiAgICAgIHRlbXBsYXRlSWQ6IFRlbXBsYXRlSWQsIHZhcmlhYmxlOiBUbXBsQXN0VmFyaWFibGUsIGZpcnN0RGVjbDogVG1wbEFzdFZhcmlhYmxlKTogdm9pZDtcblxuICByZXF1aXJlc0lubGluZVRjYih0ZW1wbGF0ZUlkOiBUZW1wbGF0ZUlkLCBub2RlOiBDbGFzc0RlY2xhcmF0aW9uKTogdm9pZDtcblxuICByZXF1aXJlc0lubGluZVR5cGVDb25zdHJ1Y3RvcnMoXG4gICAgICB0ZW1wbGF0ZUlkOiBUZW1wbGF0ZUlkLCBub2RlOiBDbGFzc0RlY2xhcmF0aW9uLCBkaXJlY3RpdmVzOiBDbGFzc0RlY2xhcmF0aW9uW10pOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgT3V0T2ZCYW5kRGlhZ25vc3RpY1JlY29yZGVySW1wbCBpbXBsZW1lbnRzIE91dE9mQmFuZERpYWdub3N0aWNSZWNvcmRlciB7XG4gIHByaXZhdGUgX2RpYWdub3N0aWNzOiBUZW1wbGF0ZURpYWdub3N0aWNbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzb2x2ZXI6IFRlbXBsYXRlU291cmNlUmVzb2x2ZXIpIHt9XG5cbiAgZ2V0IGRpYWdub3N0aWNzKCk6IFJlYWRvbmx5QXJyYXk8VGVtcGxhdGVEaWFnbm9zdGljPiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpYWdub3N0aWNzO1xuICB9XG5cbiAgbWlzc2luZ1JlZmVyZW5jZVRhcmdldCh0ZW1wbGF0ZUlkOiBUZW1wbGF0ZUlkLCByZWY6IFRtcGxBc3RSZWZlcmVuY2UpOiB2b2lkIHtcbiAgICBjb25zdCBtYXBwaW5nID0gdGhpcy5yZXNvbHZlci5nZXRTb3VyY2VNYXBwaW5nKHRlbXBsYXRlSWQpO1xuICAgIGNvbnN0IHZhbHVlID0gcmVmLnZhbHVlLnRyaW0oKTtcblxuICAgIGNvbnN0IGVycm9yTXNnID0gYE5vIGRpcmVjdGl2ZSBmb3VuZCB3aXRoIGV4cG9ydEFzICcke3ZhbHVlfScuYDtcbiAgICB0aGlzLl9kaWFnbm9zdGljcy5wdXNoKG1ha2VUZW1wbGF0ZURpYWdub3N0aWMoXG4gICAgICAgIHRlbXBsYXRlSWQsIG1hcHBpbmcsIHJlZi52YWx1ZVNwYW4gfHwgcmVmLnNvdXJjZVNwYW4sIHRzLkRpYWdub3N0aWNDYXRlZ29yeS5FcnJvcixcbiAgICAgICAgbmdFcnJvckNvZGUoRXJyb3JDb2RlLk1JU1NJTkdfUkVGRVJFTkNFX1RBUkdFVCksIGVycm9yTXNnKSk7XG4gIH1cblxuICBtaXNzaW5nUGlwZSh0ZW1wbGF0ZUlkOiBUZW1wbGF0ZUlkLCBhc3Q6IEJpbmRpbmdQaXBlKTogdm9pZCB7XG4gICAgY29uc3QgbWFwcGluZyA9IHRoaXMucmVzb2x2ZXIuZ2V0U291cmNlTWFwcGluZyh0ZW1wbGF0ZUlkKTtcbiAgICBjb25zdCBlcnJvck1zZyA9IGBObyBwaXBlIGZvdW5kIHdpdGggbmFtZSAnJHthc3QubmFtZX0nLmA7XG5cbiAgICBjb25zdCBzb3VyY2VTcGFuID0gdGhpcy5yZXNvbHZlci50b1BhcnNlU291cmNlU3Bhbih0ZW1wbGF0ZUlkLCBhc3QubmFtZVNwYW4pO1xuICAgIGlmIChzb3VyY2VTcGFuID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEFzc2VydGlvbiBmYWlsdXJlOiBubyBTb3VyY2VMb2NhdGlvbiBmb3VuZCBmb3IgdXNhZ2Ugb2YgcGlwZSAnJHthc3QubmFtZX0nLmApO1xuICAgIH1cbiAgICB0aGlzLl9kaWFnbm9zdGljcy5wdXNoKG1ha2VUZW1wbGF0ZURpYWdub3N0aWMoXG4gICAgICAgIHRlbXBsYXRlSWQsIG1hcHBpbmcsIHNvdXJjZVNwYW4sIHRzLkRpYWdub3N0aWNDYXRlZ29yeS5FcnJvcixcbiAgICAgICAgbmdFcnJvckNvZGUoRXJyb3JDb2RlLk1JU1NJTkdfUElQRSksIGVycm9yTXNnKSk7XG4gIH1cblxuICBpbGxlZ2FsQXNzaWdubWVudFRvVGVtcGxhdGVWYXIoXG4gICAgICB0ZW1wbGF0ZUlkOiBUZW1wbGF0ZUlkLCBhc3NpZ25tZW50OiBQcm9wZXJ0eVdyaXRlLCB0YXJnZXQ6IFRtcGxBc3RWYXJpYWJsZSk6IHZvaWQge1xuICAgIGNvbnN0IG1hcHBpbmcgPSB0aGlzLnJlc29sdmVyLmdldFNvdXJjZU1hcHBpbmcodGVtcGxhdGVJZCk7XG4gICAgY29uc3QgZXJyb3JNc2cgPSBgQ2Fubm90IHVzZSB2YXJpYWJsZSAnJHtcbiAgICAgICAgYXNzaWdubWVudFxuICAgICAgICAgICAgLm5hbWV9JyBhcyB0aGUgbGVmdC1oYW5kIHNpZGUgb2YgYW4gYXNzaWdubWVudCBleHByZXNzaW9uLiBUZW1wbGF0ZSB2YXJpYWJsZXMgYXJlIHJlYWQtb25seS5gO1xuXG4gICAgY29uc3Qgc291cmNlU3BhbiA9IHRoaXMucmVzb2x2ZXIudG9QYXJzZVNvdXJjZVNwYW4odGVtcGxhdGVJZCwgYXNzaWdubWVudC5zb3VyY2VTcGFuKTtcbiAgICBpZiAoc291cmNlU3BhbiA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBc3NlcnRpb24gZmFpbHVyZTogbm8gU291cmNlTG9jYXRpb24gZm91bmQgZm9yIHByb3BlcnR5IGJpbmRpbmcuYCk7XG4gICAgfVxuICAgIHRoaXMuX2RpYWdub3N0aWNzLnB1c2gobWFrZVRlbXBsYXRlRGlhZ25vc3RpYyhcbiAgICAgICAgdGVtcGxhdGVJZCwgbWFwcGluZywgc291cmNlU3BhbiwgdHMuRGlhZ25vc3RpY0NhdGVnb3J5LkVycm9yLFxuICAgICAgICBuZ0Vycm9yQ29kZShFcnJvckNvZGUuV1JJVEVfVE9fUkVBRF9PTkxZX1ZBUklBQkxFKSwgZXJyb3JNc2csIHtcbiAgICAgICAgICB0ZXh0OiBgVGhlIHZhcmlhYmxlICR7YXNzaWdubWVudC5uYW1lfSBpcyBkZWNsYXJlZCBoZXJlLmAsXG4gICAgICAgICAgc3BhbjogdGFyZ2V0LnZhbHVlU3BhbiB8fCB0YXJnZXQuc291cmNlU3BhbixcbiAgICAgICAgfSkpO1xuICB9XG5cbiAgZHVwbGljYXRlVGVtcGxhdGVWYXIoXG4gICAgICB0ZW1wbGF0ZUlkOiBUZW1wbGF0ZUlkLCB2YXJpYWJsZTogVG1wbEFzdFZhcmlhYmxlLCBmaXJzdERlY2w6IFRtcGxBc3RWYXJpYWJsZSk6IHZvaWQge1xuICAgIGNvbnN0IG1hcHBpbmcgPSB0aGlzLnJlc29sdmVyLmdldFNvdXJjZU1hcHBpbmcodGVtcGxhdGVJZCk7XG4gICAgY29uc3QgZXJyb3JNc2cgPSBgQ2Fubm90IHJlZGVjbGFyZSB2YXJpYWJsZSAnJHtcbiAgICAgICAgdmFyaWFibGUubmFtZX0nIGFzIGl0IHdhcyBwcmV2aW91c2x5IGRlY2xhcmVkIGVsc2V3aGVyZSBmb3IgdGhlIHNhbWUgdGVtcGxhdGUuYDtcblxuICAgIC8vIFRoZSBhbGxvY2F0aW9uIG9mIHRoZSBlcnJvciBoZXJlIGlzIHByZXR0eSB1c2VsZXNzIGZvciB2YXJpYWJsZXMgZGVjbGFyZWQgaW4gbWljcm9zeW50YXgsXG4gICAgLy8gc2luY2UgdGhlIHNvdXJjZVNwYW4gcmVmZXJzIHRvIHRoZSBlbnRpcmUgbWljcm9zeW50YXggcHJvcGVydHksIG5vdCBhIHNwYW4gZm9yIHRoZSBzcGVjaWZpY1xuICAgIC8vIHZhcmlhYmxlIGluIHF1ZXN0aW9uLlxuICAgIC8vXG4gICAgLy8gVE9ETyhhbHhodWIpOiBhbGxvY2F0ZSB0byBhIHRpZ2h0ZXIgc3BhbiBvbmNlIG9uZSBpcyBhdmFpbGFibGUuXG4gICAgdGhpcy5fZGlhZ25vc3RpY3MucHVzaChtYWtlVGVtcGxhdGVEaWFnbm9zdGljKFxuICAgICAgICB0ZW1wbGF0ZUlkLCBtYXBwaW5nLCB2YXJpYWJsZS5zb3VyY2VTcGFuLCB0cy5EaWFnbm9zdGljQ2F0ZWdvcnkuRXJyb3IsXG4gICAgICAgIG5nRXJyb3JDb2RlKEVycm9yQ29kZS5EVVBMSUNBVEVfVkFSSUFCTEVfREVDTEFSQVRJT04pLCBlcnJvck1zZywge1xuICAgICAgICAgIHRleHQ6IGBUaGUgdmFyaWFibGUgJyR7Zmlyc3REZWNsLm5hbWV9JyB3YXMgZmlyc3QgZGVjbGFyZWQgaGVyZS5gLFxuICAgICAgICAgIHNwYW46IGZpcnN0RGVjbC5zb3VyY2VTcGFuLFxuICAgICAgICB9KSk7XG4gIH1cblxuICByZXF1aXJlc0lubGluZVRjYih0ZW1wbGF0ZUlkOiBUZW1wbGF0ZUlkLCBub2RlOiBDbGFzc0RlY2xhcmF0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZGlhZ25vc3RpY3MucHVzaChtYWtlSW5saW5lRGlhZ25vc3RpYyhcbiAgICAgICAgdGVtcGxhdGVJZCwgRXJyb3JDb2RlLklOTElORV9UQ0JfUkVRVUlSRUQsIG5vZGUubmFtZSxcbiAgICAgICAgYFRoaXMgY29tcG9uZW50IHJlcXVpcmVzIGlubGluZSB0ZW1wbGF0ZSB0eXBlLWNoZWNraW5nLCB3aGljaCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50IGVudmlyb25tZW50LmApKTtcbiAgfVxuXG4gIHJlcXVpcmVzSW5saW5lVHlwZUNvbnN0cnVjdG9ycyhcbiAgICAgIHRlbXBsYXRlSWQ6IFRlbXBsYXRlSWQsIG5vZGU6IENsYXNzRGVjbGFyYXRpb24sIGRpcmVjdGl2ZXM6IENsYXNzRGVjbGFyYXRpb25bXSk6IHZvaWQge1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgaWYgKGRpcmVjdGl2ZXMubGVuZ3RoID4gMSkge1xuICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgYFRoaXMgY29tcG9uZW50IHVzZXMgZGlyZWN0aXZlcyB3aGljaCByZXF1aXJlIGlubGluZSB0eXBlIGNvbnN0cnVjdG9ycywgd2hpY2ggYXJlIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgYFRoaXMgY29tcG9uZW50IHVzZXMgYSBkaXJlY3RpdmUgd2hpY2ggcmVxdWlyZXMgYW4gaW5saW5lIHR5cGUgY29uc3RydWN0b3IsIHdoaWNoIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuYDtcbiAgICB9XG5cbiAgICB0aGlzLl9kaWFnbm9zdGljcy5wdXNoKG1ha2VJbmxpbmVEaWFnbm9zdGljKFxuICAgICAgICB0ZW1wbGF0ZUlkLCBFcnJvckNvZGUuSU5MSU5FX1RZUEVfQ1RPUl9SRVFVSVJFRCwgbm9kZS5uYW1lLCBtZXNzYWdlLFxuICAgICAgICBkaXJlY3RpdmVzLm1hcChcbiAgICAgICAgICAgIGRpciA9PiBtYWtlUmVsYXRlZEluZm9ybWF0aW9uKGRpci5uYW1lLCBgUmVxdWlyZXMgYW4gaW5saW5lIHR5cGUgY29uc3RydWN0b3IuYCkpKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZUlubGluZURpYWdub3N0aWMoXG4gICAgdGVtcGxhdGVJZDogVGVtcGxhdGVJZCwgY29kZTogRXJyb3JDb2RlLklOTElORV9UQ0JfUkVRVUlSRUR8RXJyb3JDb2RlLklOTElORV9UWVBFX0NUT1JfUkVRVUlSRUQsXG4gICAgbm9kZTogdHMuTm9kZSwgbWVzc2FnZVRleHQ6IHN0cmluZ3x0cy5EaWFnbm9zdGljTWVzc2FnZUNoYWluLFxuICAgIHJlbGF0ZWRJbmZvcm1hdGlvbj86IHRzLkRpYWdub3N0aWNSZWxhdGVkSW5mb3JtYXRpb25bXSk6IFRlbXBsYXRlRGlhZ25vc3RpYyB7XG4gIHJldHVybiB7XG4gICAgLi4ubWFrZURpYWdub3N0aWMoY29kZSwgbm9kZSwgbWVzc2FnZVRleHQsIHJlbGF0ZWRJbmZvcm1hdGlvbiksXG4gICAgY29tcG9uZW50RmlsZTogbm9kZS5nZXRTb3VyY2VGaWxlKCksXG4gICAgdGVtcGxhdGVJZCxcbiAgfTtcbn1cbiJdfQ==