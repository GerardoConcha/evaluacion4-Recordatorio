import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

function App() {
  const [reminders, setReminders] = useState([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (description.trim() === '' || date.trim() === '') {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    if (editIndex !== null) {
      const newReminders = [...reminders];
      newReminders[editIndex] = { description, date, isImportant };
      setReminders(newReminders);
      setEditIndex(null);
    } else {
      setReminders([...reminders, { description, date, isImportant }]);
    }

    setDescription('');
    setDate('');
    setIsImportant(false);
  };

  const handleDelete = (index) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  const handleEdit = (index) => {
    setDescription(reminders[index].description);
    setDate(reminders[index].date);
    setIsImportant(reminders[index].isImportant);
    setEditIndex(index);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            {showAlert && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                Todos los campos son obligatorios.
              </div>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Fecha"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Importante"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                />
              </Form.Group>
              <Button type="submit">
                {editIndex !== null ? 'Actualizar Recordatorio' : 'Agregar Recordatorio'}
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          {reminders.map((reminder, index) => (
            <Col sm={6} key={index}>
              <Card style={{ width: '18rem', marginTop: '20px' }}>
                <Card.Body>
                  <Card.Title>
                    Recordatorio
                    {reminder.isImportant && (
                      <span style={{ float: 'right', color: 'green' }}>
                        <FaCheck />
                      </span>
                    )}
                  </Card.Title>
                  <Card.Text>Descripción: {reminder.description}</Card.Text>
                  <Card.Text>Fecha: {reminder.date}</Card.Text>
                  <Card.Text>Importante: {reminder.isImportant ? 'Sí' : 'No'}</Card.Text>
                  <Button variant="danger" onClick={() => handleDelete(index)}>Eliminar</Button>
                  <Button variant="warning" onClick={() => handleEdit(index)} style={{ marginLeft: '10px' }}>Editar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
