let editFlag =false;
let edUrl="";
let list= document.getElementById("list");
addEventListener("DOMContentLoaded",domLoaded);
    function domLoaded(e)
    {   
          getData();
    }

    async function getData(){

        try { const res= await  axios.get("https://crudcrud.com/api/7dda41a47f734289b88517b7fb013259/productList");
        for(let i=0; i<res.data.length;i++)
        {
            let dt= res.data[i];
            const str =`Product:${dt.productName} Price:${dt.price} P.ID:${dt._id}`;    
            showData(str);
           
        }
        showTotalValue();
    }
        catch(error){
            console.log(error)
        }   
    }
    
function submitform(event){
   
    event.preventDefault();
    let obj= {
    productName:document.getElementById('productName').value,
    price:document.getElementById('price').value
    };
    if(editFlag===false){
        postData(obj);
    }
    else
    {
        putData(obj);
        editFlag=false;
        edUrl="";
    }
}
async function postData(obj){
    try{
    const res = await axios.post("https://crudcrud.com/api/7dda41a47f734289b88517b7fb013259/productList",obj);
    let dt= res.data;
    const str =`Product: ${dt.productName} Price:${dt.price} P.ID:${dt._id}`;          
    showData(str);
    showTotalValue();
    }
    catch(error){
        console.log(error);
    }

}
async function putData(obj){
    try{
    const put = await axios.post("https://crudcrud.com/api/7dda41a47f734289b88517b7fb013259/productList",obj);
    const res = await axios.get("https://crudcrud.com/api/7dda41a47f734289b88517b7fb013259/productList/"+edUrl)
    let dt= res.data;
    const str =`Product: ${dt.productName} Price:${dt.price} P.ID:${dt._id}`;          
    showData(str);
    showTotalValue();
    }
    catch(error){
        console.log(error);
    }

}

list.addEventListener("click",removeItem);
list.addEventListener("click",editItem);

async function removeItem(e)
    {
        if(e.target.classList.contains("delete"))
    {
        if(confirm("Do you want to delete the expense"))
        {  try{
            let li=e.target.parentElement;
            let str=li.textContent;
            let str1=str.slice(-34);
            let str2=str1.substring(0,24);
            list.removeChild(li);
            const res= await axios.delete("https://crudcrud.com/api/7dda41a47f734289b88517b7fb013259/productList/"+str2)
            console.log(res);
            showTotalValue();
        }
        catch(error){console.log(error);}
        }
        
    }
    }

    

    async function editItem(e)
    {
        if(e.target.classList.contains("edit"))
        {  try{
            editFlag=true;
            let li=e.target.parentElement;
            let str=li.textContent;
            let str1=str.slice(-34);
            let str2=str1.substring(0,24);
            const res= await axios.get("https://crudcrud.com/api/7dda41a47f734289b88517b7fb013259/productList/"+str2);
                document.getElementById('productName').value =res.data.productName;
                document.getElementById('price').value=res.data.price;
                list.removeChild(li);
                edUrl=str2;  
            
            }   
            catch(err){console.log(err)}      
        }
    }    

    function showData(str)
    {
       
        let li=document.createElement("li");
        li.appendChild(document.createTextNode(str));
        let btn=document.createElement("Delete");
        btn.className="delete";
        btn.setAttribute("type","button");
        btn.style.border= "thick solid #0000FF";
        btn.appendChild(document.createTextNode("Delete")); 
        li.appendChild(btn);
        list.appendChild(li);
        let edbtn=document.createElement("edit");
        edbtn.className="edit";
        edbtn.setAttribute("type","button");
        edbtn.appendChild(document.createTextNode("Edit")); 
        edbtn.style.border= "thick solid #0000FF";
        li.appendChild(edbtn);
        edbtn.style.margin="5px";
        
    }
    async function showTotalValue()
    {   try{
        const res= await axios.get("https://crudcrud.com/api/7dda41a47f734289b88517b7fb013259/productList")
           
         let totalValue=0;
        for(let i=0; i<res.data.length;i++)
        {
            let dt= res.data[i];
            
            totalValue+=Number(dt.price); 
        }
    
        document.getElementById('tval').textContent="Total value of products:"+totalValue;
    }
    catch(err){console.log(err);};
    
}






