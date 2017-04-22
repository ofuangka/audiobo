package ofuangka.audiobo;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

import ofuangka.audiobo.endpoints.AlbumCollectionEndpoint;
import ofuangka.audiobo.endpoints.CoverInstanceEndpoint;
import ofuangka.audiobo.endpoints.FileInstanceEndpoint;
import ofuangka.audiobo.endpoints.LibraryConfigurationEndpoint;
import ofuangka.audiobo.endpoints.LibraryStatusEndpoint;
import ofuangka.audiobo.endpoints.SongCollectionEndpoint;

@Configuration
public class JerseyConfig extends ResourceConfig {

	public JerseyConfig() {
		register(AlbumCollectionEndpoint.class);
		register(SongCollectionEndpoint.class);
		register(CoverInstanceEndpoint.class);
		register(FileInstanceEndpoint.class);
		register(LibraryConfigurationEndpoint.class);
		register(LibraryStatusEndpoint.class);
	}
}
