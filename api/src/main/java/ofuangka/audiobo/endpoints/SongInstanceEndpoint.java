package ofuangka.audiobo.endpoints;

import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Produces(MediaType.APPLICATION_OCTET_STREAM)
public class SongInstanceEndpoint {

	@GET
	public Response read(@PathParam("songId") String songId) {
		return null;
	}
}
