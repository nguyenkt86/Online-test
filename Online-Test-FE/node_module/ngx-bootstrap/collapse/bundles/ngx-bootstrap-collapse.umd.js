(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-bootstrap/collapse', ['exports', '@angular/animations', '@angular/core'], factory) :
    (global = global || self, factory((global['ngx-bootstrap'] = global['ngx-bootstrap'] || {}, global['ngx-bootstrap'].collapse = {}), global.ng.animations, global.ng.core));
}(this, (function (exports, animations, core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COLLAPSE_ANIMATION_TIMING = '400ms cubic-bezier(0.4,0.0,0.2,1)';
    /** @type {?} */
    var expandAnimation = [
        animations.style({ height: 0, visibility: 'hidden' }),
        animations.animate(COLLAPSE_ANIMATION_TIMING, animations.style({ height: '*', visibility: 'visible' }))
    ];
    /** @type {?} */
    var collapseAnimation = [
        animations.style({ height: '*', visibility: 'visible' }),
        animations.animate(COLLAPSE_ANIMATION_TIMING, animations.style({ height: 0, visibility: 'hidden' }))
    ];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CollapseDirective = /** @class */ (function () {
        function CollapseDirective(_el, _renderer, _builder) {
            this._el = _el;
            this._renderer = _renderer;
            /**
             * This event fires as soon as content collapses
             */
            this.collapsed = new core.EventEmitter();
            /**
             * This event fires when collapsing is started
             */
            this.collapses = new core.EventEmitter();
            /**
             * This event fires as soon as content becomes visible
             */
            this.expanded = new core.EventEmitter();
            /**
             * This event fires when expansion is started
             */
            this.expands = new core.EventEmitter();
            // shown
            this.isExpanded = true;
            this.collapseNewValue = true;
            // hidden
            this.isCollapsed = false;
            // stale state
            this.isCollapse = true;
            // animation state
            this.isCollapsing = false;
            /**
             * turn on/off animation
             */
            this.isAnimated = false;
            this._display = 'block';
            this._stylesLoaded = false;
            this._COLLAPSE_ACTION_NAME = 'collapse';
            this._EXPAND_ACTION_NAME = 'expand';
            this._factoryCollapseAnimation = _builder.build(collapseAnimation);
            this._factoryExpandAnimation = _builder.build(expandAnimation);
        }
        Object.defineProperty(CollapseDirective.prototype, "display", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!this.isAnimated) {
                    this._renderer.setStyle(this._el.nativeElement, 'display', value);
                    return;
                }
                this._display = value;
                if (value === 'none') {
                    this.hide();
                    return;
                }
                this.show();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CollapseDirective.prototype, "collapse", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isExpanded;
            },
            /** A flag indicating visibility of content (shown or hidden) */
            set: /**
             * A flag indicating visibility of content (shown or hidden)
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.collapseNewValue = value;
                if (!this._player || this._isAnimationDone) {
                    this.isExpanded = value;
                    this.toggle();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        CollapseDirective.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
        function () {
            this._stylesLoaded = true;
            if (!this._player || !this._isAnimationDone) {
                return;
            }
            this._player.reset();
            this._renderer.setStyle(this._el.nativeElement, 'height', '*');
        };
        /** allows to manually toggle content visibility */
        /**
         * allows to manually toggle content visibility
         * @return {?}
         */
        CollapseDirective.prototype.toggle = /**
         * allows to manually toggle content visibility
         * @return {?}
         */
        function () {
            if (this.isExpanded) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        /** allows to manually hide content */
        /**
         * allows to manually hide content
         * @return {?}
         */
        CollapseDirective.prototype.hide = /**
         * allows to manually hide content
         * @return {?}
         */
        function () {
            var _this = this;
            this.isCollapsing = true;
            this.isExpanded = false;
            this.isCollapsed = true;
            this.isCollapsing = false;
            this.collapses.emit(this);
            this._isAnimationDone = false;
            this.animationRun(this.isAnimated, this._COLLAPSE_ACTION_NAME)((/**
             * @return {?}
             */
            function () {
                _this._isAnimationDone = true;
                if (_this.collapseNewValue !== _this.isCollapsed && _this.isAnimated) {
                    _this.show();
                    return;
                }
                _this.collapsed.emit(_this);
                _this._renderer.setStyle(_this._el.nativeElement, 'display', 'none');
            }));
        };
        /** allows to manually show collapsed content */
        /**
         * allows to manually show collapsed content
         * @return {?}
         */
        CollapseDirective.prototype.show = /**
         * allows to manually show collapsed content
         * @return {?}
         */
        function () {
            var _this = this;
            this._renderer.setStyle(this._el.nativeElement, 'display', this._display);
            this.isCollapsing = true;
            this.isExpanded = true;
            this.isCollapsed = false;
            this.isCollapsing = false;
            this.expands.emit(this);
            this._isAnimationDone = false;
            this.animationRun(this.isAnimated, this._EXPAND_ACTION_NAME)((/**
             * @return {?}
             */
            function () {
                _this._isAnimationDone = true;
                if (_this.collapseNewValue !== _this.isCollapsed && _this.isAnimated) {
                    _this.hide();
                    return;
                }
                _this.expanded.emit(_this);
                _this._renderer.removeStyle(_this._el.nativeElement, 'overflow');
            }));
        };
        /**
         * @param {?} isAnimated
         * @param {?} action
         * @return {?}
         */
        CollapseDirective.prototype.animationRun = /**
         * @param {?} isAnimated
         * @param {?} action
         * @return {?}
         */
        function (isAnimated, action) {
            var _this = this;
            if (!isAnimated || !this._stylesLoaded) {
                return (/**
                 * @param {?} callback
                 * @return {?}
                 */
                function (callback) { return callback(); });
            }
            this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
            this._renderer.addClass(this._el.nativeElement, 'collapse');
            /** @type {?} */
            var factoryAnimation = (action === this._EXPAND_ACTION_NAME)
                ? this._factoryExpandAnimation
                : this._factoryCollapseAnimation;
            if (this._player) {
                this._player.destroy();
            }
            this._player = factoryAnimation.create(this._el.nativeElement);
            this._player.play();
            return (/**
             * @param {?} callback
             * @return {?}
             */
            function (callback) { return _this._player.onDone(callback); });
        };
        CollapseDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[collapse]',
                        exportAs: 'bs-collapse',
                        host: {
                            '[class.collapse]': 'true'
                        }
                    },] }
        ];
        /** @nocollapse */
        CollapseDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: animations.AnimationBuilder }
        ]; };
        CollapseDirective.propDecorators = {
            collapsed: [{ type: core.Output }],
            collapses: [{ type: core.Output }],
            expanded: [{ type: core.Output }],
            expands: [{ type: core.Output }],
            isExpanded: [{ type: core.HostBinding, args: ['class.in',] }, { type: core.HostBinding, args: ['class.show',] }, { type: core.HostBinding, args: ['attr.aria-expanded',] }],
            isCollapsed: [{ type: core.HostBinding, args: ['attr.aria-hidden',] }],
            isCollapse: [{ type: core.HostBinding, args: ['class.collapse',] }],
            isCollapsing: [{ type: core.HostBinding, args: ['class.collapsing',] }],
            display: [{ type: core.Input }],
            isAnimated: [{ type: core.Input }],
            collapse: [{ type: core.Input }]
        };
        return CollapseDirective;
    }());
    if (false) {
        /**
         * This event fires as soon as content collapses
         * @type {?}
         */
        CollapseDirective.prototype.collapsed;
        /**
         * This event fires when collapsing is started
         * @type {?}
         */
        CollapseDirective.prototype.collapses;
        /**
         * This event fires as soon as content becomes visible
         * @type {?}
         */
        CollapseDirective.prototype.expanded;
        /**
         * This event fires when expansion is started
         * @type {?}
         */
        CollapseDirective.prototype.expands;
        /** @type {?} */
        CollapseDirective.prototype.isExpanded;
        /** @type {?} */
        CollapseDirective.prototype.collapseNewValue;
        /** @type {?} */
        CollapseDirective.prototype.isCollapsed;
        /** @type {?} */
        CollapseDirective.prototype.isCollapse;
        /** @type {?} */
        CollapseDirective.prototype.isCollapsing;
        /**
         * turn on/off animation
         * @type {?}
         */
        CollapseDirective.prototype.isAnimated;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._display;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._factoryCollapseAnimation;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._factoryExpandAnimation;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._isAnimationDone;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._player;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._stylesLoaded;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._COLLAPSE_ACTION_NAME;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._EXPAND_ACTION_NAME;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._el;
        /**
         * @type {?}
         * @private
         */
        CollapseDirective.prototype._renderer;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CollapseModule = /** @class */ (function () {
        function CollapseModule() {
        }
        /**
         * @return {?}
         */
        CollapseModule.forRoot = /**
         * @return {?}
         */
        function () {
            return { ngModule: CollapseModule, providers: [] };
        };
        CollapseModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [CollapseDirective],
                        exports: [CollapseDirective]
                    },] }
        ];
        return CollapseModule;
    }());

    exports.CollapseDirective = CollapseDirective;
    exports.CollapseModule = CollapseModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-bootstrap-collapse.umd.js.map
