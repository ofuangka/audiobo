package ofuangka.audiobo.services.file_system;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import ofuangka.audiobo.domain.Album;
import ofuangka.audiobo.services.AlbumService;

@Service
public class FileSystemAlbumService implements AlbumService {

	@Inject
	private FileSystemLoadingService directoryLoadingService;

	@Override
	public List<Album> all() {
		return directoryLoadingService.getAlbums();
	}

}
