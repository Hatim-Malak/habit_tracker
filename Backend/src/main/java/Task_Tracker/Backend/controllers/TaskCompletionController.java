package Task_Tracker.Backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Task_Tracker.Backend.DTO.DashBoardStatsResponse;
import Task_Tracker.Backend.DTO.RoutineWithHistoryResponse;
import Task_Tracker.Backend.services.TaskCompletionService;
import Task_Tracker.Backend.services.UserPrincipal;

@RestController
@RequestMapping("/api/task-completion")
public class TaskCompletionController {
    @Autowired
    private TaskCompletionService taskCompletionService;

    @GetMapping("/check/{taskId}")
    public ResponseEntity<String> toggleRoutineForToday(@PathVariable Integer taskId,Authentication authentication){
        try {
            if(taskId == null){
                return ResponseEntity.badRequest().body("the taskId is required");
            }
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            String checkMessage = taskCompletionService.toggleRoutineForToday(taskId, userPrincipal.getUser());
            return new ResponseEntity<>(checkMessage,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Internal serber error"+e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<DashBoardStatsResponse> getDashboardStats(Authentication authentication){
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            DashBoardStatsResponse dashBoardStatsResponse = taskCompletionService.getDashboardStats(userPrincipal.getUser());
            return new ResponseEntity<>(dashBoardStatsResponse,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Internal serber error"+e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<RoutineWithHistoryResponse>> getRoutineWithWeekHistory(Authentication authentication){
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            List<RoutineWithHistoryResponse> routineWithHistoryResponses = taskCompletionService.getRoutineWithWeekHistory(userPrincipal.getUser());
            return new ResponseEntity<>(routineWithHistoryResponses,HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Internal serber error"+e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
