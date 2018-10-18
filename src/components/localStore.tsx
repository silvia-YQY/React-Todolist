import * as Interface from './ALLInterface'

export function save(key: string, value: Interface.IlistItem[]) {
	return window.localStorage.setItem(key, JSON.stringify(value))
}
export function load(key: string): Interface.IlistItem[] {
	return JSON.parse(window.localStorage.getItem(key) || '[]')
}