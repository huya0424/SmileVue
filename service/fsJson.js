const fs = require('fs');

fs.readFile('./goods.json', 'utf8', (err, data)=>{
    let newData = JSON.parse(data); //刚读进来的数据会被js转为json字符串，所以需要JSON.parse进行转换
    let pushData = [];
    let i = 0;
    newData.RECORDS.map((item, index)=>{
        if(item.IMAGE1 !== null) {
            i++;
            console.log(item.NAME);
            pushData.push(item);
        }
    })
    console.log(i);

    fs.writeFile('./data_json/newGoods.json',JSON.stringify(pushData), (err)=>{
        if(err) console.log('写文件操作失败');
        else console.log('写文件操作成功');
    })
})

