import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken} from '../lib/authService';
import { dummyTasks } from '../lib/dummyTaskList';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Collapse,
  Typography,
  Select,
  MenuItem,
  Box,
  Modal,
  Fade,
  Fab,
  TextField,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const TaskListPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'In Progress',
  });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const router = useRouter();

  useEffect(() => {
  const token = getToken();
  if (!token) {
    router.push('/login');
  } else {
    setIsLoggedIn(true);
    setTasks(dummyTasks.map(task => ({ ...task, status: task.status || "Pending" })));
  }
}, [router]);


  // ----- ADD TASK MODAL HANDLERS -----
  const handleOpenAddModal = () => {
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      status: 'In Progress',
    });
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTaskWithId = { ...newTask, id: tasks.length + 1 };
    setTasks([...tasks, newTaskWithId]);
    setAddModalOpen(false);
  };

  // ----- EDIT TASK MODAL HANDLERS -----
  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTaskToEdit(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    setTasks(tasks.map(task => (task.id === taskToEdit.id ? taskToEdit : task)));
    handleCloseEditModal();
  };

  // ----- Card Expansion & Inline Status -----
  const toggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  // ----- Delete Task -----
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  if (!isLoggedIn) return <p>Loading...</p>;

  const headerColors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#BBDEFB', '#B3E5FC', '#FFE0B2', '#FFF9C4', '#D1F8E9'];

  return (
    <Box sx={{ padding: '20px', marginTop: '80px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Task List
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {tasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card variant="outlined" sx={{ maxWidth: '350px', margin: '0 auto' }}>
              <CardHeader
                title={task.title}
                sx={{
                  backgroundColor: headerColors[index % headerColors.length],
                  cursor: 'pointer',
                  padding: '8px',
                  fontSize: '1rem'
                }}
                action={
                  <>
                    <Button onClick={() => toggleExpand(task.id)} size="small" sx={{ color: 'white' }}>
                      <ExpandMoreIcon />
                    </Button>
                    <Button onClick={() => handleOpenEditModal(task)} size="small">
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDeleteTask(task.id)} size="small" color="error">
                      <DeleteIcon />
                    </Button>
                  </>
                }
                onClick={() => toggleExpand(task.id)}
              />
              <Collapse in={expandedTaskId === task.id} timeout="auto" unmountOnExit>
                <CardContent sx={{ padding: '10px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Due: {task.dueDate}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenAddModal}
        sx={{ position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)' }}
      >
        <AddIcon />
      </Fab>

      <Modal open={addModalOpen} onClose={handleCloseAddModal} closeAfterTransition>
        <Fade in={addModalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" gutterBottom>
              Add New Task
            </Typography>
            <Box component="form" onSubmit={handleAddTask}>
              <TextField
                label="Task Title"
                name="title"
                value={newTask.title}
                onChange={handleNewTaskChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Task Description"
                name="description"
                value={newTask.description}
                onChange={handleNewTaskChange}
                fullWidth
                multiline
                rows={3}
                required
                margin="normal"
              />
              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={handleNewTaskChange}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
                Add Task
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal open={editModalOpen} onClose={handleCloseEditModal} closeAfterTransition>
        <Fade in={editModalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}>
            {taskToEdit && (
              <Box component="form" onSubmit={handleUpdateTask}>
                <Typography variant="h6" gutterBottom>
                  Edit Task
                </Typography>
                <TextField
                  label="Title"
                  name="title"
                  value={taskToEdit.title}
                  onChange={handleEditChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={taskToEdit.description}
                  onChange={handleEditChange}
                  fullWidth
                  multiline
                  rows={3}
                  required
                  margin="normal"
                />
                <TextField
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={taskToEdit.dueDate}
                  onChange={handleEditChange}
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <Box sx={{ mt: 2 }}>
                  <Select
                    value={taskToEdit.status}
                    onChange={(e) =>
                      setTaskToEdit({ ...taskToEdit, status: e.target.value })
                    }
                    fullWidth
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button onClick={handleCloseEditModal} sx={{ mr: 2 }}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default TaskListPage;
