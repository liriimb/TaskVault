import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken, logoutUser } from '../lib/authService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { dummyReminders } from '../lib/dummyReminders'; // Your dummy data for reminders
import {
  Grid,
  Card,
  CardHeader,
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ReminderPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ title: '', description: '', dueDate: '', priority: '!' });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [reminderToView, setReminderToView] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
      setReminders(dummyReminders.map(reminder => ({ ...reminder, priority: reminder.priority || '!' })));
    }
  }, [router]);

  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => setAddModalOpen(false);
  const handleOpenViewModal = (reminder) => { setReminderToView(reminder); setViewModalOpen(true); };
  const handleCloseViewModal = () => { setViewModalOpen(false); setReminderToView(null); };

  return (
    <Box sx={{ padding: '20px', marginTop: '80px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Reminders & Calendar
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {reminders.map((reminder) => (
          <Grid item key={reminder.id} xs={12} sm={6} md={3}>
            <Card variant="outlined" sx={{ cursor: 'pointer' }}>
              <CardHeader
                title={reminder.title}
                action={
                  <Button onClick={() => handleOpenViewModal(reminder)} size="small">
                    <ExpandMoreIcon />
                  </Button>
                }
                onClick={() => handleOpenViewModal(reminder)}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab color="primary" aria-label="add" onClick={handleOpenAddModal} sx={{ position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)' }}>
        <AddIcon />
      </Fab>

      <Modal open={addModalOpen} onClose={handleCloseAddModal} closeAfterTransition>
        <Fade in={addModalOpen}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
            <Typography variant="h6" gutterBottom>Add New Reminder</Typography>
            <TextField label="Title" name="title" fullWidth margin="normal" />
            <TextField label="Description" name="description" fullWidth multiline rows={3} margin="normal" />
            <TextField label="Due Date" name="dueDate" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>Add Reminder</Button>
          </Box>
        </Fade>
      </Modal>

      <Modal open={viewModalOpen} onClose={handleCloseViewModal} closeAfterTransition>
        <Fade in={viewModalOpen}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
            {reminderToView && (
              <>
                <Typography variant="h6" gutterBottom>Reminder Details</Typography>
                <TextField label="Title" name="title" fullWidth margin="normal" value={reminderToView.title} />
                <TextField label="Description" name="description" fullWidth multiline rows={3} margin="normal" value={reminderToView.description} />
                <TextField label="Due Date" name="dueDate" type="date" fullWidth margin="normal" value={reminderToView.dueDate} InputLabelProps={{ shrink: true }} />
                <Button variant="contained" fullWidth sx={{ mt: 2 }}>Update Reminder</Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ReminderPage;
