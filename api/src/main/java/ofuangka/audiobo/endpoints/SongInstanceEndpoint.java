package ofuangka.audiobo.endpoints;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.StreamingOutput;

import org.apache.tomcat.util.http.fileupload.IOUtils;

import ofuangka.audiobo.services.SongFileService;

@Produces(MediaType.APPLICATION_OCTET_STREAM)
public class SongInstanceEndpoint {

	@Inject
	private SongFileService songFileService;

	@GET
	public StreamingOutput read(@PathParam("songId") String songId) {
		return new StreamingOutput() {

			@Override
			public void write(OutputStream output) throws IOException, WebApplicationException {
				IOUtils.copy(new FileInputStream(songFileService.get(songId)), output);
			}

		};
	}
}
