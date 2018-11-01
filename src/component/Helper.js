let counter = 0;
class Helper {

    createData = (arg, schema) => {
        let obj = {}
        schema.forEach((e, i) => {
            obj[e] = arg[i]
        })
        obj.id = ++counter;
        return obj;
    }

    objToArray = (obj) =>{
        let arr = [];
        for (let val in obj) {
            arr.push(val);
        }
        return arr;
    }

    toPropArray = (obj) =>{
        let arr = [];
        for (let val in obj) {
            arr.push(obj[val]);
        }
        return arr;
    }
}

export default Helper;
