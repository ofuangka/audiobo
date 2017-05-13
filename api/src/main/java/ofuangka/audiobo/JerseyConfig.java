package ofuangka.audiobo;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

import ofuangka.audiobo.endpoints.AlbumCollectionEndpoint;
import ofuangka.audiobo.endpoints.CoverInstanceEndpoint;
import ofuangka.audiobo.endpoints.LibrarySetupEndpoint;
import ofuangka.audiobo.endpoints.LibraryStatusEndpoint;
import ofuangka.audiobo.endpoints.FolderValidityEndpoint;
import ofuangka.audiobo.endpoints.SongCollectionEndpoint;
import ofuangka.audiobo.endpoints.SongInstanceEndpoint;

@Configuration
public class JerseyConfig extends ResourceConfig {

	public JerseyConfig() {
		register(AlbumCollectionEndpoint.class);
		register(SongCollectionEndpoint.class);
		register(CoverInstanceEndpoint.class);
		register(SongInstanceEndpoint.class);
		register(LibrarySetupEndpoint.class);
		register(LibraryStatusEndpoint.class);
		register(FolderValidityEndpoint.class);
	}
}
