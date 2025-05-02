package Spring_Boot_First_App.Spring_Boot_First_App1;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MyController {
    @Autowired
    public SpringUserRepo springUserRepo;


    @Autowired
    private ApiService apiService;

    @GetMapping("/call")
    public String callAppBApi() {
        return apiService.callAppB();
    }


    @GetMapping("/hello")
    public String callAppBApis() {
        return "hello - Bhanu ";
    }


        @GetMapping("/**")
        public ResponseEntity<?> redirect(HttpServletRequest request) {
            // Read the request URL after /api
            String path = request.getRequestURI().replaceFirst("/api", "");
            String queryString = request.getQueryString();

            String targetUrl = "http://localhost:9001" + path;
            if (queryString != null) {
                targetUrl += "?" + queryString;
            }

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.getForEntity(targetUrl, String.class);

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        }

    @PostMapping("/**")
    public ResponseEntity<?> redirectPost(HttpServletRequest request, @RequestBody String body) {
        String path = request.getRequestURI().replaceFirst("/api", "");
        String targetUrl = "http://localhost:9001" + path;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(targetUrl, entity, String.class);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }





    @PostMapping("/Post-Meth")
    public ResponseEntity<SpringUser> postMeth(@RequestBody SpringUser springUser){
        return ResponseEntity.ok(springUserRepo.save(springUser));
    }

    @GetMapping("/Get-Meth")
    public ResponseEntity<SpringUser> GetMeth(@RequestParam Long id){

        Optional<SpringUser> user = springUserRepo.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }

    }


}
