import { Injectable, Component, Input, EventEmitter, Inject, Output, HostBinding, NgModule } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Configuration service, provides default values for the AccordionComponent.
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'ngx-bootstrap/collapse';

const _c0 = ["*"];
const _c1 = function (a0) { return { "text-muted": a0 }; };
function AccordionPanelComponent_button_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "button", 7);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(2, _c1, ctx_r0.isDisabled));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ctx_r0.heading, " ");
} }
const _c2 = [[["", "accordion-heading", ""]], "*"];
const _c3 = ["[accordion-heading]", "*"];
class AccordionConfig {
    constructor() {
        /**
         * Whether the other panels should be closed when a panel is opened
         */
        this.closeOthers = false;
        /**
         * turn on/off animation
         */
        this.isAnimated = false;
    }
}
AccordionConfig.ɵfac = function AccordionConfig_Factory(t) { return new (t || AccordionConfig)(); };
AccordionConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: AccordionConfig, factory: AccordionConfig.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AccordionConfig, [{
        type: Injectable
    }], function () { return []; }, null); })();
if (false) {
    /**
     * Whether the other panels should be closed when a panel is opened
     * @type {?}
     */
    AccordionConfig.prototype.closeOthers;
    /**
     * turn on/off animation
     * @type {?}
     */
    AccordionConfig.prototype.isAnimated;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Displays collapsible content panels for presenting information in a limited amount of space.
 */
class AccordionComponent {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * turn on/off animation
         */
        this.isAnimated = false;
        this.groups = [];
        Object.assign(this, config);
    }
    /**
     * @param {?} openGroup
     * @return {?}
     */
    closeOtherPanels(openGroup) {
        if (!this.closeOthers) {
            return;
        }
        this.groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        }));
    }
    /**
     * @param {?} group
     * @return {?}
     */
    addGroup(group) {
        group.isAnimated = this.isAnimated;
        this.groups.push(group);
    }
    /**
     * @param {?} group
     * @return {?}
     */
    removeGroup(group) {
        /** @type {?} */
        const index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    }
}
AccordionComponent.ɵfac = function AccordionComponent_Factory(t) { return new (t || AccordionComponent)(ɵngcc0.ɵɵdirectiveInject(AccordionConfig)); };
AccordionComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AccordionComponent, selectors: [["accordion"]], hostAttrs: ["role", "tablist", 1, "panel-group", 2, "display", "block"], hostVars: 1, hostBindings: function AccordionComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵattribute("aria-multiselectable", ctx.closeOthers);
    } }, inputs: { isAnimated: "isAnimated", closeOthers: "closeOthers" }, ngContentSelectors: _c0, decls: 1, vars: 0, template: function AccordionComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef();
        ɵngcc0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/** @nocollapse */
AccordionComponent.ctorParameters = () => [
    { type: AccordionConfig }
];
AccordionComponent.propDecorators = {
    isAnimated: [{ type: Input }],
    closeOthers: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AccordionComponent, [{
        type: Component,
        args: [{
                selector: 'accordion',
                template: `<ng-content></ng-content>`,
                host: {
                    '[attr.aria-multiselectable]': 'closeOthers',
                    role: 'tablist',
                    class: 'panel-group',
                    style: 'display: block'
                }
            }]
    }], function () { return [{ type: AccordionConfig }]; }, { isAnimated: [{
            type: Input
        }], closeOthers: [{
            type: Input
        }] }); })();
if (false) {
    /**
     * turn on/off animation
     * @type {?}
     */
    AccordionComponent.prototype.isAnimated;
    /**
     * if `true` expanding one item will close all others
     * @type {?}
     */
    AccordionComponent.prototype.closeOthers;
    /**
     * @type {?}
     * @protected
     */
    AccordionComponent.prototype.groups;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * ### Accordion heading
 * Instead of using `heading` attribute on the `accordion-group`, you can use
 * an `accordion-heading` attribute on `any` element inside of a group that
 * will be used as group's header template.
 */
class AccordionPanelComponent {
    /**
     * @param {?} accordion
     */
    constructor(accordion) {
        /**
         * turn on/off animation
         */
        this.isAnimated = false;
        /**
         * Emits when the opened state changes
         */
        this.isOpenChange = new EventEmitter();
        this._isOpen = false;
        this.accordion = accordion;
    }
    // Questionable, maybe .panel-open should be on child div.panel element?
    /**
     * Is accordion group open or closed. This property supports two-way binding
     * @return {?}
     */
    get isOpen() {
        return this._isOpen;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        if (value !== this.isOpen) {
            if (value) {
                this.accordion.closeOtherPanels(this);
            }
            this._isOpen = value;
            Promise.resolve(null).then((/**
             * @return {?}
             */
            () => {
                this.isOpenChange.emit(value);
            }))
                .catch((/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                /* tslint:disable: no-console */
                console.log(error);
            }));
        }
    }
    /**
     * @return {?}
     */
    get isBs3() {
        return isBs3();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.panelClass = this.panelClass || 'panel-default';
        this.accordion.addGroup(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.accordion.removeGroup(this);
    }
    /**
     * @return {?}
     */
    toggleOpen() {
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
}
AccordionPanelComponent.ɵfac = function AccordionPanelComponent_Factory(t) { return new (t || AccordionPanelComponent)(ɵngcc0.ɵɵdirectiveInject(AccordionComponent)); };
AccordionPanelComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: AccordionPanelComponent, selectors: [["accordion-group"], ["accordion-panel"]], hostAttrs: [1, "panel", 2, "display", "block"], hostVars: 2, hostBindings: function AccordionPanelComponent_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("panel-open", ctx.isOpen);
    } }, inputs: { isOpen: "isOpen", panelClass: "panelClass", heading: "heading", isDisabled: "isDisabled" }, outputs: { isOpenChange: "isOpenChange" }, ngContentSelectors: _c3, decls: 9, vars: 6, consts: [[1, "panel", "card", 3, "ngClass"], ["role", "tab", 1, "panel-heading", "card-header", 3, "ngClass", "click"], [1, "panel-title"], ["role", "button", 1, "accordion-toggle"], ["class", "btn btn-link", "type", "button", 3, "ngClass", 4, "ngIf"], ["role", "tabpanel", 1, "panel-collapse", "collapse", 3, "collapse", "isAnimated"], [1, "panel-body", "card-block", "card-body"], ["type", "button", 1, "btn", "btn-link", 3, "ngClass"]], template: function AccordionPanelComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c2);
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵlistener("click", function AccordionPanelComponent_Template_div_click_1_listener() { return ctx.toggleOpen(); });
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵelementStart(3, "div", 3);
        ɵngcc0.ɵɵtemplate(4, AccordionPanelComponent_button_4_Template, 2, 4, "button", 4);
        ɵngcc0.ɵɵprojection(5);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 5);
        ɵngcc0.ɵɵelementStart(7, "div", 6);
        ɵngcc0.ɵɵprojection(8, 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngClass", ctx.panelClass);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngClass", ctx.isDisabled ? "panel-disabled" : "panel-enabled");
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵattribute("aria-expanded", ctx.isOpen);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.heading);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("collapse", !ctx.isOpen)("isAnimated", ctx.isAnimated);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgIf, ɵngcc2.CollapseDirective], styles: ["[_nghost-%COMP%]   .card-header.panel-enabled[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]   .card-header.panel-disabled[_ngcontent-%COMP%]   .btn.btn-link[_ngcontent-%COMP%]{cursor:default;text-decoration:none}"] });
/** @nocollapse */
AccordionPanelComponent.ctorParameters = () => [
    { type: AccordionComponent, decorators: [{ type: Inject, args: [AccordionComponent,] }] }
];
AccordionPanelComponent.propDecorators = {
    heading: [{ type: Input }],
    panelClass: [{ type: Input }],
    isDisabled: [{ type: Input }],
    isOpenChange: [{ type: Output }],
    isOpen: [{ type: HostBinding, args: ['class.panel-open',] }, { type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AccordionPanelComponent, [{
        type: Component,
        args: [{
                selector: 'accordion-group, accordion-panel',
                template: "<div class=\"panel card\" [ngClass]=\"panelClass\">\n  <div\n    class=\"panel-heading card-header\"\n    role=\"tab\"\n    (click)=\"toggleOpen()\"\n    [ngClass]=\"isDisabled ? 'panel-disabled' : 'panel-enabled'\"\n  >\n    <div class=\"panel-title\">\n      <div role=\"button\" class=\"accordion-toggle\" [attr.aria-expanded]=\"isOpen\">\n        <button class=\"btn btn-link\" *ngIf=\"heading\" [ngClass]=\"{ 'text-muted': isDisabled }\" type=\"button\">\n          {{ heading }}\n        </button>\n        <ng-content select=\"[accordion-heading]\"></ng-content>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-collapse collapse\" role=\"tabpanel\" [collapse]=\"!isOpen\" [isAnimated]=\"isAnimated\">\n    <div class=\"panel-body card-block card-body\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n",
                host: {
                    class: 'panel',
                    style: 'display: block'
                },
                styles: [":host .card-header.panel-enabled{cursor:pointer}:host .card-header.panel-disabled .btn.btn-link{cursor:default;text-decoration:none}"]
            }]
    }], function () { return [{ type: AccordionComponent, decorators: [{
                type: Inject,
                args: [AccordionComponent]
            }] }]; }, { isOpenChange: [{
            type: Output
        }], isOpen: [{
            type: HostBinding,
            args: ['class.panel-open']
        }, {
            type: Input
        }], panelClass: [{
            type: Input
        }], heading: [{
            type: Input
        }], isDisabled: [{
            type: Input
        }] }); })();
if (false) {
    /**
     * turn on/off animation
     * @type {?}
     */
    AccordionPanelComponent.prototype.isAnimated;
    /**
     * Clickable text in accordion's group header, check `accordion heading` below for using html in header
     * @type {?}
     */
    AccordionPanelComponent.prototype.heading;
    /**
     * Provides an ability to use Bootstrap's contextual panel classes
     * (`panel-primary`, `panel-success`, `panel-info`, etc...).
     * List of all available classes [available here]
     * (https://getbootstrap.com/docs/3.3/components/#panels-alternatives)
     * @type {?}
     */
    AccordionPanelComponent.prototype.panelClass;
    /**
     * if <code>true</code> — disables accordion group
     * @type {?}
     */
    AccordionPanelComponent.prototype.isDisabled;
    /**
     * Emits when the opened state changes
     * @type {?}
     */
    AccordionPanelComponent.prototype.isOpenChange;
    /**
     * @type {?}
     * @protected
     */
    AccordionPanelComponent.prototype._isOpen;
    /**
     * @type {?}
     * @protected
     */
    AccordionPanelComponent.prototype.accordion;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AccordionModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: AccordionModule, providers: [AccordionConfig] };
    }
}
AccordionModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AccordionModule });
AccordionModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AccordionModule_Factory(t) { return new (t || AccordionModule)(); }, imports: [[CommonModule, CollapseModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AccordionModule, { declarations: function () { return [AccordionComponent, AccordionPanelComponent]; }, imports: function () { return [CommonModule, CollapseModule]; }, exports: function () { return [AccordionComponent, AccordionPanelComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AccordionModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, CollapseModule],
                declarations: [AccordionComponent, AccordionPanelComponent],
                exports: [AccordionComponent, AccordionPanelComponent]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AccordionComponent, AccordionConfig, AccordionModule, AccordionPanelComponent };

//# sourceMappingURL=ngx-bootstrap-accordion.js.map