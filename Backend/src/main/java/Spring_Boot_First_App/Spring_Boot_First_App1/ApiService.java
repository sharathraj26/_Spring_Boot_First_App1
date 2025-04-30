package Spring_Boot_First_App.Spring_Boot_First_App1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiService {

    @Autowired
    private RestTemplate restTemplate;

    public String callAppB() {
        String url = "http://localhost:9001/api/Gets";
        return restTemplate.getForObject(url, String.class);
    }
}
