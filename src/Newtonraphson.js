import React,{useState} from 'react'
import {compile} from "mathjs";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
export default function Newtonraphson() {
    const[err,seterr] = useState(0);
    const[xnew,setxnew] = useState();
    const[equation,setequation] = useState("");
    const [All,setAll]=useState([{collx1:[],collerr:[]}]);

    const Ans = () =>{
      var x0 = xnew,x1 = 0,err = 1,fx0=0,dfx0=0;
      var arrAll=[{}]
      function fx(x0){return (x0*x0)-7}
      function fx2(x){return 2*x}
      while(err > 0.000001){
          fx0 = fx(x0)
          dfx0 = fx2(x0)
          x1 = x0 - (fx0/dfx0)
          err = Math.abs((fx0/dfx0)/x1)*100
          x0 = x1
          i <= 0 ? arrAll = [{collxR:xR.toFixed(6),collxL:xL.toFixed(6),collxM:xM.toFixed(6),collerr:check.toFixed(6)}]:
              arrAll.push({
                collx1:x1.toFixed(6),collerr:err.toFixed(6)
             })
      } 
      setxnew(x1)
      console.log(xnew)
      console.log(err)
    setAll(arrAll)
      seterr(err)
  

    }
    const api=(e)=>{
      fetch("http://localhost:3005/Newtonraphson")
      .then((res)=>res.json())
      .then((e)=>{
        e.map((x)=>{
          setequation(x.reseq)
          setxnew(x.resx)
        })
      })
      .catch((err)=>{
        console.log(err.message);
      });    
    }
  return (
    <div style={{fontFamily: 'Droid Sans'}}>
    <h1 style={{color: "goldenrod"}}>Newtonraphson</h1>
    <h2 style={{color: "goldenrod"}}><input placeholder="Input Equation" type="text" value={equation} onChange={e=> setequation(e.target.value)}/></h2>
    <h2 style={{color: "goldenrod"}}><input placeholder="Input X" type="number" value={xnew} onChange={e=> setxnew(e.target.value)}/></h2><br/>
    <Button variant="outline-warning" onClick={e=>Ans()}> Result</Button> &nbsp; &nbsp;<Button variant="outline-warning" onClick={api}> API</Button><br/><br/>
    <Table class="table table-dark" striped bordered hover variant="warning">
  <thead>
    <tr>
      <th scope="col">Iteration</th>
      <th scope="col">X</th>
      <th scope="col">ERROR</th>
    </tr>
  </thead>
  <tbody>
    {All.map((item,i)=>
    <tr>
      <td>{i}</td>
      <td>{item.collx1}</td>
      <td>{item.collerr}</td>
    </tr>
    )
}
  </tbody>
</Table>
    </div>
  );}
