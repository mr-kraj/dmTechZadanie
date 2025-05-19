import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";

interface Task {
  id?: number;
  name: string;
  desc: string;
  category: string;
  done: boolean;
}



const API_URL = "http://localhost:8080/api/tasks";

const categories = [
  "RESTOCK",
  "INVENTORY",
  "BEST_BY_DATE_CHECK",
  "PROMOTION_MANAGEMENT",
  "CLEANING",
];

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    name: "",
    desc: "",
    category: "",
    done: false,
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;

  if (!name) return;

  if (type === "checkbox") {
    const checkbox = e.target as HTMLInputElement;
    setNewTask((prev) => ({
      ...prev,
      [name]: checkbox.checked,
    }));
  } else {
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) throw new Error("Failed to create task");
      setNewTask({ name: "", desc: "", category: "", done: false });
      await fetchTasks();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      await fetchTasks();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

const handleSelectChange = (e: SelectChangeEvent<string>) => {
  const { name, value } = e.target;
  setNewTask((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>

      <Button
        onClick={fetchTasks}
        variant="outlined"
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? "Loading..." : "Load Tasks"}
      </Button>

    {tasks.length === 0 ? (
        <Typography>No tasks found.</Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(task.id)}
                  disabled={loading}
                >
                </IconButton>
              }
            >
              <ListItemText
                primary={`${task.name} — ${task.desc} (${task.category})`}
                secondary={`Status: ${task.done ? "Done" : "Not done"}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Typography variant="h6">
        Create New Task
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={newTask.name}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="desc"
          value={newTask.desc}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <Select
          fullWidth
          displayEmpty
          name="category"
          value={newTask.category}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value="" disabled>
            Select Category
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat.replace(/_/g, " ")}
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={
            <Checkbox
              checked={newTask.done}
              onChange={handleInputChange}
              name="done"
            />
          }
          label="Done"
          sx={{ mt: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Add Task
        </Button>
      </form>
    </Container>
  );
}