package ofuangka.audiobo.endpoints;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Component;

import ofuangka.audiobo.domain.LibrarySetup;
import ofuangka.audiobo.services.LibrarySetupService;

@Produces(MediaType.APPLICATION_JSON)
@Component
@Path("/library-setup")
public class LibrarySetupEndpoint {

	@Inject
	private LibrarySetupService librarySetup;

	@GET
	public LibrarySetup read() {
		return librarySetup.get();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(LibrarySetup librarySetup) {
		return null;
	}
}
