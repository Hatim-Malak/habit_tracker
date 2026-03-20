package Task_Tracker.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Task_Tracker.Backend.models.TaskCompletion;

public interface TaskCompletionRepo extends JpaRepository<TaskCompletion,Integer> {
    
}
