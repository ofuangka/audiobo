package ofuangka.audiobo.endpoints;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import ofuangka.audiobo.services.FolderValidityService;

@Component
@Path("/folder-validity")
@Produces(MediaType.APPLICATION_JSON)
public class FolderValidityEndpoint {

	@Inject
	private FolderValidityService folderValidity;

	@GET
	public boolean isValid(@QueryParam("path") String path) {
		return folderValidity.isValid(path);
	}

}
