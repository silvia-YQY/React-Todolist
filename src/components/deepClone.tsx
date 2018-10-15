export default function deepClone(Obj:object){
	return  JSON.parse(JSON.stringify(Obj))
}