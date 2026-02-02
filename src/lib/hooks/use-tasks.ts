"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import type { Task } from '@/lib/types';
import { taskSchema } from '@/lib/types';
import type { z } from 'zod';

const TASKS_COLLECTION = 'tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, TASKS_COLLECTION), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData: Task[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasksData.push({ 
          id: doc.id,
          title: data.title,
          category: data.category,
          priority: data.priority,
          completed: data.completed,
          createdAt: data.createdAt,
         } as Task);
      });
      setTasks(tasksData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching tasks: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (taskData: z.infer<typeof taskSchema>) => {
    try {
      await addDoc(collection(db, TASKS_COLLECTION), {
        ...taskData,
        completed: false,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding task: ", error);
      // Re-throw or handle error to inform the UI
      throw error;
    }
  };

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      const taskRef = doc(db, TASKS_COLLECTION, taskId);
      await updateDoc(taskRef, { completed });
    } catch (error) {
      console.error("Error updating task: ", error);
      throw error;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
      throw error;
    }
  };

  return { tasks, loading, addTask, toggleTaskCompletion, deleteTask };
}
