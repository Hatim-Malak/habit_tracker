package Task_Tracker.Backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Task_Tracker.Backend.models.Task;
import Task_Tracker.Backend.models.User;

public interface TaskRepo extends JpaRepository<Task,Integer> {
    List<Task> findByUser(User user);
}
