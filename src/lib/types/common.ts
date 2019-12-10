import { Field as AField } from 'ant-design-vue/types/form/form'
import { TreeData } from 'ant-design-vue/types/tree-select'

export type Field =
    | BaseField
    | CodeField
    | SwitchField
    | ImgField
    | PickerField
    | SearchField
    | TreeField

export interface Fields {
    [name: string]: Field
}

export interface ViewFields {
    [name: string]: BaseField | { filter: string }
}

// tslint:disable-next-line:no-empty-interface
export interface AntField extends AField {}
export interface BaseField {
    label?: string
    type: string
    rules?: string[] | string
    hidden?: boolean
    disabled?: boolean
    desc?: string
    unit?: string | number
    placeholder?: string
    depends?: string[]
    dependsFunc?: (values: string[]) => boolean | null
    component?: (() => {}) | string
}

export interface KeyValue {
    [x: string]: any
}

export interface CodeField extends BaseField {
    mobileField: string
    sendFunc: (mobile: string) => Promise<any>
}

export interface SwitchField extends BaseField {
    activeValue?: any
    inactiveValue?: any
}

export interface ImgField extends BaseField {
    maxPic: number
}
export interface PickerField extends BaseField {
    options: Option[] | KeyValue | Promise<any>
}

export interface TreeField extends BaseField {
    treeData: TreeData[]
}
export interface SearchField extends PickerField {
    init?:
        | ((val: string) => Promise<string | Option> | Function)
        | string
    searchFunc: (val: string) => Promise<Option[] | KeyValue>
}

export interface Option {
    text: string
    val: string | number
    extra?: KeyValue
}
