package ofuangka.audiobo.endpoints;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import ofuangka.audiobo.domain.Album;
import ofuangka.audiobo.services.AlbumService;

@Produces(MediaType.APPLICATION_JSON)
@Component
@Path("/albums")
public class AlbumCollectionEndpoint {

	@Inject
	private AlbumService albums;

	@GET
	public List<Album> list() {
		return albums.all();
	}
}
