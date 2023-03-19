let editFlag =false;
let edUrl="";
let list= document.getElementById("list");
addEventListener("DOMContentLoaded",domLoaded);
    function domLoaded(e)
    {   
        axios.get("https://crudcrud.com/api/4ac1c4ddc9db4b2e806c0fcaabd1fe49/productList").then((res)=>{
           
          
            for(let i=0; i<res.data.length;i++)
            {
                let dt= res.data[i];
                const str =`Product:${dt.productName} Price:${dt.price} P.ID:${dt._id}`;    
                showData(str);
               
            }
        
            
        
    }).then(()=>{showTotalValue();})
    .catch((err)=>{console.log(err);});
        
    }


function submitform(event){
   
    event.preventDefault();
    let obj= {
    productName:document.getElementById('productName').value,
    price:document.getElementById('price').value
    };
    if(editFlag===false){
    axios.post("https://crudcrud.com/api/4ac1c4ddc9db4b2e806c0fcaabd1fe49/productList",obj).then((res)=>{console.log(res);
    let dt= res.data;
    const str =`Product: ${dt.productName} Price:${dt.price} P.ID:${dt._id}`;          
    showData(str);
    
    }).then(()=>{showTotalValue();}).catch((err)=>{console.log(err);});

    }
    else
    {
        axios.put("https://crudcrud.com/api/4ac1c4ddc9db4b2e806c0fcaabd1fe49/productList/"+edUrl,obj)
        .then((res)=>{console.log(res);
        
        })
        .catch((err)=>{console.log(err);});
        
        axios.get("https://crudcrud.com/api/4ac1c4ddc9db4b2e806c0fcaabd1fe49/productList/"+edUrl).then((res)=>{console.log(res);
        let dt= res.data;
        const str =`Product: ${dt.productName} Price:${dt.price} P.ID:${dt._id}`;              
        showData(str);
        }).then(()=>{showTotalValue();}).catch((err)=>{console.log(err);});

        editFlag=false;
        edUrl="";
    }
}
list.addEventListener("click",removeItem);
list.addEventListener("click",editItem);

function removeItem(e)
    {
        if(e.target.classList.contains("delete"))
    {
        if(confirm("Do you want to delete the expense"))
        {
            let li=e.target.parentElement;
            let str=li.textContent;
            let str1=str.slice(-34);
            let str2=str1.substring(0,24);
            list.removeChild(li);
            axios.delete("https://crudcrud.com/api/4ac1c4ddc9db4b2e806c0fcaabd1fe49/productList/"+str2).then((res)=>{console.log(res);})
            .then(()=>{showTotalValue();}).catch((err)=>{console.log(err);});
             
        }
        
    }
    }

    

    function editItem(e)
    {
        if(e.target.classList.contains("edit"))
        {   editFlag=true;
            let li=e.target.parentElement;
            let str=li.textContent;
            let str1=str.slice(-34);
            let str2=str1.substring(0,24);
            

            axios.get("https://crudcrud.com/api/4ac1c4ddc9db4b2e806c0fcaabd1fe49/productList/"+str2)
            .then((res)=>{
                document.getElementById('productName').value =res.data.productName;
                document.getElementById('price').value=res.data.price;
            })
            .catch((err)=>{console.log(err);});
           
            list.removeChild(li);
            edUrl=str2;    
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
    function showTotalValue()
    {
        axios.get("https://crudcrud.com/api/4ac1c4ddc9db4b2e806c0fcaabd1fe49/productList").then((res)=>{
           
         let totalValue=0;
        for(let i=0; i<res.data.length;i++)
        {
            let dt= res.data[i];
            
            totalValue+=Number(dt.price); 
        }
    
        document.getElementById('tval').textContent="Total value of products:"+totalValue;
        //appendChild(document.createTextNode("Total value of products:"+totalValue));
    
})
.catch((err)=>{console.log(err);});
    
}
