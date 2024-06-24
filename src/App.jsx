
import './App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card,Row,Col, Container} from 'react-bootstrap'
import { useState } from 'react';
function App() {
 const [students,setStudents]=useState([]);
 const [name,setName]=useState('');
 const [age,setAge]=useState('');
 const [editIndex,setEditIndex]=useState(null);

 const handleSubmit=(event)=>{
   event.preventDefault();

   if(editIndex !==null){
    const newstudents=[...students];
    newstudents[editIndex]={name, age}
    setStudents(newstudents)
    setEditIndex(null)
   }else{
    setStudents([...students,{name, age}])
   }
   setName('')
   setAge('')
 }

const handleDelete=(index)=>{
  const newstudents=[...students];
  newstudents.splice(index,1);
  setStudents(newstudents);
}

const handleEdit=(index)=>{
  setName(students[index].name);
  setAge(students[index].age);
  setEditIndex(index);

}

  return (
    <>
  <Container>

  <Row>
    <Col>
     
     <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingrese Nombre" value={name} onChange={(e)=>setName(e.target.value)}  />
      </Form.Group>
      <Form.Group className="mb-3">
          <Form.Label>Edad</Form.Label>
          <Form.Control type="number" placeholder="Ingrese Edad" value={age} onChange={(e)=>setAge(e.target.value)}/>
      </Form.Group>
        
        <Button type="submit">
          {
            editIndex!==null?'actualizar estudiante':'agregar estudiante'
          }
        </Button>

      </Form>
    </Col>
  </Row>
   <Row>
    {
      students.map((student,index)=>(
      <Col sm={6} key={index}>
            <Card style={{ width:'18rem',marginTop:'20px'}}>
          
                <Card.Body>
                  <Card.Title>Datos Estudiante</Card.Title>
                  <Card.Text>Nombre:{student.name}</Card.Text>
                  <Card.Text>Edad:{student.age}</Card.Text>
                  <Button variant="danger" onClick={() => handleDelete(index)}> Eliminar</Button>
                  <Button variant="warning" onClick={() => handleEdit(index)} style={{ marginLeft: '10px' }}>Editar</Button>
                </Card.Body>
            </Card>
      </Col>
      ))
    }
   </Row>
       
  </Container>
    </>
  )
}

export default App
