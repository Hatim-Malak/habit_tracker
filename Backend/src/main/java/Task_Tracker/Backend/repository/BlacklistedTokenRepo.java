package Task_Tracker.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Task_Tracker.Backend.models.BlacklistedToken;

public interface BlacklistedTokenRepo extends JpaRepository<BlacklistedToken,Integer> {
    boolean existsByToken(String token);
}
