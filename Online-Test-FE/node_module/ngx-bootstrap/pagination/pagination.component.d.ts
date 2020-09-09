import { ChangeDetectorRef, ElementRef, EventEmitter, OnInit, Provider, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PaginationConfig } from './pagination.config';
import { ConfigModel, PagesModel, PaginationLinkContext, PaginationNumberLinkContext } from './models';
import * as ɵngcc0 from '@angular/core';
export interface PageChangedEvent {
    itemsPerPage: number;
    page: number;
}
export declare const PAGINATION_CONTROL_VALUE_ACCESSOR: Provider;
export declare class PaginationComponent implements ControlValueAccessor, OnInit {
    private elementRef;
    private changeDetection;
    config: ConfigModel;
    /** if `true` aligns each link to the sides of pager */
    align: boolean;
    /** limit number for page links in pager */
    maxSize: number;
    /** if false first and last buttons will be hidden */
    boundaryLinks: boolean;
    /** if false previous and next buttons will be hidden */
    directionLinks: boolean;
    /** first button text */
    firstText: string;
    /** previous button text */
    previousText: string;
    /** next button text */
    nextText: string;
    /** last button text */
    lastText: string;
    /** if true current page will in the middle of pages list */
    rotate: boolean;
    /** add class to <code><li\></code> */
    pageBtnClass: string;
    /** if true pagination component will be disabled */
    disabled: boolean;
    /** custom template for page link */
    customPageTemplate: TemplateRef<PaginationNumberLinkContext>;
    /** custom template for next link */
    customNextTemplate: TemplateRef<PaginationLinkContext>;
    /** custom template for previous link */
    customPreviousTemplate: TemplateRef<PaginationLinkContext>;
    /** custom template for first link */
    customFirstTemplate: TemplateRef<PaginationLinkContext>;
    /** custom template for last link */
    customLastTemplate: TemplateRef<PaginationLinkContext>;
    /** fired when total pages count changes, $event:number equals to total pages count */
    numPages: EventEmitter<number>;
    /** fired when page was changed, $event:{page, itemsPerPage} equals to object
     * with current page index and number of items per page
     */
    pageChanged: EventEmitter<PageChangedEvent>;
    /** maximum number of items per page. If value less than 1 will display all items on one page */
    itemsPerPage: number;
    /** total number of items in all pages */
    totalItems: number;
    totalPages: number;
    page: number;
    onChange: Function;
    onTouched: Function;
    classMap: string;
    pages: PagesModel[];
    protected _itemsPerPage: number;
    protected _totalItems: number;
    protected _totalPages: number;
    protected inited: boolean;
    protected _page: number;
    constructor(elementRef: ElementRef, paginationConfig: PaginationConfig, changeDetection: ChangeDetectorRef);
    configureOptions(config: ConfigModel): void;
    ngOnInit(): void;
    writeValue(value: number): void;
    getText(key: string): string;
    noPrevious(): boolean;
    noNext(): boolean;
    registerOnChange(fn: () => {}): void;
    registerOnTouched(fn: () => {}): void;
    selectPage(page: number, event?: Event): void;
    protected makePage(num: number, text: string, active: boolean): {
        number: number;
        text: string;
        active: boolean;
    };
    protected getPages(currentPage: number, totalPages: number): PagesModel[];
    protected calculateTotalPages(): number;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PaginationComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PaginationComponent, "pagination", never, { "itemsPerPage": "itemsPerPage"; "totalItems": "totalItems"; "maxSize": "maxSize"; "rotate": "rotate"; "boundaryLinks": "boundaryLinks"; "directionLinks": "directionLinks"; "pageBtnClass": "pageBtnClass"; "align": "align"; "firstText": "firstText"; "previousText": "previousText"; "nextText": "nextText"; "lastText": "lastText"; "disabled": "disabled"; "customPageTemplate": "customPageTemplate"; "customNextTemplate": "customNextTemplate"; "customPreviousTemplate": "customPreviousTemplate"; "customFirstTemplate": "customFirstTemplate"; "customLastTemplate": "customLastTemplate"; }, { "numPages": "numPages"; "pageChanged": "pageChanged"; }, never, never>;
}

//# sourceMappingURL=pagination.component.d.ts.map