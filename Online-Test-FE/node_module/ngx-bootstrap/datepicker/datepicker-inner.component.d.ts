import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateFormatter } from './date-formatter';
import * as ɵngcc0 from '@angular/core';
export declare class DatePickerInnerComponent implements OnInit, OnChanges {
    locale: string;
    datepickerMode: string;
    startingDay: number;
    yearRange: number;
    minDate: Date;
    maxDate: Date;
    minMode: string;
    maxMode: string;
    showWeeks: boolean;
    formatDay: string;
    formatMonth: string;
    formatYear: string;
    formatDayHeader: string;
    formatDayTitle: string;
    formatMonthTitle: string;
    onlyCurrentMonth: boolean;
    shortcutPropagation: boolean;
    customClass: {
        date: Date;
        mode: string;
        clazz: string;
    }[];
    monthColLimit: number;
    yearColLimit: number;
    dateDisabled: {
        date: Date;
        mode: string;
    }[];
    dayDisabled: number[];
    initDate: Date;
    selectionDone: EventEmitter<Date>;
    update: EventEmitter<Date>;
    activeDateChange: EventEmitter<Date>;
    stepDay: any;
    stepMonth: any;
    stepYear: any;
    uniqueId: string;
    protected modes: string[];
    protected dateFormatter: DateFormatter;
    protected _activeDate: Date;
    protected selectedDate: Date;
    protected activeDateId: string;
    protected refreshViewHandlerDay: Function;
    protected compareHandlerDay: Function;
    protected refreshViewHandlerMonth: Function;
    protected compareHandlerMonth: Function;
    protected refreshViewHandlerYear: Function;
    protected compareHandlerYear: Function;
    activeDate: Date;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    checkIfActiveDateGotUpdated(activeDate: any): void;
    setCompareHandler(handler: Function, type: string): void;
    compare(date1: Date, date2: Date): number | undefined;
    setRefreshViewHandler(handler: Function, type: string): void;
    refreshView(): void;
    dateFilter(date: Date, format: string): string;
    isActive(dateObject: any): boolean;
    createDateObject(date: Date, format: string): any;
    split(arr: any[], size: number): any[];
    fixTimeZone(date: Date): Date;
    select(date: Date, isManual?: boolean): void;
    move(direction: number): void;
    toggleMode(_direction: number): void;
    protected getCustomClassForDate(date: Date): string;
    protected compareDateDisabled(date1Disabled: {
        date: Date;
        mode: string;
    }, date2: Date): number;
    protected isDisabled(date: Date): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DatePickerInnerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DatePickerInnerComponent, "datepicker-inner", never, { "activeDate": "activeDate"; "datepickerMode": "datepickerMode"; "locale": "locale"; "startingDay": "startingDay"; "yearRange": "yearRange"; "minDate": "minDate"; "maxDate": "maxDate"; "minMode": "minMode"; "maxMode": "maxMode"; "showWeeks": "showWeeks"; "formatDay": "formatDay"; "formatMonth": "formatMonth"; "formatYear": "formatYear"; "formatDayHeader": "formatDayHeader"; "formatDayTitle": "formatDayTitle"; "formatMonthTitle": "formatMonthTitle"; "onlyCurrentMonth": "onlyCurrentMonth"; "shortcutPropagation": "shortcutPropagation"; "customClass": "customClass"; "monthColLimit": "monthColLimit"; "yearColLimit": "yearColLimit"; "dateDisabled": "dateDisabled"; "dayDisabled": "dayDisabled"; "initDate": "initDate"; }, { "selectionDone": "selectionDone"; "update": "update"; "activeDateChange": "activeDateChange"; }, never, ["*"]>;
}

//# sourceMappingURL=datepicker-inner.component.d.ts.map