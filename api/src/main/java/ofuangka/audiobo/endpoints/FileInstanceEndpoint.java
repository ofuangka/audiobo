package ofuangka.audiobo.endpoints;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Component;

@Component
@Path("/files/{songId}")
public class FileInstanceEndpoint {

	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	@GET
	public Response read(@PathParam("songId") String songId) {
		return null;
	}
}
