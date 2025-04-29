package Spring_Boot_First_App.Spring_Boot_First_App1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringUserRepo extends JpaRepository<SpringUser,Long> {
}
