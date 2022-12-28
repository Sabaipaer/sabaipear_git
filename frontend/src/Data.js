import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import './Data.css'

function Data() {

    const [productName, setName] = useState("")
    const [price,setPrice] = useState("")
    const  [barcode,setBarcode] = useState("")
    const [number,setNumber] =useState(1)
  const [dataBase, setDatabase] = useState([])
   
    // let [dataBase, setDatabase] = useState(()=>{
    //   const savedData = localStorage.getItem("data"); 
    //   if (savedData) {
    //     return JSON.parse(savedData); 
    //   } else {
    //     return [];
    //   }
    // });
    
    // useEffect(() => {

    //   localStorage.setItem('data', JSON.stringify(dataBase)); 
    
    // }, [dataBase])
    
    
   
    let [num, setNum] = useState(()=>{
      const savedData = localStorage.getItem("num"); 
      if (savedData) {
        return JSON.parse(savedData); 
      } else {
        return [];
      }
    });
    
    useEffect(() => {

      localStorage.setItem('num', JSON.stringify(num)); 
    
    }, [num])


    
    
    function getData(e) 
    {
      axios.get(`http://localhost:3000/stocks/7-11/${barcode}`,{crossdomain:true})
      .then(response=>{
        setName(response.data[0].productName);
        setPrice(response.data[0].price);
       
        e.preventDefault(); 
  
        if (productName !== "") {
          setDatabase([
            ...dataBase,
            {
              id: dataBase.length + 1,
              text: productName.trim(), 
              price: price,
              number: number
            }
          ])
          
        }
      })    
      
    }
   
   function addData() {

    setNum([
     ...num,
     {
      dada:1,

     }
    ])
    // console.log(dataBase)

    // function insert(){
    //   setNum([...num,{ setdata:1}])
    // }
      dataBase.map((data, index)=>(
        axios.post('http://localhost:3000/stocks/7-11', {
        num: num.length+1,
        id: Number(index+1),
        name: data.text,
        qty: data.number,
        price: data.price,
        sum: Number(data.number)*data.price,
        
     }) .then(window.location.reload(false))

      ))

   }

 
    function bar_code(event) {
       setBarcode(event.target.value)
     
    }
    function num_ber(event) {
      setNumber(event.target.value)
      
   }
  

const handleDeleteSelected = () => {
  setDatabase(dataBase.filter((item) =>!item.checked));

};

const handleSelectOne = (id) => {
  setDatabase(
    dataBase.map((item) => 
      item.id === id ? { ...item, checked: !item.checked } : item
    )
  );
};
  

    let sum = 0;
    dataBase.forEach(i=>{
      sum = sum + Number(i.number)
    })
    let summon = 0;
    dataBase.forEach(i=>{
      summon = summon + Number(i.price*i.number)
    })
    



const handleSelectAll = (e) => {
  const checked = e.target.checked;
  setDatabase(dataBase.map((item) => ({ ...item, checked })));
};


    return(

      <div className='form-container'>
        <h1>19 Dec </h1>
       
        <div className='form-control'>  
         <input type="text" name='barcode' value={barcode} placeholder="รหัสบาร์โค้ด" onChange={bar_code} />
         <input type="number" name='number' value={number} onChange={num_ber} />
        </div>

        <div>
         <button className='btn' onClick={getData} > แซ่บ </button>
         <div></div>
         <button className='btn_delete'  onClick={handleDeleteSelected}  > ลบรายการสินค้า </button>
       </div>

       <div className='table_scroll'>
       <table>
           <thead>
                 <tr>
                     <th>
        <input
          type="checkbox"
          checked={dataBase.every((item) => item.checked)}
          onChange={handleSelectAll}
        />          </th>
                     <th> No.</th>
                     <th> รายการสินค้า </th>
                     <th> จำนวน </th>
                     <th> ราคา/หน่วย </th>
                     <th> จำนวนเงิน </th>
                 </tr>
           </thead>
           <tbody>
            
                  {dataBase.map((productName, index)=>(
                 <tr key={index+1}>
                    <td>  
                    <input
                         type="checkbox"
                         checked={productName.checked}
                           onChange={() => handleSelectOne(productName.id)}/>
                    </td>
                    
                    <td >{index+1} </td>
                    <td> {productName.text}</td>
                    <td> {productName.number} </td>
                    <td> {productName.price}   </td>
                    <td> {productName.price*productName.number} </td>
                    
                 </tr>
                 

                  ))}
              
           </tbody>
       </table>
                  
       </div>
       <div className='sum'> 
           จำนวนสินค้า: {sum} ชิ้น
           <tr> </tr> 
            ราคารวม: {summon} บาท
            
            <button className='button_save' onClick={addData} >  Save  </button> 
           
        </div>
    </div>
   
      
    )
}
export default Data
