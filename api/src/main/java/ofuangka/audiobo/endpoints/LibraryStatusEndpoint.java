package ofuangka.audiobo.endpoints;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import ofuangka.audiobo.domain.LibraryStatus;
import ofuangka.audiobo.services.LibraryStatusService;

@Produces(MediaType.APPLICATION_JSON)
@Component
@Path("/library-status")
public class LibraryStatusEndpoint {

	@Inject
	private LibraryStatusService libraryStatus;

	@GET
	public LibraryStatus read() {
		return libraryStatus.get();
	}
}
