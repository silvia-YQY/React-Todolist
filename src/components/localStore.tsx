export function save(key:string, value:string){
  return window.localStorage.setItem(key, JSON.stringify(value))
}
 export function load(key:string){
  return JSON.parse(window.localStorage.getItem(key) || '{}')
}