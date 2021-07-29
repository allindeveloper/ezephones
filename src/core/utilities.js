export const constants = {
    colors:{
        "mainBg":"#14161C",
        'categoriesBg':'#1E252F',
        'white':'#fff',
        'buttonBg':'#2D7EE5',
        'primaryBlue':'#2D7EE5'
    },
    categories:['All','IPhone','Samsung','IPad','MacBook','AirPods','Tecno'],
    storageTypes:['32GB','64GB','128GB','256GB']
}

export const formatRequestUrl  = (minPrice,maxPrice,limit,storageSize,otheryQuery)=>{
    return `sell-request/in-stock?sort=new&limit=50&page=1
    &minPrice=${minPrice}&maxPrice=${maxPrice}&storageSizeString=${storageSize}
    &conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus`
}