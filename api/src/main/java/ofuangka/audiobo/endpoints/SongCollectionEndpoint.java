package ofuangka.audiobo.endpoints;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import ofuangka.audiobo.domain.Song;
import ofuangka.audiobo.services.SongService;

@Produces(MediaType.APPLICATION_JSON)
@Component
@Path("/songs")
public class SongCollectionEndpoint {

	@Context
	private ResourceContext context;

	@Inject
	private SongService songs;

	@GET
	public List<Song> list() {
		return songs.all();
	}

	@Path("/{songId}")
	public SongInstanceEndpoint getSongInstanceEndpoint() {
		return context.getResource(SongInstanceEndpoint.class);
	}
}
