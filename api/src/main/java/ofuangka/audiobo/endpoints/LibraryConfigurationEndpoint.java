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

import ofuangka.audiobo.domain.LibraryConfiguration;
import ofuangka.audiobo.services.LibraryConfigurationService;

@Produces(MediaType.APPLICATION_JSON)
@Component
@Path("/library-configuration")
public class LibraryConfigurationEndpoint {

	@Inject
	private LibraryConfigurationService libraryConfiguration;

	@GET
	public LibraryConfiguration read() {
		return libraryConfiguration.get();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(LibraryConfiguration librarySetup) {
		return null;
	}
}
