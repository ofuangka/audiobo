package ofuangka.audiobo.services.directory;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.Album;
import ofuangka.audiobo.services.AlbumService;

@Service
public class DirectoryAlbumService implements AlbumService {

	@Inject
	private DirectoryLoadingService directoryLoadingService;

	@Override
	public List<Album> all() {
		return directoryLoadingService.getAlbums();
	}

}
