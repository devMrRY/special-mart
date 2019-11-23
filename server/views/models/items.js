const mongoose = require('mongoose');
const Items=mongoose.Schema;

const ItemSchema=new Items({
    name:{
        type:String,
        trim:true,
        minlength:2,
        required:true
    }
})

const items=mongoose.model('Items', ItemSchema)

fun =async ()=>{
    const number = await items.countDocuments();
    if(number<1){
        const arr=['MILK', 'SHOES','TABLE','CHAIR','VEGETABLES','EGG','CLOTHES','COMPUTER']
        arr.forEach((item)=>{
            items.insertMany({name:item})
        })
    }
}
fun()

module.exports=items