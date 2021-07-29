export const constants = {
    colors:{
        "mainBg":"#14161C",
        'categoriesBg':'#1E252F',
        'white':'#fff',
        'buttonBg':'#2D7EE5',
        'primaryBlue':'#2D7EE5'
    },
    categories:['All','IPhone','Samsung','IPad','MacBook','AirPods','Tecno'],
    objCategorues:{
        All:false,
        IPhone:false,
        Samsung:false,
        IPad:false,
        MacBook:false,
        AirPods:false,
        Tecno:false
    },
    storageTypes:['32GB','64GB','128GB','256GB']
}

export const formatRequestUrl  = (minPrice,maxPrice,limit,storageSize,splitted,sort,page,otheryQuery)=>{
    let query = `sell-request/in-stock?`
    
    if(sort){
        query += `sort=new`
    }
    if(limit){
        query += `&limit=${limit}`
    }
    if(minPrice){
        query += `&minPrice=${minPrice}`
    }
    if(maxPrice){
        query += `&maxPrice=${maxPrice}`
    }
    // debugger
    if(storageSize){
        query += `&storageSizeString=${storageSize}`
    }
    
    //logic for input search with comma separated values
    let result1
    let result2
    let result3
    let final = []
    for(let i in splitted){
        const value = splitted[i]
        result1 = gradeRule(value,'grade')
        if(result1 !== false){
            if(result1?.name === 'grade'){
                query.includes('grade') ? query += `,${result1?.value}`: query += `&grade=${result1?.value}`
            }
            else if(result1?.name === 'storageSizeString'){
                query.includes('storageSizeString') ? query += `,${result1?.value}`: query += `&storageSizeString=${result1?.value}`
            }
            else if(result1?.name === 'category') {
                query.includes('category') ? query += `,${result1?.value}`  :  query += `&category=${result1?.value}`
            }
            final.push(result1)
        }
        result2 = storageRule('GB',value,'storageSizeString')
        if(result2 !== false){
             if(result2?.name === 'storageSizeString'){
                query.includes('storageSizeString') ? query += `,${result2?.value}`: query += `&storageSizeString=${result2?.value}`
            }
            else if(result2?.name === 'grade'){
                query.includes('grade') ? query += `,${result2?.value}`: query += `&grade=${result2?.value}`
            }
            
            else if(result2?.name === 'category') {
                query.includes('category') ? query += `,${result2?.value}`  :  query += `&category=${result2?.value}`
            }
            final.push(result2)
        }
        result3 = nameCategoryRule(value,'category')
        if(result3 !== false){
            if(result3?.name === 'grade'){
                query.includes('grade') ? query += `,${result3?.value}`: query += `&grade=${result3?.value}`
            }
            else if(result3?.name === 'storageSizeString'){
                query.includes('storageSizeString') ? query += `,${result3?.value}`: query += `&storageSizeString=${result3?.value}`
            }
            else if(result3?.name === 'category') {
                query.includes('category') ? query += `,${result3?.value}`  :  query += `&category=${result3?.value}`
            }
            final.push(result3)
        }
        // result4 = checkThrough(value,i,'')
    }
    // debugger
    console.log('allresults',result1, result2, result3)
    console.log('result4',final)
    console.log('euqrrryyy',query)
    
    // const categoryOccurrence = (query.match(/category/g) || []).length;
    // const finalQuery = 
   
    return query
}
const gradeRule = (value,name)=>{
    // must end with a number
    const trimedValue = value.replace(/ /g,'').toLowerCase()
    const checkStorage = trimedValue.endsWith('gb') && trimedValue.length > 2
    return /[\s\S]*\d$/.test(value.toLowerCase()) === true && value.length === 2 && !checkStorage ? {value,name} : false;
}
const storageRule = (rule,value,name)=>{
    // must end with end with GB
    const trimedValue = value.replace(/ /g,'').toLowerCase()
    return trimedValue.endsWith('gb') && trimedValue.length > 2 ? {value,name} : false
}
const nameCategoryRule = (value,name)=>{
    const trimedValue = value.replace(/ /g,'').toLowerCase()
    const checkStorage = trimedValue.endsWith('gb') && trimedValue.length > 2

   return /^[0-9a-zA-Z]+$/.test(trimedValue.toLowerCase()) === true  &&trimedValue.length > 2 && !checkStorage  ? {value,name} : false
}

export const filterObj = (obj,predicate)=>{
   return Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );
}